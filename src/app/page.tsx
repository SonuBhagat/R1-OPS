import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  Users, 
  Activity, 
  Route,
  Zap,
  Target
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Options } from 'highcharts'
import { getDashboardStats, getRecentBookings, getRouteAnalytics } from "./actions"


export default async function DashboardPage() {
  const liveStats = await getDashboardStats();
  const liveBookings = await getRecentBookings();
  const routeAnalytics = await getRouteAnalytics();

  const stats = [
    {
      title: "Active Rides",
      value: liveStats.activeRides.toString(),
      change: "Live",
      trend: "up",
      icon: Activity,
      color: "text-emerald-600",
      bg: "bg-emerald-50/50"
    },
    {
      title: "Total Fleet",
      value: liveStats.totalDrivers.toString(),
      change: "Verified",
      trend: "up",
      icon: Zap,
      color: "text-purple-600",
      bg: "bg-purple-50/50"
    },
    {
      title: "Active Users",
      value: liveStats.totalUsers.toString(),
      change: "Stable",
      trend: "up",
      icon: Users,
      color: "text-slate-600",
      bg: "bg-slate-50/50"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      <DashboardHeader />
      <main className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="border-slate-200/60 group transition-all duration-300 overflow-hidden bg-white/50">
              <CardContent className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                    <stat.icon className="h-4 w-4" />
                  </div>
                  <Badge variant="outline" className={`text-[10px] font-bold border-0 bg-transparent ${stat.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight text-slate-900">{stat.value}</div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts & Table Section */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">

          <Card className="shadow-none border-slate-200/60 overflow-hidden flex flex-col bg-white/50">
            <CardHeader className="pb-4 h-14 border-b border-slate-100 bg-white/50 backdrop-blur-sm flex flex-row items-center">
              <CardTitle className="text-sm font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2">
                <Target className="h-4 w-4 text-rose-500" /> Route Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 border-b border-slate-100">
                    <TableHead className="text-[10px] font-bold text-slate-500 uppercase tracking-wider py-3">Route Pair</TableHead>
                    <TableHead className="text-[10px] font-bold text-slate-500 uppercase tracking-wider text-right py-3 pr-6">Avg Fare</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                   {routeAnalytics.map((route, index) => (
                    <TableRow key={index} className="h-12 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 px-4">
                      <TableCell className="text-xs font-semibold text-slate-700 py-3">{route.route}</TableCell>
                      <TableCell className="text-xs text-right py-3 pr-6 font-bold text-slate-900">₹{route.avgFare}</TableCell>
                    </TableRow>
                   ))}
                </TableBody>
              </Table>
            </CardContent>
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 mt-auto">
               <Button variant="ghost" className="w-full text-[10px] h-9 font-bold uppercase tracking-widest text-slate-500 hover:text-primary transition-colors">View All Analytics</Button>
            </div>
          </Card>
        </div>

        {/* Recent Bookings Activity */}
        <Card className="border-slate-200/60 overflow-hidden bg-white/50">
          <CardHeader className="pb-4 border-b border-slate-100 bg-white/50 backdrop-blur-sm h-14 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <Activity className="h-4 w-4 text-emerald-500" /> Live Booking Stream
            </CardTitle>
            <Badge variant="outline" className="text-[9px] font-bold text-emerald-600 border-emerald-200 bg-emerald-50 uppercase tracking-tighter">Real-time</Badge>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-slate-100">
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 h-11">Passenger</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11">Route Overview</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center h-11">Status</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-right px-6 h-11">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {liveBookings.map((booking) => (
                  <TableRow key={booking.id} className="h-16 hover:bg-slate-50/80 transition-all border-b border-slate-50 last:border-0 group">
                    <TableCell className="px-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{booking.user}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {booking.id}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-xs font-semibold text-slate-600">{booking.route}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge 
                        variant="outline"
                        className={`text-[10px] font-bold uppercase tracking-tighter px-2.5 py-0.5 rounded-lg border-0 ring-1 ${
                          booking.status === 'completed' ? 'bg-emerald-50 text-emerald-700 ring-emerald-100' : 
                          booking.status === 'confirmed' ? 'bg-blue-50 text-blue-700 ring-blue-100' : 
                          'bg-slate-50 text-slate-500 ring-slate-100'
                        }`}
                      >
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-slate-900">{booking.amount}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{booking.time}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
