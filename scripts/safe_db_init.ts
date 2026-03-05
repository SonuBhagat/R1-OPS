import { PrismaClient } from '../src/generated/client'
const prisma = new PrismaClient()

async function main() {
  console.log('Checking database connection...')
  try {
    // Create the admins table using raw SQL for maximum safety
    console.log('Attempting to create "admins" table...')
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS public.admins (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        role TEXT DEFAULT 'admin',
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `)
    console.log('Table "admins" checked/created successfully.')
    
    // Also create the uuid-ossp extension if it doesn't exist for the uuid_generate_v4() function seen in reviews
    await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`)
    await prisma.$executeRawUnsafe(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`)
    
  } catch (error) {
    console.error('Error in database setup:', error)
    process.exit(1)
  }
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
