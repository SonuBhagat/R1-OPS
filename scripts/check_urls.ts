import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const usersWithAvatars = await prisma.users.findMany({
    where: { 
      avatar_url: { not: null }
    },
    select: { name: true, avatar_url: true },
    take: 5
  })
  
  const documents = await prisma.driver_documents.findMany({
    select: { type: true, url: true, status: true },
    take: 5
  })

  console.log('Sample User Avatars:', JSON.stringify(usersWithAvatars, null, 2))
  console.log('Sample Documents:', JSON.stringify(documents, null, 2))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
