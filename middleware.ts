import { RequestCookies, ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/*function applySetCookie(req: NextRequest, res: NextResponse) {
  const setCookies = new ResponseCookies(res.headers);
  const newReqHeaders = new Headers(req.headers);
  const newReqCookies = new RequestCookies(newReqHeaders);

  setCookies.getAll().forEach((cookie) => newReqCookies.set(cookie));

  const dummyRes = NextResponse.next({
    request: { headers: newReqHeaders },
  });

  dummyRes.headers.forEach((value, key) => {
    if (key === 'x-middleware-override-headers' || key.startsWith('x-middleware-request-')) {
      res.headers.set(key, value);
    }
  });
}*/

export function middleware(request: NextRequest) {

  // Start with a standard next response
  let response = NextResponse.next();

  // ==========================================
  // 1. DEVICE ID & SEED COOKIE GENERATOR
  // ==========================================

  // Check / Set Device ID Cookie (1 year)
  const deviceId = request.cookies.get('app_device_id');
  console.log("deviceId:::::::::::", deviceId);
  if (!deviceId) {
    const newDeviceId = crypto.randomUUID();
    response.cookies.set({
      name: 'app_device_id',
      value: newDeviceId,
      maxAge: 60 * 60 * 24 * 365, // 1 year in seconds
      path: '/',
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: process.env.NEXT_PUBLIC_SITE_URL?.indexOf('localhost') !== -1 ? false : true,
      sameSite: 'lax',
    });
  }

  // Check / Set Timed Seed Cookie (24 hours)
  const seedCookie = request.cookies.get('seed_data');
  let needsNewSeed = false;

  if (!seedCookie) {
    needsNewSeed = true;
  } else {
    try {
      const { timestamp } = JSON.parse(seedCookie.value);
      if (Date.now() - timestamp >= 24 * 60 * 60 * 1000) {
        needsNewSeed = true; // Older than 24 hours
      }
    } catch {
      needsNewSeed = true; // Invalid JSON fallback
    }
  }

  if (needsNewSeed) {
    const newSeed = Math.round(Math.random() * 10000);
    const seedData = JSON.stringify({ seed: newSeed, timestamp: Date.now() });
    response.cookies.set({
      name: 'seed_data',
      value: seedData,
      maxAge: 60 * 60 * 24, // 24 hours in seconds
      path: '/',
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: process.env.NEXT_PUBLIC_SITE_URL?.indexOf('localhost') !== -1 ? false : true,
      sameSite: 'lax',
    });
  }

  // ==========================================
  // 2. DASHBOARD AUTH GUARD LOGIC
  // ==========================================
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

    // return NextResponse.redirect(loginUrl);

    const redirectResponse = NextResponse.redirect(loginUrl);

    // Copy any cookies set on `response` over to the redirect response
    response.cookies.getAll().forEach((cookie) => {
      redirectResponse.cookies.set(cookie.name, cookie.value, cookie);
    });

    return redirectResponse;

  }

  // applySetCookie(request, response);

  // Otherwise, let the request continue
  // return NextResponse.next();
  return response;
}

// 4. Optimization: Only run this middleware on Dashboard paths
/*export const config = {
  matcher: ['/Dashboard/:path*'],
};*/