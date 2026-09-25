import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { leadSchema } from '@/lib/validation/lead'
import { sendLeadReceiptEmail, sendAdminNewLeadNotification } from '@/lib/email/service'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const validation = leadSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: validation.error.errors[0]?.message || 'Données invalides.' },
        { status: 400 }
      )
    }

    const {
      name,
      email,
      phone,
      company,
      services,
      inquiryType,
      budget,
      preferredDate,
      message,
      source,
      honeypot,
    } = validation.data

    // Anti-spam bot trap
    if (honeypot && honeypot.length > 0) {
      return NextResponse.json({ success: true, message: 'Message reçu.' })
    }

    // IP address for safety / fraud prevention
    const forwardedFor = req.headers.get('x-forwarded-for')
    const ipAddress = forwardedFor ? forwardedFor.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown'

    // Create lead in database
    const newLead = await prisma.lead.create({
      data: {
        name,
        email: email.toLowerCase(),
        phone: phone || null,
        company: company || null,
        services: JSON.stringify(services),
        inquiryType: inquiryType || null,
        budget: budget || null,
        preferredDate: preferredDate || null,
        message,
        source: source || 'contact_page',
        status: 'NEW',
        ipAddress,
      },
    })

    // Parse services for email dispatch
    const servicesArray = Array.isArray(services) ? services : [services]

    // 1. Send receipt confirmation email to the prospect
    sendLeadReceiptEmail({
      name: newLead.name,
      email: newLead.email,
      services: servicesArray,
      budget: newLead.budget || undefined,
      message: newLead.message,
    }).catch((err) => {
      console.error('[CLIENT RECEIPT EMAIL ERROR]', err)
    })

    // 2. Send instant alert notification to SPARKLINE team
    sendAdminNewLeadNotification({
      id: newLead.id,
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      company: newLead.company,
      services: servicesArray,
      budget: newLead.budget,
      inquiryType: newLead.inquiryType,
      message: newLead.message,
      source: newLead.source,
    }).catch((err) => {
      console.error('[ADMIN NOTIFICATION EMAIL ERROR]', err)
    })

    return NextResponse.json({
      success: true,
      leadId: newLead.id,
      message: 'Votre message a été transmis avec succès. Notre équipe vous répondra sous 24h ouvrées.',
    })
  } catch (error) {
    console.error('[API CONTACT ERROR]', error)
    return NextResponse.json(
      { success: false, error: 'Une erreur est survenue lors de l’envoi de votre message. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}
