import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  // const token = req.headers.get("authorization")?.split(" ")[1];
  const token = cookies().get("Auth-Token");

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // try {
  //   const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //   req.userId = decoded.userId;
  //   return NextResponse.next();
  // } catch (error) {
  //   console.error("JWT verification failed:", error);
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }
}

export const config = {
  matcher: "/dashboard/:path*",
};
