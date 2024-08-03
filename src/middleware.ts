import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const session = !!req.cookies.get("next-auth.session-token");
  const authPath = ["/login", "/register"];

  // if user not logged in
  if (pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // if user logged in
  if (authPath.includes(pathname) && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // if user want to visit "/" root path
  if (pathname === "/" && !session) {
    return NextResponse.redirect(new URL("/login", req.url));
  } else if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
