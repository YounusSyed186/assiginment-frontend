import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;

  const protectedRoutes = ["/tasks"];

  if (!token && protectedRoutes.some(r => req.nextUrl.pathname.startsWith(r))) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}
