import { NextRequest, NextResponse } from "next/server";

// Define your supported locales and default locale
const locales = ["en", "de"];
const defaultLocale = "de";

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale - you might want to add more
  // sophisticated locale detection based on headers or cookies here
  const locale = defaultLocale; // Or detect locale from request headers/cookies
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en/products (assuming 'en' is the detected/default locale)
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, `/studio` and static files
  matcher: ["/((?!api|studio|img|_next/static|_next/image|favicon.ico).*)"],
};
