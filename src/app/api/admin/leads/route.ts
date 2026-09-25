import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getAdminSession } from '@/lib/auth/session'

// GET: Fetch list of leads with filtering and search
export async function GET(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const status = searchParams.get('status')
  const search = searchParams.get('search')
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const skip = (page - 1) * limit

  const where: Record<string, unknown> = {}

  if (status && status !== 'ALL') {
    where.status = status
  }

  if (search && search.trim().length > 0) {
    where.OR = [
      { name: { contains: search } },
      { email: { contains: search } },
      { company: { contains: search } },
      { phone: { contains: search } },
      { message: { contains: search } },
    ]
  }

  const [total, leads] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
  ])

  // Parse JSON services for client consumption
  const parsedLeads = leads.map((l) => {
    let parsedServices: string[] = []
    try {
      parsedServices = JSON.parse(l.services)
    } catch {
      parsedServices = [l.services]
    }
    return {
      ...l,
      services: parsedServices,
    }
  })

  return NextResponse.json({
    leads: parsedLeads,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  })
}

// PATCH: Update lead status and internal notes
export async function PATCH(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { id, status, internalNotes } = await req.json()

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 })
    }

    const updated = await prisma.lead.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(internalNotes !== undefined ? { internalNotes } : {}),
      },
    })

    return NextResponse.json({ success: true, lead: updated })
  } catch (error) {
    console.error('[ADMIN LEAD UPDATE ERROR]', error)
    return NextResponse.json({ error: 'Impossible de mettre à jour le lead' }, { status: 500 })
  }
}

// DELETE: Remove lead
export async function DELETE(req: NextRequest) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')

  if (!id) {
    return NextResponse.json({ error: 'ID requis' }, { status: 400 })
  }

  try {
    await prisma.lead.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[ADMIN LEAD DELETE ERROR]', error)
    return NextResponse.json({ error: 'Impossible de supprimer le lead' }, { status: 500 })
  }
}
