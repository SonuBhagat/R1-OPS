import { getUserById } from "@/app/actions"
import { DashboardHeader } from "@/components/dashboard-header"
import { UserProfileHeader } from "@/components/user-profile-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  MapPin, 
  Clock, 
  ChevronRight, 
  AlertCircle,
  TrendingUp,
  History,
  Star,
  ExternalLink,
  ShieldCheck,
  Phone
} from "lucide-react"
import { notFound } from "next/navigation"
import { DocumentVerificationActions } from "@/components/document-verification-actions"
import { VerificationActions } from "@/components/verification-actions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default async function UserProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await getUserById(id)

  if (!user) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      <DashboardHeader />
      <main className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full pb-12">
        <UserProfileHeader user={{
          ...user,
          whatsapp: user.whatsapp,
          notify_whatsapp: user.notify_whatsapp
        }} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Activity & History */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Ride Activity */}
            <Card className="shadow-sm border-slate-200/60 overflow-hidden">
              <CardHeader className="border-b border-slate-100 bg-white/50 backdrop-blur-sm h-14 py-0 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                  <History className="h-4 w-4 text-primary" /> Recent Ride Activity
                </CardTitle>
                <Badge variant="outline" className="text-[10px] font-bold text-slate-500 uppercase border-0 bg-slate-100/50">Last 5 Activities</Badge>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {user.recentRides.length > 0 ? user.recentRides.map((ride) => (
                    <div key={ride.id} className="p-4 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900 leading-tight mb-1">{ride.route}</span>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {ride.date}</span>
                            <span className="px-1 py-0.5 rounded bg-slate-100 text-[9px] font-bold uppercase tracking-tighter">ID: {ride.id}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className={`text-[10px] uppercase font-bold px-2 py-0 border-0 ring-1 ${
                          ride.status === 'completed' ? 'bg-emerald-50 text-emerald-700 ring-emerald-100' : 'bg-amber-50 text-amber-700 ring-amber-100'
                        }`}>
                          {ride.status}
                        </Badge>
                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  )) : (
                    <div className="p-8 text-center text-slate-400 text-sm font-medium">No recent ride activity found</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Ratings & Reviews */}
            <Card className="shadow-sm border-slate-200/60 overflow-hidden">
              <CardHeader className="border-b border-slate-100 bg-white/50 backdrop-blur-sm h-14 py-0 flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-tight">
                  <Star className="h-4 w-4 text-amber-500" /> Platform Reviews
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-slate-100">
                  {user.reviews.length > 0 ? user.reviews.map((review) => (
                    <div key={review.id} className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`h-3 w-3 ${review.rating >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-100'}`} />
                            ))}
                           </div>
                           <span className="text-[10px] font-bold text-slate-400 uppercase ml-2">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed font-medium">"{review.comment}"</p>
                       <div className="flex items-center gap-2">
                        <div className="h-5 w-5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                           {review.reviewerAvatar ? (
                             <img src={review.reviewerAvatar || undefined} alt="" />
                           ) : (
                             <div className="h-full w-full flex items-center justify-center text-[8px] font-bold text-slate-400 uppercase">{review.reviewer.substring(0, 2)}</div>
                           )}
                        </div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Ref: {review.reviewer}</span>
                      </div>
                    </div>
                  )) : (
                    <div className="p-8 text-center text-slate-400 text-sm font-medium">No platform reviews yet</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Verification & Documents */}
          <div className="space-y-6">
            {/* Verification Status Card */}
            <Card className="shadow-sm border-slate-200/60 overflow-hidden">
              <CardHeader className="border-b border-slate-100 pb-3 flex flex-row items-center justify-between h-14 bg-white/50">
                <CardTitle className="text-sm font-bold text-slate-900 uppercase tracking-tight">Verification Assets</CardTitle>
                <VerificationActions userId={user.id} />
              </CardHeader>
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${user.is_verified ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 tracking-tight uppercase">Profile Status</span>
                      <span className="text-[10px] font-medium text-slate-500">{user.is_verified ? 'Verified & Trusted' : 'Pending Verification'}</span>
                    </div>
                  </div>
                  <Badge variant={user.is_verified ? 'default' : 'outline'} className={`text-[10px] font-bold uppercase rounded-md tracking-tighter ${user.is_verified ? 'bg-emerald-500 hover:bg-emerald-600' : 'text-amber-600 border-amber-200'}`}>
                    {user.is_verified ? 'ACTV' : 'PEND'}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Uploaded Documents</span>
                    <Badge variant="outline" className="text-[9px] font-bold border-0 bg-slate-100 text-slate-500 h-4">{user.documents.length}</Badge>
                  </div>
                  
                  {user.documents.length > 0 ? user.documents.map((doc) => (
                    <Dialog key={doc.id}>
                      <DialogTrigger asChild>
                        <div className="p-3 rounded-xl border border-slate-100 hover:shadow-sm hover:border-primary/20 transition-all flex items-center justify-between group cursor-pointer bg-white">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors">
                              <FileText className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-slate-900 tracking-tight uppercase group-hover:text-primary transition-colors">{doc.type}</span>
                              <span className={`text-[9px] font-bold uppercase flex items-center gap-1 ${
                                doc.status === 'approved' ? 'text-emerald-500' : 
                                doc.status === 'rejected' ? 'text-rose-500' : 
                                'text-amber-500'
                              }`}>
                                {doc.status === 'approved' && <ShieldCheck className="h-2.5 w-2.5" />}
                                {doc.status || 'PENDING'}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-primary transition-colors" />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl rounded-2xl border-0 shadow-2xl overflow-hidden p-0">
                        <div className="bg-slate-900 p-6 text-white relative">
                          <DialogHeader>
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center">
                                <FileText className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <DialogTitle className="text-xl font-bold uppercase tracking-tight">{doc.type}</DialogTitle>
                                <DialogDescription className="text-slate-400 text-xs font-medium">
                                  Reviewing asset for {user.name}
                                </DialogDescription>
                              </div>
                            </div>
                          </DialogHeader>
                        </div>
                        
                        <div className="p-6 bg-slate-50/50">
                          <div className="aspect-video bg-white rounded-2xl flex items-center justify-center border border-slate-200 overflow-hidden group relative shadow-sm mb-6">
                            <img 
                              src={doc.url} 
                              alt={doc.type}
                              className="object-cover w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                            />
                            <a 
                              href={doc.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            >
                              <Button variant="secondary" size="sm" className="h-9 px-4 rounded-lg text-xs font-bold shadow-xl">
                                <ExternalLink className="h-4 w-4 mr-2" /> Open Original
                              </Button>
                            </a>
                          </div>
                          
                          <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-100">
                             <div className="flex flex-col">
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Current Status</span>
                               <span className="text-sm font-bold text-slate-900 uppercase">
                                 {doc.status || 'Awaiting Review'}
                               </span>
                             </div>
                             <div className="flex flex-col items-end">
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Last Updated</span>
                               <span className="text-xs font-semibold text-slate-600">
                                 {doc.updatedAt}
                               </span>
                             </div>
                             <DocumentVerificationActions docId={doc.id} currentStatus={doc.status || "pending"} />
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )) : (
                    <div className="p-8 rounded-xl border border-dashed border-slate-200 text-center flex flex-col items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                        <FileText className="h-5 w-5" />
                      </div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                        No documentation assets found<br/>for this profile
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts Card */}
            <Card className="shadow-sm border-slate-200/60 overflow-hidden">
              <CardHeader className="border-b border-slate-100 pb-3">
                <CardTitle className="text-sm font-bold text-slate-900 uppercase tracking-tight">Emergency Contacts</CardTitle>
              </CardHeader>
              <CardContent className="p-5 space-y-3">
                {user.emergencyContacts && user.emergencyContacts.length > 0 ? user.emergencyContacts.map((contact, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-50/50 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-red-50 flex items-center justify-center text-red-500">
                        <ShieldCheck className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900">{contact.name || 'Emergency Contact'}</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{contact.relation || 'Contact'}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-slate-400" />
                      <span className="text-sm font-semibold text-slate-600">{contact.phone || 'No phone'}</span>
                    </div>
                  </div>
                )) : (
                  <div className="p-4 text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    No emergency contacts added
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="shadow-sm border-slate-200/60 p-5 space-y-2 bg-white">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Total Bookings</span>
                <div className="text-2xl font-bold text-slate-900">{user.recentBookings?.length || 0}+</div>
                <div className="flex items-center text-[10px] font-bold text-emerald-600 uppercase tracking-tight">
                  <TrendingUp className="h-3 w-3 mr-1" /> Platform Active
                </div>
              </Card>
              <Card className="shadow-sm border-slate-200/60 p-5 space-y-2 bg-white">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Trust Index</span>
                <div className="text-2xl font-bold text-slate-900">High</div>
                <div className="flex items-center text-[10px] font-bold text-blue-600 uppercase tracking-tight">
                  <ShieldCheck className="h-3 w-3 mr-1" /> ID Verified
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
