import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

export const ADMIN_COOKIE_NAME = 'sparkline_admin_session'
const JWT_SECRET = process.env.ADMIN_JWT_SECRET || 'sparkline_jwt_secret_dakar_senegal_2026_super_secure_key'
const encodedSecret = new TextEncoder().encode(JWT_SECRET)

export interface AdminSessionPayload {
  id: string
  email: string
  name: string
  role: string
}

/**
 * Signs a secure JWT valid for 7 days
 */
export async function createAdminToken(payload: AdminSessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedSecret)
}

/**
 * Verifies a JWT token and returns payload or null
 */
export async function verifyAdminToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, encodedSecret)
    return payload as unknown as AdminSessionPayload
  } catch {
    return null
  }
}

/**
 * Retrieves the current admin session from incoming cookies (Server Components & Route Handlers)
 */
export async function getAdminSession(): Promise<AdminSessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value
  if (!token) return null
  return verifyAdminToken(token)
}

/**
 * Sets the HttpOnly session cookie on response
 */
export async function setAdminSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

/**
 * Destroys the admin session cookie on logout
 */
export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(ADMIN_COOKIE_NAME)
}
