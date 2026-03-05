"use client"

import { useRouter } from "next/navigation"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Plus, 
  UserPlus, 
  AlertTriangle, 
  Activity, 
  RefreshCw,
  Server,
  Zap
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface HealthStatusProps {
  health: {
    status: string
    latency: string
    services: { name: string; status: string }[]
  }
}

export function SystemHealthMonitor({ health }: HealthStatusProps) {
  return (
    <Card className="border-slate-200/60 bg-white/50 backdrop-blur-sm overflow-hidden h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tight">
            <Server className="h-4 w-4 text-primary" /> System Health
          </CardTitle>
          <Badge variant="outline" className={`text-[10px] font-bold border-0 ${
            health.status === 'healthy' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
          }`}>
            {health.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {health.services.map((service) => (
            <div key={service.name} className="flex items-center justify-between bg-slate-50/50 p-2 rounded-lg border border-slate-100">
              <span className="text-[10px] font-bold text-slate-500 uppercase">{service.name}</span>
              <div className={`h-2 w-2 rounded-full ${service.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            </div>
          ))}
        </div>
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
           <span className="text-[10px] font-bold text-slate-400 uppercase">Avg Latency</span>
           <span className="text-xs font-bold text-slate-700">{health.latency}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export function QuickActions() {
  const router = useRouter()

  const actions = [
    { label: "New Notice", icon: Zap, color: "text-amber-500", bg: "bg-amber-50", onClick: () => alert("📢 Broadcast Notice feature coming soon!") },
    { label: "Verify User", icon: UserPlus, color: "text-blue-500", bg: "bg-blue-50", onClick: () => router.push("/users") },
    { label: "Check Alerts", icon: AlertTriangle, color: "text-rose-500", bg: "bg-rose-50", onClick: () => router.push("/settings/admins") },
    { label: "Refresh", icon: RefreshCw, color: "text-emerald-500", bg: "bg-emerald-50", onClick: () => router.refresh() }
  ]

  return (
    <Card className="border-slate-200/60 bg-white/50 backdrop-blur-sm overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tight">
          <Activity className="h-4 w-4 text-primary" /> Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Button 
            key={action.label}
            variant="ghost" 
            onClick={action.onClick}
            className="flex flex-col items-center justify-center h-20 gap-2 border border-slate-100 hover:bg-white hover:shadow-md transition-all group"
          >
            <div className={`p-2 rounded-lg ${action.bg} ${action.color} group-hover:scale-110 transition-transform`}>
              <action.icon className="h-4 w-4" />
            </div>
            <span className="text-[10px] font-extrabold text-slate-600 uppercase tracking-tighter">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  )
}
