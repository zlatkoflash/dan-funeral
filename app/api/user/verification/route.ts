import { getApiData } from '@/utils/api';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {

  const { origin } = new URL(request.url);

  // Parse the full URL from the incoming request
  const { searchParams } = new URL(request.url);

  // Extract the 'token' parameter
  const token = searchParams.get('token');

  const resultsVerification = await getApiData<{
    ok: boolean,
    message: string
  }>("/user/VerifyEmailAddress", "POST", {
    tokenForVerification: token
  });

  // return NextResponse.json({ message: "Hello World", resultsVerification });
  return NextResponse.redirect(`${origin}/DashboardV2?verification=${resultsVerification.ok === true ? "success" : "error"}&message=${resultsVerification.message}`);
}   