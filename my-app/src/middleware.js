import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Define protected and public routes
  const userRoutes = ['/homepage', '/homepage/addblog'];
  const adminRoutes = ['/admindashboard'];
  const publicRoutes = ['/', '/homepage/:id']; // Add /homepage/:id as a public route

  // Get session token
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === '/homepage/:id') {
      // Match dynamic route /homepage/[id]
      return /^\/homepage\/[^\/]+$/.test(pathname);
    }
    return route === pathname;
  });

  // Allow unauthenticated users to access public routes
  if (!token && isPublicRoute) {
    return NextResponse.next();
  }

  // If no session, restrict access to protected routes
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
      /^\/homepage\/[^\/]+$/.test(pathname) // Allow /homepage/[id]
    ) {
      return NextResponse.next();
    }
    if (userRoutes.some((route) => pathname.startsWith(route))) {
      return NextResponse.redirect(new URL('/admindashboard', req.url));
    }
    return NextResponse.redirect(new URL('/admindashboard', req.url));
  }

  // Fallback: redirect to home if role is invalid
  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: [
    '/homepage/:path*', // Matches /homepage and its subroutes
    '/admindashboard/:path*',
    '/',
  ],
};