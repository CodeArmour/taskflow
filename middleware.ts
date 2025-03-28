import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { publicRoutes, authRoutes, DEFULT_ADMIN_LOGIN_REDIRECT, DEFULT_USER_LOGIN_REDIRECT } from "@/routes";
import authConfig from "./auth.config";

const { auth } = NextAuth(
  authConfig
);

export default auth((req) => {
    const { nextUrl, auth } = req;
    const user = auth?.user;
    console.log(JSON.stringify(user));
    const isLoggedIn =!!user;

  // Check if the route is public
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  
  // Check if the route is an authentication route
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  // If the route is public, allow access
  if (isPublicRoute) {
    return NextResponse.next();
  }

   // Prevent logged-in users from accessing login route
   if (isLoggedIn && nextUrl.pathname === "/auth/login") {
    const redirectUrl = user?.role === 'ADMIN' 
      ? DEFULT_ADMIN_LOGIN_REDIRECT 
      : DEFULT_USER_LOGIN_REDIRECT;
    
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // If user is not logged in and trying to access a non-public route
  if (!isLoggedIn) {
    // If it's an auth route, allow access
    if (isAuthRoute) {
      return NextResponse.next();
    }

    // Redirect to login for non-authenticated access to protected routes
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  const userRole = req.auth?.user?.role;

  // Explicit route protection for admin and student dashboards
  if (nextUrl.pathname === "/dashboard" && userRole !== 'ADMIN') {
    console.log("Blocking non-admin access to admin dashboard");
    return NextResponse.redirect(new URL(DEFULT_USER_LOGIN_REDIRECT, req.url));
  }

  if (nextUrl.pathname === "/student-dashboard" && userRole !== 'STUDENT') {
    console.log("Blocking non-student access to student dashboard");
    return NextResponse.redirect(new URL(DEFULT_ADMIN_LOGIN_REDIRECT, req.url));
  }


  // Allow access to protected routes for authenticated users
  return NextResponse.next();

});

export const config = {
  matcher: [
    // Match all routes except static files and API routes
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};