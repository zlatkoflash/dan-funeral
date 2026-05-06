import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Get the token from the cookies
  const token = request.cookies.get('accessToken')?.value;

  const { pathname } = request.nextUrl;

  // 2. Define our logic constraints
  const isDashboardPath = pathname.startsWith('/Dashboard');
  const isAuthPage = (
    pathname === '/Dashboard/User/Auth' ||
    pathname === '/Dashboard/User/Auth/ForgotPassword'
  );

  // 3. The Guard Logic:
  // If the path starts with /Dashboard, but it's NOT the Auth page, 
  // and the user is missing a token...
  if (isDashboardPath && !isAuthPage && !token) {
    // Redirect them to the Auth page
    const loginUrl = new URL('/Dashboard/User/Auth', request.url);

    // Optional: add a "from" query param to redirect them back after login
    // loginUrl.searchParams.set('from', pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Otherwise, let the request continue
  return NextResponse.next();
}

// 4. Optimization: Only run this middleware on Dashboard paths
/*export const config = {
  matcher: ['/Dashboard/:path*'],
};*/