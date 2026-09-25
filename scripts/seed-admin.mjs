import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@sparkline.sn'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Sparkline2026SecureAdmin!'
  const adminName = 'Direction SPARKLINE'

  console.log(`[SEED] Checking admin account: ${adminEmail}...`)

  const existing = await prisma.adminUser.findUnique({
    where: { email: adminEmail },
  })

  if (existing) {
    console.log(`[SEED] Admin account already exists (${existing.email}). Skipped.`)
    return
  }

  const passwordHash = await bcrypt.hash(adminPassword, 10)

  const created = await prisma.adminUser.create({
    data: {
      email: adminEmail,
      name: adminName,
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  })

  console.log(`[SEED] Successfully created default Admin account:`)
  console.log(`       Email: ${created.email}`)
  console.log(`       Password: ${adminPassword}`)
}

main()
  .catch((e) => {
    console.error('[SEED ERROR]', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
