import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { newsletterSchema } from '@/lib/validation/lead'
import { sendNewsletterWelcomeEmail } from '@/lib/email/service'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validation = newsletterSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0]?.message || 'Adresse e-mail invalide.' },
        { status: 400 }
      )
    }

    const { email, source, honeypot } = validation.data

    // Anti-spam honeypot detection
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Inscription enregistrée.' })
    }

    // Check if already subscribed
    const existing = await prisma.newsletterSubscriber.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (existing) {
      if (existing.status === 'UNSUBSCRIBED') {
        await prisma.newsletterSubscriber.update({
          where: { id: existing.id },
          data: { status: 'ACTIVE' },
        })
      }
      return NextResponse.json({
        success: true,
        alreadySubscribed: true,
        message: 'Vous êtes déjà inscrit à nos actualités !',
      })
    }

    // Create new subscriber
    await prisma.newsletterSubscriber.create({
      data: {
        email: email.toLowerCase(),
        source: source || 'footer',
        status: 'ACTIVE',
      },
    })

    // Send confirmation welcome email (non-blocking)
    const subscriberSource = source || 'footer'
    sendNewsletterWelcomeEmail(email.toLowerCase(), subscriberSource).catch((err) => {
      console.error('[NEWSLETTER EMAIL ERROR]', err)
    })

    const isSparklearn = subscriberSource === 'sparklearn'
    return NextResponse.json({
      success: true,
      message: isSparklearn
        ? 'Merci ! Vous êtes bien inscrit(e) sur la liste prioritaire SPARKlearn.'
        : 'Merci ! Vous êtes désormais abonné à nos actualités.',
    })
  } catch (error) {
    console.error('[API NEWSLETTER ERROR]', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de l’inscription.' },
      { status: 500 }
    )
  }
}
