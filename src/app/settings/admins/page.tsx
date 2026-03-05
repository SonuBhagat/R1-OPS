import { getAllAdmins, createAdmin } from "@/app/actions"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  UserPlus, 
  ShieldCheck, 
  Users, 
  Lock, 
  User, 
  Mail,
  Calendar,
  MoreVertical,
  ShieldAlert
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default async function AdminsPage() {
  const admins = await getAllAdmins()

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      <DashboardHeader />
      <main className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full pb-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Admin Management</h1>
            <p className="text-sm text-slate-500 font-medium">Manage dashboard access and administrator accounts</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Admin Form */}
          <div className="lg:col-span-1">
            <Card className="border-slate-200/60 sticky top-6 overflow-hidden bg-white/50">
               <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                  <UserPlus className="h-4 w-4 text-primary" /> Create New Admin
                </CardTitle>
                <CardDescription className="text-[11px] font-medium leading-relaxed">
                  Assign a unique username and secure password.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form action={async (formData) => {
                  "use server"
                  await createAdmin(formData)
                }} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        <User className="h-3.5 w-3.5" />
                      </div>
                      <Input name="name" placeholder="John Doe" className="pl-9 h-10 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl text-sm" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Username</label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        <Mail className="h-3.5 w-3.5" />
                      </div>
                      <Input name="username" placeholder="john.admin" required className="pl-9 h-10 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl text-sm" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Initial Password</label>
                    <div className="relative group">
                      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
                        <Lock className="h-3.5 w-3.5" />
                      </div>
                      <Input name="password" type="password" placeholder="••••••••" required className="pl-9 h-10 bg-slate-50/50 border-slate-200 focus:bg-white transition-all rounded-xl text-sm" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Assign Role</label>
                    <select 
                      name="role" 
                      className="w-full h-10 bg-slate-50/50 border border-slate-200 rounded-xl px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
                    >
                      <option value="admin">Administrator</option>
                      <option value="ops">Operations Manager</option>
                      <option value="superadmin">Super Admin</option>
                    </select>
                  </div>

                  <Button className="w-full h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold mt-2">
                    Initialize Admin Account
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Admins List */}
          <div className="lg:col-span-2">
            <Card className="border-slate-200/60 overflow-hidden bg-white/50">
              <CardHeader className="border-b border-slate-100 bg-white/50 h-14 py-0 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                  <Users className="h-4 w-4 text-primary" /> Active Administrators
                </CardTitle>
                <Badge variant="outline" className="text-[10px] font-bold text-slate-500 uppercase border-0 bg-slate-100/50">
                  {admins.length} Total Accounts
                </Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {admins.map((admin: any) => (
                    <div key={admin.id} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className={`h-10 w-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                          admin.role === 'superadmin' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {admin.role === 'superadmin' ? <ShieldAlert className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                        </div>
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900">{admin.name || admin.username}</span>
                            <Badge className={`text-[8px] h-4 uppercase font-black px-1.5 rounded-md border-0 ${
                              admin.role === 'superadmin' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {admin.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2.5 text-[10px] text-slate-500 font-bold uppercase tracking-tight">
                             <span className="flex items-center gap-1">@{admin.username}</span>
                             <span className="flex items-center gap-1 border-l border-slate-200 pl-2">
                               <Calendar className="h-2.5 w-2.5" /> Added {new Date(admin.created_at || '').toLocaleDateString()}
                             </span>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
