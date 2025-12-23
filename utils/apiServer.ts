'use server';

import { getApiData } from '@/utils/api';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(email: string, password: string) {
  // 1. Call the WordPress API to authenticate
  /*const wpResponse = await fetch('YOUR_WORDPRESS_API/v1/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });*/

  const response = await getApiData("/user/login", "POST", {
    email,
    password
  });
  // response.data
  console.log("Response after login:", response);

  if (!response.ok) {
    // throw new Error("Login failed 2"); // Handle error
    return response;
  }

  // Assume WP returns a JSON object: { token: 'YOUR_JWT', expiresIn: 7200 }
  // const { token, expiresIn } = await response.json();
  const { token, expiresIn, ok, user } = response;
  if (!token || typeof token !== 'string') {
    // Handle the failure - maybe throw an error or redirect back to login
    // throw new Error("Authentication failed: No valid token received.");
    return response;
  }

  const cookieStore = await cookies();
  // 2. CRITICAL STEP: Set the secure HttpOnly cookie
  cookieStore.set('accessToken', token, {
    httpOnly: true, // Prevents JavaScript access (XSS)
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS
    sameSite: 'strict', // CSRF defense
    maxAge: expiresIn, // Use the 2-hour expiry from the token (7200 seconds)
  });

  // 3. Complete the login flow by redirecting to a protected page
  // redirect('/dashboard');
  return response;
}



export async function getAccessToken() {
  // Get the full cookie store

  const cookieStore = await cookies();
  // Attempt to retrieve the HttpOnly cookie
  const tokenCookie = cookieStore.get('accessToken');

  if (tokenCookie) {
    // Token found. Now send it to WordPress for validation!
    return tokenCookie.value;
  }

  // Token not found (user is not logged in)
  return null;
}

export const deleteAccessToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete('accessToken');
};


export const signupAction = async ({
  email,
  password,
  name,
  last_name,
  phone,
  bussines_name
}: {
  email: string;
  password: string;
  name: string;
  last_name: string;
  phone: string;
  bussines_name: string;
}) => {
  const response = await getApiData("/user/signup", "POST", {
    email,
    password,
    name,
    last_name,
    phone,
    bussines_name
  });
  return response;
}