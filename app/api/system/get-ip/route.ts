import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Get headers from the request
  const headers = request.headers;
  // request.headers.get

  // Try to get the IP from common headers
  const xForwardedFor = headers.get('x-forwarded-for');
  const ip =
    xForwardedFor?.split(',')[0] ||
    headers.get('x-real-ip') ||
    request.headers.get('host') || // fallback
    'unknown';

  return NextResponse.json({ ip });
}