import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = await getToken({ req, secret: process.env.AUTH_SECRET });

  // ✅ Step 1: Handle update page separately
  if (pathname.startsWith('/homepage/update/')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url)); // No token → redirect to login
    }
    return NextResponse.next(); // ✅ Token present → allow edit page
  }

  // Define routes
  const userRoutes = ['/homepage', '/homepage/addblog'];
  const adminRoutes = ['/admindashboard'];
  const publicRoutes = ['/', '/homepage/:id'];

  // ✅ Step 2: Public routes (allow without login)
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === '/homepage/:id') return /^\/homepage\/[^\/]+$/.test(pathname);
    return route === pathname;
  });
  if (!token && isPublicRoute) return NextResponse.next();

  // ✅ Step 3: Block if no token for protected routes
  if (!token) return NextResponse.redirect(new URL('/', req.url));

  // ✅ Step 4: Role-based access
  const role = token.role;
  if (role === 'user') {
    if (userRoutes.some((route) => pathname.startsWith(route)) || /^\/homepage\/[^\/]+$/.test(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/homepage', req.url));
  }
  if (role === 'admin') {
    if (adminRoutes.some((route) => pathname.startsWith(route)) || /^\/homepage\/[^\/]+$/.test(pathname)) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/admindashboard', req.url));
  }

  return NextResponse.redirect(new URL('/', req.url));
}

export const config = {
  matcher: ['/homepage/:path*', '/admindashboard/:path*', '/'],
};
