import { PrismaClient } from '../src/generated/client/index.js'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const username = 'admin'
  const password = 'admin_password_2026' // You should change this after login
  const name = 'System Admin'

  console.log('Checking for existing admins...')
  const existingAdmin = await prisma.admins.findUnique({
    where: { username }
  })

  if (existingAdmin) {
    console.log('Admin already exists. Skipping initialization.')
    return
  }

  console.log('Creating initial admin user...')
  const hashedPassword = await bcrypt.hash(password, 10)
  
  await prisma.admins.create({
    data: {
      username,
      password: hashedPassword,
      name,
      role: 'superadmin'
    }
  })

  console.log('--------------------------------------------------')
  console.log('Admin User Created Successfully!')
  console.log(`Username: ${username}`)
  console.log(`Password: ${password}`)
  console.log('Please change your password after the first login.')
  console.log('--------------------------------------------------')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
