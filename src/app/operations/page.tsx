import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Map as MapIcon, 
  MapPin,
  Navigation, 
  Clock, 
  Users, 
  Search,
  Maximize2,
  Layers,
  Zap,
  Phone,
  MessageSquare,
  AlertCircle
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { getActiveRidesDetailed } from "../actions"

// Coordinate mapping for India
// Bounds: Lat 8-37, Lng 68-97
const mapCoords = (lat: number | null, lng: number | null) => {
  if (!lat || !lng) return { top: '50%', left: '50%' };
  
  // Normalize and bound
  const normalizedLat = Math.min(Math.max(lat, 8), 37);
  const normalizedLng = Math.min(Math.max(lng, 68), 97);
  
  const top = ((37 - normalizedLat) / (37 - 8)) * 100;
  const left = ((normalizedLng - 68) / (97 - 68)) * 100;
  
  return { 
    top: `${Math.max(5, Math.min(95, top))}%`, 
    left: `${Math.max(5, Math.min(95, left))}%` 
  };
};

export default async function OperationsPage() {
  const activeRides = await getActiveRidesDetailed();
  
  const onlineCount = activeRides.length * 3 + 12;
  const ongoingCount = activeRides.filter(r => r.status === 'Ongoing').length;
  const searchingCount = activeRides.filter(r => r.status === 'Searching').length;

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 p-4 space-y-4 max-w-[1600px] mx-auto w-full">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Operations Hub</h1>
            <p className="text-xs text-muted-foreground">Real-time monitoring of RAAHI fleet and active rides across India.</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-100 px-3 py-1 font-semibold text-[10px]">
              Platform Stable
            </Badge>
            <Button size="sm" className="h-8 text-xs gap-2">
              <Zap className="h-3 w-3" /> System Broadcast
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)] min-h-[600px]">
          {/* Live Map View */}
          <Card className="lg:col-span-2 shadow-none border border-border/50 flex flex-col overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b px-4 py-3 h-14 shrink-0">
              <div className="flex items-center gap-2">
                <MapIcon className="h-4 w-4 text-primary" />
                <CardTitle className="text-sm font-semibold">Live Fleet View (India)</CardTitle>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground mr-4">
                <div className="flex items-center gap-1"><div className="h-2 w-2 rounded-full bg-primary" /> Ongoing</div>
                <div className="flex items-center gap-1 ml-3"><div className="h-2 w-2 rounded-full bg-amber-500" /> Searching</div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8"><Layers className="h-3 w-3" /></Button>
                <Button variant="outline" size="icon" className="h-8 w-8"><Maximize2 className="h-3 w-3" /></Button>
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-0 relative bg-slate-950 overflow-hidden">
              {/* Premium India Map Background (Local Asset) */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-700" 
                style={{ 
                  backgroundImage: "url('/assets/india-map.png')",
                  opacity: 0.45 
                }} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
              
              {/* Markers for Active Rides with Real Coordinates */}
              {activeRides.map((ride) => {
                const pos = mapCoords(ride.locations.from.lat, ride.locations.from.lng);
                return (
                  <div 
                    key={ride.id} 
                    className="absolute animate-bounce-slow cursor-pointer group z-10"
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div className="relative">
                      <Navigation className={`h-5 w-5 ${ride.status === 'Ongoing' ? 'text-cyan-400' : 'text-amber-400'} rotate-45 fill-current/20 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]`} />
                      {/* Pulse effect for ongoing rides */}
                      {ride.status === 'Ongoing' && (
                        <div className="absolute inset-0 h-5 w-5 bg-cyan-400/30 rounded-full animate-ping -z-10" />
                      )}
                    </div>
                    
                    <div className="hidden group-hover:block absolute top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white p-2 rounded-lg shadow-2xl border border-slate-700 w-40 z-20">
                      <p className="text-[10px] font-bold border-b border-slate-700 pb-1 mb-1 tracking-tight">{ride.id}</p>
                      <div className="space-y-1">
                        <p className="text-[9px]"><span className="text-slate-400">From:</span> {ride.from}</p>
                        <p className="text-[9px]"><span className="text-slate-400">To:</span> {ride.to}</p>
                        <p className="text-[9px] font-semibold text-cyan-400">Driver: {ride.driver}</p>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Map Footer Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 shadow-2xl flex gap-6 pointer-events-auto text-white">
                  <div className="space-y-0.5">
                     <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Online Fleet</span>
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                        <span className="text-sm font-bold">{onlineCount}</span>
                     </div>
                  </div>
                  <div className="w-px h-8 bg-slate-700" />
                  <div className="space-y-0.5">
                     <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Ongoing</span>
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                        <span className="text-sm font-bold">{ongoingCount}</span>
                     </div>
                  </div>
                  <div className="w-px h-8 bg-slate-700" />
                  <div className="space-y-0.5">
                     <span className="text-[9px] text-slate-400 block font-bold uppercase tracking-wider">Searching</span>
                     <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                        <span className="text-sm font-bold">{searchingCount}</span>
                     </div>
                  </div>
                </div>
                <Badge variant="outline" className="bg-slate-900/90 backdrop-blur-md border-slate-700 text-slate-300 text-[10px] py-1 px-3 shadow-xl pointer-events-auto">
                  Live Terminal • {new Date().toLocaleTimeString()}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Active Rides Monitor */}
          <Card className="shadow-none border border-border/50 flex flex-col overflow-hidden">
            <CardHeader className="border-b px-4 py-3 h-14 shrink-0">
               <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold">Active Rides Monitor</CardTitle>
                <div className="relative">
                  <Search className="absolute left-2 top-2 h-3 w-3 text-muted-foreground" />
                  <Input placeholder="Filter..." className="h-7 w-32 pl-7 text-[10px] border-none bg-muted shadow-none" />
                </div>
               </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              {activeRides.map((ride) => (
                <div key={ride.id} className="p-3 border-b hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-muted-foreground">{ride.id}</span>
                      <Badge 
                        variant={ride.status === 'Ongoing' ? 'default' : ride.status === 'Searching' ? 'outline' : 'secondary'}
                        className="text-[8px] py-0 h-4 px-1 leading-none uppercase"
                      >
                        {ride.status}
                      </Badge>
                    </div>
                    <span className="text-[9px] font-medium flex items-center gap-1 text-primary">
                      <Clock className="h-2.5 w-2.5" /> {ride.eta}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3 text-emerald-500" />
                        <span className="text-xs font-medium truncate w-32 inline-block">{ride.from}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Navigation className="h-3 w-3 text-primary" />
                        <span className="text-xs font-medium truncate w-32 inline-block">{ride.to}</span>
                      </div>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="outline" size="icon" className="h-7 w-7"><Phone className="h-3 w-3 text-emerald-600" /></Button>
                       <Button variant="outline" size="icon" className="h-7 w-7"><MessageSquare className="h-3 w-3 text-blue-600" /></Button>
                       <Button variant="outline" size="icon" className="h-7 w-7 text-rose-600"><AlertCircle className="h-3 w-3" /></Button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] p-2 bg-muted/50 rounded">
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3 text-slate-400" />
                      <span className="text-muted-foreground">D: <span className="text-foreground font-semibold uppercase">{ride.driver}</span></span>
                    </div>
                    <span className="text-muted-foreground">R: <span className="text-foreground font-semibold uppercase">{ride.rider}</span></span>
                  </div>
                </div>
              ))}
              {activeRides.length === 0 && (
                <div className="p-12 text-center text-muted-foreground text-xs italic">
                  No active rides monitored
                </div>
              )}
            </CardContent>
            <div className="p-3 border-t bg-muted/30 flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">
                {ongoingCount} Ongoing • {activeRides.length} Total
              </span>
              <Button variant="link" size="sm" className="h-auto p-0 text-[10px] text-primary font-bold">VIEW ALL MONITOR</Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
