import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const sampleBookings = await prisma.bookings.findMany({
    where: { status: 'completed' },
    select: { fare_amount: true, booking_id: true },
    take: 5
  })
  
  const sampleRides = await prisma.rides.findMany({
    select: { status: true, fare_per_seat: true, ride_id: true },
    take: 5
  })

  console.log('Sample Completed Bookings:', JSON.stringify(sampleBookings, null, 2))
  console.log('Sample Rides:', JSON.stringify(sampleRides, null, 2))
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
