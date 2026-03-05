"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  MoreHorizontal,
  Mail,
  Phone,
  Star,
  CheckCircle2,
  XCircle,
  Eye,
  UserCheck,
  UserX,
  History
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface User {
  id: string
  name: string
  phone: string
  email: string
  role: string
  is_verified: boolean
  joinedAt: string
  rating: string
  avatar?: string | null
}

interface UserTableProps {
  users: User[]
}

export function UserTable({ users }: UserTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.phone.includes(searchTerm) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="rounded-xl border border-slate-200/60 bg-white/50 backdrop-blur-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-slate-200/60">
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11 px-6">User Details</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11">Role</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11">Verification</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11">Performance</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11">Joined Date</TableHead>
            <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11 text-right px-6">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <TableRow 
                key={user.id} 
                className="group hover:bg-slate-50/80 transition-all duration-200 border-b border-slate-100 last:border-0 h-16 cursor-pointer"
                onClick={() => router.push(`/users/${user.id}`)}
              >
                <TableCell className="px-6">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-9 w-9 rounded-full border-2 border-white ring-1 ring-slate-100">
                        <AvatarImage src={user.avatar || ""} alt={user.name} />
                        <AvatarFallback className="text-xs font-bold bg-slate-100 text-slate-600 uppercase">
                          {user.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      {user.is_verified && (
                        <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 rounded-full p-0.5 border-2 border-white">
                          <CheckCircle2 className="h-2 w-2 text-white fill-emerald-500" />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 leading-tight mb-0.5 group-hover:text-primary transition-colors">{user.name}</span>
                      <div className="flex items-center gap-2.5 text-[10px] text-slate-500">
                        <span className="flex items-center gap-1 font-medium"><Phone className="h-2.5 w-2.5 text-slate-400" /> {user.phone}</span>
                        <span className="flex items-center gap-1 font-medium italic"><Mail className="h-2.5 w-2.5 text-slate-400" /> {user.email}</span>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md border-0 ring-1 ${
                    user.role === 'driver' ? 'bg-blue-50 text-blue-700 ring-blue-100' : 
                    user.role === 'both' ? 'bg-purple-50 text-purple-700 ring-purple-100' : 
                    'bg-slate-50 text-slate-600 ring-slate-100'
                  }`}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.is_verified ? (
                    <div className="flex items-center gap-1.5 text-emerald-600">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-tight uppercase">Verified</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-amber-500">
                      <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      <span className="text-[10px] font-bold tracking-tight uppercase">Reviewing</span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`h-2.5 w-2.5 ${
                            user.rating !== 'N/A' && Number(user.rating) >= star 
                              ? 'text-amber-400 fill-amber-400' 
                              : 'text-slate-200 fill-slate-100'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-slate-700">{user.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">EST.</span>
                    <span className="text-[11px] text-slate-600 font-semibold">{user.joinedAt}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right px-6" onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-slate-100 text-slate-500">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52 rounded-xl p-1 border-slate-200/60 overflow-hidden bg-white/95 backdrop-blur-md">
                      <DropdownMenuLabel className="text-[10px] uppercase font-bold text-slate-400 px-3 py-2 leading-none">Administration</DropdownMenuLabel>
                      <Link href={`/users/${user.id}`}>
                        <DropdownMenuItem className="text-xs py-2 rounded-lg cursor-pointer flex items-center gap-2 font-medium">
                          <Eye className="h-3.5 w-3.5 text-blue-500" /> View Profile
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuItem className="text-xs py-2 rounded-lg cursor-pointer flex items-center gap-2 font-medium">
                        <History className="h-3.5 w-3.5 text-slate-500" /> Ride Activity
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-100 mx-2" />
                      {!user.is_verified ? (
                        <DropdownMenuItem className="text-xs py-2 rounded-lg cursor-pointer flex items-center gap-2 font-medium text-emerald-600">
                          <UserCheck className="h-3.5 w-3.5" /> Approve Driver
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="text-xs py-2 rounded-lg cursor-pointer flex items-center gap-2 font-medium text-amber-600">
                          <UserX className="h-3.5 w-3.5" /> Revoke Access
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-xs py-2 rounded-lg cursor-pointer flex items-center gap-2 font-medium text-rose-600">
                        <XCircle className="h-3.5 w-3.5" /> Suspend Account
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <div className="flex flex-col items-center gap-2 text-slate-400">
                  <Eye className="h-8 w-8 opacity-20" />
                  <span className="text-xs font-medium uppercase tracking-widest">No matching users found</span>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
