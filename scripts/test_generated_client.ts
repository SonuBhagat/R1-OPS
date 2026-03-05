import { PrismaClient } from '../src/generated/client/index.js'
const prisma = new PrismaClient()

async function main() {
  console.log('Testing connection with generated client...')
  const userCount = await prisma.users.count()
  console.log('User Count:', userCount)
}

main()
  .catch(e => {
    console.error('Connection failed with generated client:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
