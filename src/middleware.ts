import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, _event: NextFetchEvent) {
  const auth = req.nextUrl.clone();
  auth.pathname = "/auth/login";
  const afterAuth = req.nextUrl.clone();
  afterAuth.pathname = "/dashboard";

  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    const session = await getToken({ req: req as any });
    if (!session) return NextResponse.redirect(auth);
  }

  if (req.nextUrl.pathname.startsWith("/auth")) {
    const session = await getToken({ req: req as any });
    if (session) return NextResponse.redirect(afterAuth);
  }
}
