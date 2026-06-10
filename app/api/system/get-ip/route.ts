// pages/api/get-ip.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse
) {


  // return NextResponse.json({ ip: '127.0.0.1' });

  
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return NextResponse.json({ error: `Method ${req.method} Not Allowed` }, { status: 405 });
  }

  // Get IP from 'x-forwarded-for' header if available
  const forwarded = req.headers['x-forwarded-for'];
  const ip = Array.isArray(forwarded)
    ? forwarded[0]
    : typeof forwarded === 'string'
    ? forwarded.split(',')[0]
    : null;

  // Fallback to connection remote address
  const remoteAddress =
    req.socket?.remoteAddress ||
    req.connection?.remoteAddress ||
    'UNKNOWN';

  return NextResponse.json({ ip: ip || remoteAddress });

}