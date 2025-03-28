'use server'

/* eslint-disable @typescript-eslint/no-explicit-any */
import {db} from "../lib/db"

export  const createUser = async (values:any) => {
    {}
    const user = await db.user.create({
        data: values,
    })
    
    return user
}