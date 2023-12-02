import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextResponse } from "next/server";

export default async function middleware(req: any, event: NextFetchEvent) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/auth") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  const authMiddleware = withAuth({
    pages: {
      signIn: `/auth/login`,
    },
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
