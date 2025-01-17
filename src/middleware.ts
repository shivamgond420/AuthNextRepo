import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log(path);
  const ispublic =
    path === "/Login" || path === "/Signup" || path === "/Verify-succes";
  console.log(ispublic);

  const token = request.cookies.get("token")?.value || "";

  console.log(token, "Token");
  if (ispublic && token) {
    return NextResponse.rewrite(new URL("/", request.url));
  }
  if (!ispublic && !token) {
    return NextResponse.redirect(new URL("/Signup", request.url));
  }
  // Allow the request to proceed
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/Login", "/Signup", "/Verify-succes"],
};
