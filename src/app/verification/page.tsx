import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
  Eye, 
  CheckCircle2, 
  Filter,
  ExternalLink,
  ShieldCheck,
  FileText,
  AlertCircle
} from "lucide-react"
import { getKYCPendingDrivers } from "../actions"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { VerificationActions } from "@/components/verification-actions"
import { DocumentVerificationActions } from "@/components/document-verification-actions"

export default async function VerificationPage() {
  const drivers = await getKYCPendingDrivers();

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/30">
      <DashboardHeader />
      <main className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">KYC Verification</h1>
            <p className="text-sm text-slate-500 font-medium">Review and approve driver identification documents to maintain platform trust.</p>
          </div>
          <div className="flex items-center gap-3">
             <Button variant="outline" size="sm" className="h-9 rounded-lg border-slate-200 bg-white shadow-sm hover:bg-slate-50">
              <Filter className="mr-2 h-3.5 w-3.5" /> Filter Requests
            </Button>
            <Button size="sm" className="h-9 rounded-lg bg-primary shadow-sm hover:bg-primary/90">
              Bulk Actions
            </Button>
          </div>
        </div>

        <Card className="shadow-sm border-slate-200/60 overflow-hidden">
          <CardHeader className="pb-4 pt-4 border-b border-slate-100 bg-white/50 backdrop-blur-sm flex flex-row items-center justify-between h-14">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">Pending Verifications</span>
              <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none px-2.5 font-bold text-[10px] uppercase tracking-tighter">
                {drivers.length} Needs Attention
              </Badge>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="text-[9px] font-bold text-slate-400 uppercase tracking-widest border-0">Live Records</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b border-slate-100">
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11 px-6">Candidate</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11">Status</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11">Role</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11">Requested On</TableHead>
                  <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider h-11 text-right px-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.id} className="h-16 hover:bg-slate-50/80 transition-all border-b border-slate-50 last:border-0 group">
                    <TableCell className="px-6">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 rounded-full border border-slate-200 shadow-sm">
                          <AvatarFallback className="text-[11px] font-bold bg-slate-100 text-slate-600 uppercase">
                            {driver.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{driver.name}</span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{driver.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-amber-500 font-bold text-[10px] uppercase tracking-tighter">
                        <AlertCircle className="h-3 w-3" /> Awaiting Review
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-[9px] font-bold uppercase px-2 py-0 border-0 ring-1 ring-slate-100 bg-slate-50 text-slate-500">
                        {driver.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-[11px] text-slate-500 font-semibold tracking-tight">
                      {driver.date}
                    </TableCell>
                    <TableCell className="text-right px-6">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-9 px-4 rounded-lg bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-600 font-bold text-[10px] uppercase tracking-widest transition-all">
                            Review File
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl rounded-2xl border-0 shadow-2xl overflow-hidden p-0">
                          <div className="bg-slate-900 p-6 text-white relative">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                              <ShieldCheck className="h-32 w-32" />
                            </div>
                            <DialogHeader>
                              <div className="flex items-center gap-4 mb-2">
                                <Avatar className="h-12 w-12 border-2 border-white/20">
                                  <AvatarFallback className="bg-white/10 text-white font-bold">{driver.name.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <DialogTitle className="text-xl font-bold">{driver.name}</DialogTitle>
                                  <DialogDescription className="text-slate-400 text-xs font-medium">
                                    Submitted for verification on {driver.date}
                                  </DialogDescription>
                                </div>
                              </div>
                            </DialogHeader>
                          </div>
                          
                          <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto bg-slate-50/50">
                            {driver.documents.map((doc: any) => (
                              <div key={doc.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-bold uppercase text-[10px]">
                                      <FileText className="h-5 w-5" />
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Asset Type</span>
                                      <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">{doc.type}</span>
                                    </div>
                                  </div>
                                  <DocumentVerificationActions docId={doc.id} currentStatus={doc.status} />
                                </div>
                                <div className="aspect-video bg-slate-100 rounded-xl flex items-center justify-center border border-slate-200 overflow-hidden group relative shadow-inner">
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
                                      <ExternalLink className="h-4 w-4 mr-2" /> View Original
                                    </Button>
                                  </a>
                                </div>
                              </div>
                            ))}
                            {driver.documents.length === 0 && (
                              <div className="p-12 text-center flex flex-col items-center gap-4 bg-white border border-dashed border-slate-200 rounded-2xl">
                                <div className="h-12 w-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                                  <FileText className="h-6 w-6" />
                                </div>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed">No documentation assets found<br/>for this candidate</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-2 pl-2">
                               <ShieldCheck className="h-4 w-4 text-emerald-500" />
                               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Standard KYC Protocol</span>
                            </div>
                            <VerificationActions userId={driver.id} />
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {drivers.length === 0 && (
              <div className="p-16 text-center flex flex-col items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-tight">Zero Backlog</h3>
                  <p className="text-xs font-medium text-slate-500 mt-1">All driver verifications are currently up to date.</p>
                </div>
              </div>
            )}
            <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest pl-2">
                Processed {drivers.length} candidates today
              </span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-8 px-4 rounded-lg text-[10px] font-bold border-slate-200 uppercase tracking-widest" disabled>Prev</Button>
                <Button variant="outline" size="sm" className="h-8 px-4 rounded-lg text-[10px] font-bold border-slate-200 uppercase tracking-widest" disabled>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
