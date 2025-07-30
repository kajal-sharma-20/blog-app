import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Get session token
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Step 1: Handle /homepage/update/[id] first
  if (pathname.startsWith('/homepage/update/')) {
    if (!token) {
      // Not logged in → redirect to login page (/)
      return NextResponse.redirect(new URL('/', req.url));
    }
    return NextResponse.next(); // Logged in → allow (backend will verify ownership)
  }

  // Define routes
  const userRoutes = ['/homepage', '/homepage/addblog'];
  const adminRoutes = ['/admindashboard'];
  const publicRoutes = ['/', '/homepage/:id']; // Public blog detail

  // Step 2: Public routes check
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === '/homepage/:id') {
      return /^\/homepage\/[^\/]+$/.test(pathname); // Match /homepage/[id]
    }
    return route === pathname;
  });

  if (!token && isPublicRoute) {
    return NextResponse.next(); // Allow public route without login
  }

  // Step 3: Block if no token for protected routes
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const role = token.role;

  // Step 4: User access
  if (role === 'user') {
    if (
      userRoutes.some((route) => pathname.startsWith(route)) ||
      /^\/homepage\/[^\/]+$/.test(pathname)
    ) {
      return NextResponse.next();
    }
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/homepage', req.url));
    }
    return NextResponse.redirect(new URL('/homepage', req.url));
  }

  // Step 5: Admin access
  if (role === 'admin') {
    if (
      adminRoutes.some((route) => pathname.startsWith(route)) ||
      /^\/homepage\/[^\/]+$/.test(pathname)
    ) {
      return NextResponse.next();
    }
    if (userRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/admindashboard', req.url));
    }
    return NextResponse.redirect(new URL('/admindashboard', req.url));
  }

  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: [
    '/homepage/:path*',  // Covers homepage, addblog, update/[id]
    '/admindashboard/:path*',
    '/',
  ],
};
