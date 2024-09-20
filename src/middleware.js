// middleware.js

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req) {
  const token = req.headers.get("authorization")?.split(" ")[1]; // Assuming the token is passed in the "Authorization" header like "Bearer <token>"

  // Check if token exists
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login if token is missing
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // Optionally attach userId to the request for use in route handlers
    return NextResponse.next(); // Proceed to the requested route
  } catch (error) {
    console.error("JWT verification failed:", error);
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect if verification fails
  }
}

// Apply middleware only to /dashboard/* routes
export const config = {
  matcher: "/dashboard/:path*", // Applies to /dashboard and any sub-routes under it
};
