import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(req) {
  const token = req.cookies.get('token');
  if (!token) return NextResponse.rewrite(new URL('/sign-in', req.url));

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect('/sign-in', req.url);
  }
}
