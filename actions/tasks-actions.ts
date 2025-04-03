"use server"
/* eslint-disable @typescript-eslint/no-explicit-any */
// taskActions.ts
import { TaskCategory, TaskState } from '@prisma/client';
import { db } from '@/lib/db'; // Update with your actual import path

// Types for Task operations
type CreateTaskInput = {
  title: string;
  description: string;
  category: TaskCategory;
  dueDate: Date;
  requiresFileSubmission?: boolean;
  maxSubmissions?: number;
  createdBy?: string;
};

type UpdateTaskInput = {
  id: string;
  title?: string;
  description?: string;
  category?: TaskCategory;
  dueDate?: Date;
  requiresFileSubmission?: boolean;
  maxSubmissions?: number;
  state?: TaskState;
};

type TaskFilters = {
  category?: TaskCategory;
  state?: TaskState;
  dueBefore?: Date;
  dueAfter?: Date;
  createdBy?: string;
  searchTerm?: string;
};

// Create a new task
export async function createTask(data: CreateTaskInput) {
  try {
    const task = await db.task.create({
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        dueDate: data.dueDate,
        requiresFileSubmission: data.requiresFileSubmission ?? false,
        maxSubmissions: data.maxSubmissions,
        createdBy: data.createdBy,
        state: TaskState.ACTIVE, // Default state
      },
    });
    
    return { success: true, task };
  } catch (error) {
    console.error('Error creating task:', error);
    return { success: false, error: 'Failed to create task' };
  }
}

// Update an existing task
export async function updateTask(data: UpdateTaskInput) {
  try {
    const task = await db.task.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        category: data.category,
        dueDate: data.dueDate,
        requiresFileSubmission: data.requiresFileSubmission,
        maxSubmissions: data.maxSubmissions,
        state: data.state,
        updatedAt: new Date(),
      },
    });
    
    return { success: true, task };
  } catch (error) {
    console.error('Error updating task:', error);
    return { success: false, error: 'Failed to update task' };
  }
}

// Delete a task
export async function deleteTask(id: string) {
  try {
    // Check if the task has any associated userTasks
    const userTaskCount = await db.userTask.count({
      where: { taskId: id },
    });
    
    if (userTaskCount > 0) {
      // Task has associated userTasks, archive instead of delete
      const task = await db.task.update({
        where: { id },
        data: { state: TaskState.ARCHIVED },
      });
      
      return { 
        success: true, 
        task,
        message: 'Task has existing submissions and was archived instead of deleted' 
      };
    }
    
    // Task has no associated userTasks, proceed with deletion
    await db.task.delete({
      where: { id },
    });
    
    return { success: true, message: 'Task deleted successfully' };
  } catch (error) {
    console.error('Error deleting task:', error);
    return { success: false, error: 'Failed to delete task' };
  }
}

// Get a task by id
export async function getTaskById(id: string) {
  try {
    const task = await db.task.findUnique({
      where: { id },
      include: {
        userTasks: {
          select: {
            id: true,
            status: true,
            submissionCount: true,
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });
    
    if (!task) {
      return { success: false, error: 'Task not found' };
    }
    
    return { success: true, task };
  } catch (error) {
    console.error('Error fetching task:', error);
    return { success: false, error: 'Failed to fetch task' };
  }
}

// List tasks with filters and pagination
export async function listTasks(
  filters: TaskFilters = {},
  page: number = 1,
  pageSize: number = 10
) {
  try {
    const where: any = {};
    
    // Apply filters
    if (filters.category) {
      where.category = filters.category;
    }
    
    if (filters.state) {
      where.state = filters.state;
    }
    
    if (filters.createdBy) {
      where.createdBy = filters.createdBy;
    }
    
    // Date range filters
    if (filters.dueBefore || filters.dueAfter) {
      where.dueDate = {};
      
      if (filters.dueBefore) {
        where.dueDate.lte = filters.dueBefore;
      }
      
      if (filters.dueAfter) {
        where.dueDate.gte = filters.dueAfter;
      }
    }
    
    // Search by title or description
    if (filters.searchTerm) {
      where.OR = [
        { title: { contains: filters.searchTerm, mode: 'insensitive' } },
        { description: { contains: filters.searchTerm, mode: 'insensitive' } },
      ];
    }
    
    // Calculate pagination
    const skip = (page - 1) * pageSize;
    
    // Get tasks with pagination
    const [tasks, totalCount] = await Promise.all([
      db.task.findMany({
        where,
        orderBy: { dueDate: 'asc' },
        skip,
        take: pageSize,
        include: {
          _count: {
            select: { userTasks: true },
          },
        },
      }),
      db.task.count({ where }),
    ]);
    
    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / pageSize);
    
    return {
      success: true,
      tasks,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  } catch (error) {
    console.error('Error listing tasks:', error);
    return { success: false, error: 'Failed to list tasks' };
  }
}

// Change task state
export async function changeTaskState(id: string, newState: TaskState) {
  try {
    const task = await db.task.update({
      where: { id },
      data: {
        state: newState,
        updatedAt: new Date(),
      },
    });
    
    return { success: true, task };
  } catch (error) {
    console.error('Error changing task state:', error);
    return { success: false, error: 'Failed to change task state' };
  }
}