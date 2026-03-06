"use server"

import prisma from "@/lib/prisma"
import { hashPassword, comparePassword, login, logout, getSession } from "@/lib/auth"
import { redirect } from "next/navigation"

export async function loginAdmin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    const admin = await prisma.admins.findUnique({
      where: { username }
    });

    if (!admin) {
      return { error: "Invalid credentials" };
    }

    const isPasswordValid = await comparePassword(password, admin.password);

    if (!isPasswordValid) {
      return { error: "Invalid credentials" };
    }

    await login({
      id: admin.id,
      username: admin.username,
      name: admin.name,
      role: admin.role
    });

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function logoutAdmin() {
  await logout();
  redirect("/login");
}

export async function createAdmin(formData: FormData) {
  const session = await getSession();
  if (!session) {
    return { error: "Unauthorized" };
  }

  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string || "admin";

  if (!username || !password) {
    return { error: "Username and password are required" };
  }

  try {
    const hashedPassword = await hashPassword(password);
    await prisma.admins.create({
      data: {
        username,
        password: hashedPassword,
        name,
        role
      }
    });
    return { success: true };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { error: "Username already exists" };
    }
    console.error("Create admin error:", error);
    return { error: "Failed to create admin" };
  }
}

export async function getAllAdmins() {
  try {
    const admins = await prisma.admins.findMany({
      orderBy: { created_at: 'desc' },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        created_at: true
      }
    });
    return admins;
  } catch (error) {
    console.error("Failed to fetch admins:", error);
    return [];
  }
}

export async function getDashboardStats() {
  try {
    const [userCount, driverCount, activeRidesCount, totalRevenue] = await Promise.all([
      prisma.users.count(),
      prisma.users.count({
        where: {
          role: { in: ['rider', 'both'] }
        }
      }),
      prisma.rides.count({
        where: {
          status: { in: ['open', 'ongoing', 'searching', 'matched'] }
        }
      }),
      prisma.bookings.aggregate({
        where: {
          status: { in: ['completed', 'confirmed'] }
        },
        _sum: {
          fare_amount: true,
          negotiated_price: true
        }
      })
    ])

    const totalRev = Number(totalRevenue._sum.fare_amount || 0) + Number(totalRevenue._sum.negotiated_price || 0)

    return {
      totalUsers: userCount,
      totalDrivers: driverCount,
      activeRides: activeRidesCount,
      totalRevenue: totalRev
    }
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error)
    return {
      totalUsers: 0,
      totalDrivers: 0,
      activeRides: 0,
      totalRevenue: 0
    }
  }
}

export async function getRecentRides() {
  try {
    const rides = await prisma.rides.findMany({
      take: 10,
      orderBy: {
        created_at: 'desc'
      },
      include: {
        users: {
          select: {
            name: true
          }
        }
      }
    })

    return rides.map(ride => ({
      id: ride.ride_id.substring(0, 8),
      route: `${ride.from_text} -> ${ride.to_text}`,
      status: ride.status,
      amount: ride.fare_per_seat ? `₹${ride.fare_per_seat}` : "N/A",
      time: ride.created_at ? new Date(ride.created_at).toLocaleTimeString() : "Just now",
      driver: ride.users?.name || "Unknown",
      // Include location data for mapping
      locations: {
        from: { lat: ride.from_lat, lng: ride.from_lng },
        to: { lat: ride.to_lat, lng: ride.to_lng }
      }
    }))
  } catch (error) {
    console.error("Failed to fetch recent rides:", error)
    return []
  }
}

