import { PrismaClient } from '../src/generated/client/index.js'

const prisma = new PrismaClient()

async function main() {
  const admins = await prisma.admins.findMany({
    orderBy: { created_at: 'desc' }
  })
  
  console.log('--- ADMINS IN DATABASE ---')
  admins.forEach(a => {
    console.log(`- ${a.username} (${a.name}) | Role: ${a.role}`)
  })
  console.log('--------------------------')
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
