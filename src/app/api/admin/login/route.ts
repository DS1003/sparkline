import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { createAdminToken, setAdminSessionCookie } from '@/lib/auth/session'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Identifiants requis.' },
        { status: 400 }
      )
    }

    const admin = await prisma.adminUser.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (!admin) {
      return NextResponse.json(
        { success: false, error: 'E-mail ou mot de passe incorrect.' },
        { status: 401 }
      )
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash)

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'E-mail ou mot de passe incorrect.' },
        { status: 401 }
      )
    }

    // Create session token
    const token = await createAdminToken({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    })

    await setAdminSessionCookie(token)

    return NextResponse.json({
      success: true,
      user: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    })
  } catch (error) {
    console.error('[ADMIN LOGIN ERROR]', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de la connexion.' },
      { status: 500 }
    )
  }
}
