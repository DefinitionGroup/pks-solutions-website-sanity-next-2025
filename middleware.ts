import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { client } from "@/sanity/lib/client";
import { DEFAULT_LOCALE, resolveCanonicalPath } from "@/lib/seo";

const retiredGermanPaths = new Set([
  "/de/startseite22",
  "/de/startseitearc",
  "/de/testpage",
]);

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
  const { pathname } = req.nextUrl;
  const normalizedPathname = pathname.toLowerCase();
  const canonicalPathname = resolveCanonicalPath(pathname);

  if (canonicalPathname !== pathname) {
    const url = req.nextUrl.clone();
    url.pathname = canonicalPathname;
    return NextResponse.redirect(url, 308);
  }

  if (
    normalizedPathname === "/en" ||
    normalizedPathname.startsWith("/en/")
  ) {
    return new NextResponse(null, {
      status: 410,
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  if (retiredGermanPaths.has(normalizedPathname)) {
    return new NextResponse(null, {
      status: 410,
      headers: { "X-Robots-Tag": "noindex, nofollow" },
    });
  }

  const pathnameHasLocale =
    pathname === `/${DEFAULT_LOCALE}` ||
    pathname.startsWith(`/${DEFAULT_LOCALE}/`);

  if (!pathnameHasLocale) {
    const url = req.nextUrl.clone();
    url.pathname =
      pathname === "/"
        ? `/${DEFAULT_LOCALE}`
        : `/${DEFAULT_LOCALE}${pathname}`;
    return NextResponse.redirect(url, 308);
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
  if (user?.restrictedPages?.includes(pathname)) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!api|studio|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
  ],
};
