import { PrismaClient } from '../src/generated/client/index.js'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin(username: string, name: string, role: string = 'admin') {
  const password = `${username}_2026`
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const existing = await prisma.admins.findUnique({
      where: { username }
    })

    if (existing) {
      console.log(`Admin ${username} already exists.`)
      return
    }

    await prisma.admins.create({
      data: {
        username,
        password: hashedPassword,
        name,
        role
      }
    })
    console.log(`Created admin: ${username} | Password: ${password}`)
  } catch (error) {
    console.error(`Failed to create ${username}:`, error)
  }
}

async function main() {
  await createAdmin('sudhir', 'Sudhir Kumar', 'admin')
  await createAdmin('chandan', 'Chandan Singh', 'admin')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
