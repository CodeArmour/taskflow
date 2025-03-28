/** Routes that accessible to the public 
 *  these routes are not restricted by authentication
 *  @type {string[]}
*/
export const publicRoutes = [
    "/"
];

/** Routes that accessible to the public 
 *  these routes are restricted by authentication
 *  @type {string[]}
*/
export const authRoutes = [
    "/auth/login",
    "/auth/error"
];

/** The default redirect path after a successful login
 *  @type {string}
 */
export const DEFULT_ADMIN_LOGIN_REDIRECT = "/dashboard";

/** The default redirect path for admin login
 *  @type {string}
 */
export const DEFULT_USER_LOGIN_REDIRECT = "/student-dashboard";

export const adminRoutes = [
    "/dashboard",
    "/dashboard/users",
    "/dashboard/tasks",
    "/dashboard/reviews"
];

export const studentRoutes = [
    "/student-dashboard",
    "/student-dashboard/tasks",
    "/student-dashboard/profile"]