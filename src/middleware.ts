import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const ADMIN_COOKIE_NAME = 'sparkline_admin_session'
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'sparkline_jwt_secret_dakar_senegal_2026_super_secure_key'
const encodedSecret = new TextEncoder().encode(JWT_SECRET)

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /admin routes
  if (pathname.startsWith('/admin')) {
    const isLoginPage = pathname === '/admin/login'
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value

    let isAuthenticated = false

    if (token) {
      try {
        await jwtVerify(token, encodedSecret)
        isAuthenticated = true
      } catch {
        isAuthenticated = false
      }
    }

    // 1. If accessing login page while already authenticated -> redirect to /admin
    if (isLoginPage && isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    // 2. If accessing protected admin page without authentication -> redirect to /admin/login
    if (!isLoginPage && !isAuthenticated) {
      const loginUrl = new URL('/admin/login', req.url)
      // Save intended destination
      if (pathname !== '/admin') {
        loginUrl.searchParams.set('redirect', pathname)
      }
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