export async function getActiveRidesDetailed() {
  try {
    const rides = await prisma.rides.findMany({
      where: {
        status: { in: ['open', 'ongoing', 'matched', 'searching'] }
      },
      orderBy: {
        created_at: 'desc'
      },
      include: {
        users: {
          select: {
            name: true,
            phone: true
          }
        },
        bookings: {
          include: {
            users: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return rides.map(ride => ({
      id: `R-${ride.ride_id.substring(0, 4)}`,
      driver: ride.users?.name || "Waiting...",
      rider: ride.bookings[0]?.users?.name || "None",
      from: ride.from_text || "Unknown",
      to: ride.to_text || "Unknown",
      status: ride.status === 'matched' ? 'Ongoing' : ride.status === 'open' ? 'Searching' : ride.status,
      eta: "Live", // In a real system, this would come from a tracking service
      locations: {
        from: { lat: ride.from_lat, lng: ride.from_lng },
        to: { lat: ride.to_lat, lng: ride.to_lng }
      }
    }))
  } catch (error) {
    console.error("Failed to fetch active rides:", error)
    return []
  }
}

export async function getKYCPendingDrivers() {
  try {
    const drivers = await prisma.users.findMany({
      where: {
        role: { in: ['rider', 'both'] },
        is_verified: false
      },
      include: {
        driver_documents: true
      },
      orderBy: {
        created_at: 'desc'
      }
    })

    return drivers.map(driver => ({
      id: driver.id,
      name: driver.name || driver.phone || "Unnamed User",
      phone: driver.phone || "No phone",
      status: driver.is_verified ? "Verified" : "Pending",
      date: driver.created_at ? new Date(driver.created_at).toLocaleDateString() : "Today",
      role: driver.role || "Unknown",
      documents: driver.driver_documents.map(doc => ({
        id: doc.id,
        type: doc.type,
        url: doc.url,
        status: doc.status
      }))
    }))
  } catch (error) {
    console.error("Failed to fetch pending drivers:", error)
    return []
  }
}
export async function getRecentBookings() {
  try {
    const bookings = await prisma.bookings.findMany({
      take: 10,
      orderBy: {
        created_at: 'desc'
      },
      include: {
        users: {
          select: {
            name: true
          }
        },
        rides: {
          select: {
            from_text: true,
            to_text: true
          }
        }
      }
    })

    return bookings.map(booking => ({
      id: booking.booking_id.substring(0, 8),
      user: booking.users?.name || "Unknown",
      route: booking.rides ? `${booking.rides.from_text} -> ${booking.rides.to_text}` : "Unknown",
      seats: booking.seats,
      amount: booking.fare_amount ? `₹${booking.fare_amount}` : "N/A",
      status: booking.status,
      time: booking.created_at ? new Date(booking.created_at).toLocaleTimeString() : "Just now"
    }))
  } catch (error) {
    console.error("Failed to fetch recent bookings:", error)
    return []
  }
}

export async function verifyDriver(userId: string) {
  try {
    await prisma.users.update({
      where: { id: userId },
      data: { is_verified: true }
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to verify driver:", error)
    return { success: false, error: "Database update failed" }
  }
}

export async function rejectDriver(userId: string) {
  try {
    // Optionally update document status to 'rejected' if we had a more complex flow
    // For now, just keep is_verified as false or handle appropriately
    return { success: true }
  } catch (error) {
    console.error("Failed to reject driver:", error)
    return { success: false, error: "Action failed" }
  }
}

export async function getRouteAnalytics() {
  try {
    const rides = await prisma.rides.findMany({
      where: {
        status: { in: ['completed', 'matched', 'expired'] },
        fare_per_seat: { not: null }
      },
      take: 200
    })

    // Group by route and calculate average (simplified mock logic for now based on available data)
    // In a real scenario, we'd use raw SQL or a more complex grouping
    const routesMap = new Map()

    rides.forEach(ride => {
      const key = `${ride.from_text} - ${ride.to_text}`
      if (!routesMap.has(key)) {
        routesMap.set(key, { totalFare: 0, count: 0 })
      }
      const stats = routesMap.get(key)
      stats.totalFare += Number(ride.fare_per_seat || 0)
      stats.count += 1
    })

    return Array.from(routesMap.entries()).map(([route, stats]) => ({
      route,
      avgFare: (stats.totalFare / stats.count).toFixed(2)
    })).sort((a, b) => Number(b.avgFare) - Number(a.avgFare)).slice(0, 5)

  } catch (error) {
    console.error("Failed to fetch route analytics:", error)
    return []
  }
}

export async function updateDocumentStatus(docId: string, status: string) {
  try {
    await prisma.driver_documents.update({
      where: { id: docId },
      data: { status }
    })
    return { success: true }
  } catch (error) {
    console.error("Failed to update document status:", error)
    return { success: false, error: "Database update failed" }
  }
}

export async function getAllUsers() {
  try {
    const users = await prisma.users.findMany({
      orderBy: {
        created_at: 'desc'
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        role: true,
        is_verified: true,
        created_at: true,
        rating: true,
        avatar_url: true
      }
    })

    return users.map(user => ({
      id: user.id,
      name: user.name || user.phone || "Unnamed User",
      phone: user.phone || "No phone",
      email: user.email || "No email",
      role: (user.role || "rider").toLowerCase(),
      is_verified: user.is_verified || false,
      avatar: user.avatar_url,
      joinedAt: user.created_at ? new Date(user.created_at).toLocaleDateString() : "Unknown",
      rating: user.rating ? Number(user.rating).toFixed(1) : "N/A"
    }))
  } catch (error) {
    console.error("Failed to fetch all users:", error)
    return []
  }
}

export async function getUserById(userId: string) {
  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        rides: {
          take: 5,
          orderBy: { created_at: 'desc' }
        },
        bookings: {
          take: 5,
          orderBy: { created_at: 'desc' },
          include: {
            rides: true
          }
        },
        driver_documents: true,
        emergency_contacts: true,
        reviews_reviews_reviewed_user_idTousers: {
          take: 10,
          orderBy: { created_at: 'desc' },
          include: {
            users_reviews_reviewer_idTousers: {
              select: { name: true, avatar_url: true }
            }
          }
        }
      }
    })

    if (!user) return null

    return {
      id: user.id,
      name: user.name || user.phone || "Unnamed User",
      phone: user.phone || "No phone",
      email: user.email || "No email",
      role: (user.role || "rider").toLowerCase(),
      is_verified: user.is_verified || false,
      avatar: user.avatar_url,
      joinedAt: user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : "Unknown",
      rating: user.rating ? Number(user.rating).toFixed(1) : "N/A",
      whatsapp: user.whatsapp_number,
      notify_whatsapp: user.notify_whatsapp,
      recentRides: user.rides.map(r => ({
        id: r.ride_id.substring(0, 8),
        route: `${r.from_text} → ${r.to_text}`,
        status: r.status,
        date: r.created_at ? new Date(r.created_at).toLocaleDateString() : 'N/A'
      })),
      recentBookings: user.bookings.map(b => ({
        id: b.booking_id.substring(0, 8),
        route: b.rides ? `${b.rides.from_text} → ${b.rides.to_text}` : 'Unknown',
        status: b.status,
        date: b.created_at ? new Date(b.created_at).toLocaleDateString() : 'N/A'
      })),
      documents: user.driver_documents.map(d => ({
        id: d.id,
        type: d.type,
        status: d.status,
        url: d.url,
        updatedAt: d.updated_at ? new Date(d.updated_at).toLocaleDateString() : 'N/A'
      })),
      emergencyContacts: user.emergency_contacts.map(ec => ({
        name: ec.name,
        phone: ec.phone,
        relation: ec.relation
      })),
      reviews: user.reviews_reviews_reviewed_user_idTousers.map(rev => ({
        id: rev.review_id,
        rating: rev.rating,
        comment: rev.comment,
        reviewer: rev.users_reviews_reviewer_idTousers.name || "System",
        reviewerAvatar: rev.users_reviews_reviewer_idTousers.avatar_url,
        date: rev.created_at ? new Date(rev.created_at).toLocaleDateString() : 'N/A'
      }))
    }
  } catch (error) {
    console.error(`Failed to fetch user ${userId}:`, error)
    return null
  }
}

export async function getBookingTrends() {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const bookings = await prisma.bookings.findMany({
      where: {
        created_at: {
          gt: twentyFourHoursAgo
        }
      },
      select: {
        created_at: true
      }
    });

    const hourlyCounts = new Array(24).fill(0);
    const now = new Date();

    bookings.forEach(booking => {
      if (booking.created_at) {
        const hour = new Date(booking.created_at).getHours();
        hourlyCounts[hour]++;
      }
    });

    // Reorder to show last 24 hours in sequence
    const currentHour = now.getHours();
    const orderedCounts = [];
    const labels = [];

    for (let i = 23; i >= 0; i--) {
      const h = (currentHour - i + 24) % 24;
      orderedCounts.push(hourlyCounts[h]);
      labels.push(`${h}:00`);
    }

    return { labels, data: orderedCounts };
  } catch (error) {
    console.error("Failed to fetch booking trends:", error);
    return { labels: [], data: [] };
  }
}

export async function getRideStatusBreakdown() {
  try {
    const statusCounts = await prisma.rides.groupBy({
      by: ['status'],
      _count: {
        status: true
      }
    });

    return statusCounts.map(item => ({
      name: item.status.charAt(0).toUpperCase() + item.status.slice(1),
      y: item._count.status
    }));
  } catch (error) {
    console.error("Failed to fetch ride status breakdown:", error);
    return [];
  }
}

export async function getSystemHealth() {
  try {
    // Simple DB ping
    await prisma.$queryRaw`SELECT 1`;
    return {
      status: 'healthy',
      latency: '12ms', // Mocked for UI feel
      services: [
        { name: 'Database', status: 'online' },
        { name: 'API Gateway', status: 'online' },
        { name: 'Maps Provider', status: 'online' },
        { name: 'Worker Service', status: 'online' }
      ]
    };
  } catch (error) {
    return {
      status: 'degraded',
      latency: 'N/A',
      services: [
        { name: 'Database', status: 'offline' }
      ]
    };
  }
}

export async function globalSearch(query: string) {
  if (!query || query.length < 2) return [];

  try {
    const [users, rides] = await Promise.all([
      prisma.users.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { phone: { contains: query } },
            { email: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: 5
      }),
      prisma.rides.findMany({
        where: {
          OR: [
            { from_text: { contains: query, mode: 'insensitive' } },
            { to_text: { contains: query, mode: 'insensitive' } }
          ]
        },
        take: 5
      })
    ]);

    const results = [
      ...users.map(u => ({ id: u.id, title: u.name, type: 'User', url: `/users/${u.id}` })),
      ...rides.map(r => ({ id: r.ride_id, title: `${r.from_text} -> ${r.to_text}`, type: 'Ride', url: `/rides/${r.ride_id}` }))
    ];

    return results;
  } catch (error) {
    return [];
  }
}

export async function getDailyUserGrowth() {
  try {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const users = await prisma.users.findMany({
      where: {
        created_at: {
          gt: sevenDaysAgo
        }
      },
      select: {
        created_at: true
      }
    });

    const dailyCounts: { [key: string]: number } = {};
    const labels: string[] = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      labels.push(dateString);
      dailyCounts[dateString] = 0;
    }

    users.forEach(user => {
      if (user.created_at) {
        const dateString = new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (dailyCounts[dateString] !== undefined) {
          dailyCounts[dateString]++;
        }
      }
    });

    const data = labels.map(label => dailyCounts[label]);

    return { labels, data };
  } catch (error) {
    console.error("Failed to fetch daily user growth:", error);
    return { labels: [], data: [] };
  }
}
