import { NextResponse } from 'next/server';

export function middleware(req) {
  const { cookies } = req;
  const token = cookies.get('auth-token');
  
  console.log(token);
  if (!token) {
    return NextResponse.redirect('http://localhost:3000/');
  }

  return NextResponse.next();
}

export const config = { 
    matcher: [
      "/dashboard"
    ] 
};