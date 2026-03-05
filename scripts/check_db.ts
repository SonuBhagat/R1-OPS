import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const bookingStatuses = await prisma.bookings.groupBy({
    by: ['status'],
    _count: { _all: true }
  })
  
  const rideStatuses = await prisma.rides.groupBy({
    by: ['status'],
    _count: { _all: true }
  })

  const totalUsers = await prisma.users.count()
  const totalDrivers = await prisma.users.count({
    where: { role: { in: ['rider', 'both'] } }
  })

  console.log('Booking Statuses:', JSON.stringify(bookingStatuses, null, 2))
  console.log('Ride Statuses:', JSON.stringify(rideStatuses, null, 2))
  console.log('Total Users:', totalUsers)
  console.log('Total Drivers:', totalDrivers)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
