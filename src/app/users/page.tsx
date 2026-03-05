import { getAllUsers } from "../actions"
import { UserTable } from "@/components/user-table"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCheck, ShieldCheck, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function UsersPage() {
  const users = await getAllUsers()

  const stats = [
    {
      label: "Total Platform Users",
      value: users.length,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      label: "Verified Members",
      value: users.filter(u => u.is_verified).length,
      icon: ShieldCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      label: "Drivers & Partners",
      value: users.filter(u => u.role === 'driver' || u.role === 'both').length,
      icon: UserCheck,
      color: "text-purple-600",
      bg: "bg-purple-50"
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      <DashboardHeader />
      <main className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">User Management</h1>
            <p className="text-sm text-slate-500 font-medium">Monitor, verify and manage all RAAHI platform participants.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="h-9 rounded-lg border-slate-200 bg-white hover:bg-slate-50">
              Export Directory
            </Button>
            <Button size="sm" className="h-9 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold">
              <UserPlus className="mr-2 h-4 w-4" /> Add User
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-slate-200/60 overflow-hidden group bg-white/50">
              <CardContent className="p-5 flex items-center gap-4">
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} transition-transform duration-300 group-hover:scale-110`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{stat.label}</span>
                  <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-800">Master Directory</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-500 uppercase">Live</span>
            </div>
          </div>
          <UserTable users={users} />
        </div>
      </main>
    </div>
  )
}
