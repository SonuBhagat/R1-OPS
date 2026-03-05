"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  Mail, 
  Phone, 
  Star, 
  MessageSquare, 
  MapPin, 
  Calendar,
  MoreVertical,
  ShieldCheck,
  UserCheck
} from "lucide-react"

interface UserProfileHeaderProps {
  user: {
    name: string
    avatar?: string | null
    role: string
    is_verified: boolean
    email: string
    phone: string
    joinedAt: string
    rating: string
    whatsapp?: string | null
    notify_whatsapp?: boolean | null
  }
}

export function UserProfileHeader({ user }: UserProfileHeaderProps) {
  return (
    <div className="relative group">
      {/* Background Gradient/Cover */}
      <div className="h-32 md:h-44 w-full bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl overflow-hidden relative">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* Profile Info Card */}
      <div className="px-6 -mt-12 relative pb-6 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6">
            <div className="relative">
              <Avatar className="h-28 w-28 md:h-36 md:w-36 rounded-2xl border-4 border-white shadow-xl">
                <AvatarImage src={user.avatar || undefined} alt={user.name} />
                <AvatarFallback className="text-2xl font-bold bg-slate-100 text-slate-600 uppercase">
                  {user.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              {user.is_verified && (
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 rounded-xl p-1.5 border-4 border-white shadow-lg">
                  <ShieldCheck className="h-5 w-5 text-white" />
                </div>
              )}
            </div>

            <div className="mb-2 space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{user.name}</h1>
                <Badge variant="outline" className={`text-[10px] uppercase font-bold px-2.5 py-0.5 rounded-lg border-0 ring-1 ${
                  user.role === 'driver' ? 'bg-blue-50 text-blue-700 ring-blue-100' : 
                  user.role === 'both' ? 'bg-purple-50 text-purple-700 ring-purple-100' : 
                  'bg-slate-50 text-slate-600 ring-slate-100'
                }`}>
                  {user.role}
                </Badge>
              </div>
              
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-sm text-slate-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-slate-400" /> {user.phone}
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-slate-400" /> {user.email}
                </div>
                {user.whatsapp && (
                  <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                    <MessageSquare className="h-3.5 w-3.5 text-emerald-500" /> {user.whatsapp}
                    {user.notify_whatsapp && <Badge variant="outline" className="text-[8px] h-3.5 px-1 bg-emerald-50 text-emerald-600 border-emerald-100">SMS+</Badge>}
                  </div>
                )}
                <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" /> Joined {user.joinedAt}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-2">
             <div className="bg-slate-50 p-2 px-4 rounded-xl border border-slate-100 flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Rating</span>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                  <span className="text-lg font-bold text-slate-900">{user.rating}</span>
                </div>
             </div>
             <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-slate-200 hover:bg-slate-50 text-slate-500">
               <MessageSquare className="h-5 w-5" />
             </Button>
             <Button className="h-12 px-6 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-95">
               Manage Access
             </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
