import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Define protected and public routes
  const userRoutes = ['/homepage', '/homepage/addblog', '/homepage/update']; // Added update route
  const adminRoutes = ['/admindashboard'];
  const publicRoutes = ['/', '/homepage/:id']; // Blog details remain public

  // Get session token
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Check if it's a public route
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === '/homepage/:id') {
      // Match dynamic route like /homepage/[id]
      return /^\/homepage\/[^\/]+$/.test(pathname);
    }
    return route === pathname;
  });

  // Allow unauthenticated users to access public routes
  if (!token && isPublicRoute) {
    return NextResponse.next();
  }

  // Block access if no token & not public
  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const role = token.role;

  // Handle user access
  if (role === 'user') {
    if (
      userRoutes.some((route) => pathname.startsWith(route)) || 
      /^\/homepage\/[^\/]+$/.test(pathname) // Allow /homepage/[id]
    ) {
      return NextResponse.next();
    }
    if (adminRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/homepage', req.url));
    }
    return NextResponse.redirect(new URL('/homepage', req.url));
  }

  // Handle admin access
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
    '/homepage/:path*', // Matches /homepage, /homepage/addblog, /homepage/update/[id]
    '/admindashboard/:path*',
    '/',
  ],
};
