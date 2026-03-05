import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { UserTable } from "@/components/user-table"
import { getAllUsers } from "../actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, ShieldCheck, Zap, Filter } from "lucide-react"

export default async function FleetPage() {
  const users = await getAllUsers();
  const drivers = users.filter(u => u.role === 'driver' || u.role === 'both');

  const stats = [
    { label: "Active Fleet", value: drivers.length, icon: Car, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Verified Drivers", value: drivers.filter(u => u.is_verified).length, icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "High Performing", value: drivers.filter(u => u.rating !== 'N/A' && Number(u.rating) >= 4.5).length, icon: Zap, color: "text-amber-600", bg: "bg-amber-50" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      <DashboardHeader />
      <main className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Fleet Tracking</h1>
            <p className="text-sm text-slate-500 font-medium">Real-time status and performance of your verified driver network.</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9 px-4 text-xs font-bold rounded-lg border-slate-200 bg-white">
              <Filter className="mr-2 h-3.5 w-3.5" /> Filter Fleet
            </Button>
            <Button size="sm" className="h-9 px-4 text-xs font-bold rounded-lg bg-primary shadow-sm hover:bg-primary/90">
              Manage Dispatch
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="shadow-sm border-slate-200/60 group hover:shadow-md transition-all duration-300">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.label}</span>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
             <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-800 uppercase tracking-tighter">Verified Drivers</span>
              <Badge variant="secondary" className="bg-slate-100 text-[9px] font-bold text-slate-500 border-none uppercase">Live Feed</Badge>
            </div>
          </div>
          <UserTable users={drivers} />
        </div>
      </main>
    </div>
  )
}
