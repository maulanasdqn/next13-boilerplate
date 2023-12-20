import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { permissionMapper } from "./utils";
import { TUser } from "./entities/user";

export async function middleware(req: NextRequest, _event: NextFetchEvent) {
  const session = await getToken({ req: req as any });
  const url = req.nextUrl;
  const loginUrl = new URL("/auth/login", url.origin);
  const dashboardUrl = new URL("/dashboard", url.origin);
  const deniedUrl = new URL("/denied", url.origin);
  dashboardUrl.searchParams.set("title", "Dashboard");
  dashboardUrl.searchParams.set("isSidebarOpen", "open");
  if (url.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(loginUrl);
  }
  if (url.pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(dashboardUrl);
  }
  if (session) {
    const userRole = session?.role as TUser["role"];
    const matchingRoute = permissionMapper.find((route) => url.pathname.startsWith(route.url));

    if (matchingRoute) {
      const isAuthorized =
        matchingRoute.permissions.length === 0 ||
        matchingRoute.permissions.some((permission) => userRole?.permissions.includes(permission));

      if (!isAuthorized) {
        return NextResponse.redirect(deniedUrl);
      }
    }
  }
  return NextResponse.next();
}
