import { NextRequest, NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { client } from "@/sanity/lib/client";

// Define your supported locales and default locale
const locales = ["en", "de"];
const defaultLocale = "de";

// Define public routes that don't require authentication
const publicRoutes = createRouteMatcher([
  "/:locale",
  "/:locale/projects",
  "/:locale/clients",
  "/:locale/:slug",
  "/api/(.*)",
  "/studio/(.*)",
]);

// Export the Clerk middleware with correct handler function
// Removed explicit types for auth, req, and evt
export default clerkMiddleware(async (auth, req) => {
  // Handle localization first
  const { pathname: localePathname } = req.nextUrl; // Renamed to avoid redeclaration
  const pathnameHasLocale = locales.some(
    (locale) => localePathname.startsWith(`/${locale}/`) || localePathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    const locale = defaultLocale;
    req.nextUrl.pathname = `/${locale}${localePathname}`;
    return NextResponse.redirect(req.nextUrl);
  }

  // Then handle authentication
  const authObject = await auth(); // Properly await the auth promise
  if (publicRoutes(req) || !authObject.userId) {
    return NextResponse.next();
  }

  // Fetch user from Sanity
  const user = await client.fetch(
    `*[_type == "user" && clerkId == $userId][0]{role, restrictedPages}`,
    { userId: authObject.userId }
  );

  // Check if current path is restricted for this user
  const { pathname } = req.nextUrl; // Now safe to declare here
  if (user?.restrictedPages?.includes(pathname)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
});

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, `/studio` and static files
  matcher: ["/((?!api|studio|img|_next/static|_next/image|favicon.ico).*)"],
};
