import { getToken } from "next-auth/jwt";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { permissionMapper } from "./utils";
import { TUser } from "./entities/user";

export async function middleware(req: NextRequest, _event: NextFetchEvent) {
  const session = await getToken({ req: req as any });
  const url = req.nextUrl;

  // Define redirect URLs
  const loginUrl = new URL("/auth/login", url.origin);
  const dashboardUrl = new URL("/dashboard", url.origin);
  dashboardUrl.searchParams.set("title", "Dashboard");
  dashboardUrl.searchParams.set("isSidebarOpen", "open");
  const deniedUrl = new URL("/denied", url.origin);

  // Redirect to login if not authenticated and trying to access protected routes
  if (url.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(loginUrl);
  }

  // Redirect to dashboard if already authenticated and trying to access auth pages
  if (url.pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(dashboardUrl);
  }

  // Check if the user has permission to access the requested URL
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

  // Continue for all other cases
  return NextResponse.next();
}
