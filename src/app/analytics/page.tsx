"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  Map, 
  DollarSign, 
  BarChart3, 
  Route, 
  Info,
  ArrowUpRight,
  Calculator,
  Target,
  FileDown
} from "lucide-react"
import HighChartsWrapper from "@/components/high-charts-wrapper"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Options } from 'highcharts'

const routeAnalyticsOptions: Options = {
  chart: { type: 'column', backgroundColor: 'transparent', height: 260 },
  title: { text: undefined },
  xAxis: {
    categories: ['Patna-A', 'Gaya-B', 'Muz-C', 'Dar-D', 'Balia-E'],
    gridLineWidth: 0,
    lineWidth: 0,
  },
  yAxis: { title: { text: undefined }, gridLineDashStyle: 'Dash' },
  tooltip: { shared: true, borderRadius: 8 },
  credits: { enabled: false },
  plotOptions: {
    column: {
      borderRadius: 4,
      borderWidth: 0,
      groupPadding: 0.1,
    }
  },
  series: [
    { type: 'column', name: 'Avg Price/KM (₹)', data: [12.5, 14.2, 11.8, 15.5, 9.8], color: '#0f172a' },
    { type: 'column', name: 'Suggested Price/KM (₹)', data: [13.2, 15.0, 12.5, 16.2, 11.5], color: '#94a3b8' }
  ]
}

const rideVolumeOptions: Options = {
  chart: { type: 'spline', backgroundColor: 'transparent', height: 260 },
  title: { text: undefined },
  xAxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], gridLineWidth: 0 },
  yAxis: { title: { text: undefined }, gridLineDashStyle: 'Dash' },
  credits: { enabled: false },
  series: [{
    type: 'spline',
    name: 'Ride Volume',
    data: [1200, 1450, 1100, 1900, 2100, 2400],
    color: '#0ea5e9',
    lineWidth: 3,
  }]
}

const areaData = [
  { area: "Patna Central", avgPrice: "₹14.50", demand: "High", suggested: "₹15.20", trend: "+4%" },
  { area: "Boring Road", avgPrice: "₹16.00", demand: "Peak", suggested: "₹18.50", trend: "+12%" },
  { area: "Kankarbagh", avgPrice: "₹11.20", demand: "Medium", suggested: "₹12.00", trend: "+2%" },
  { area: "Bailey Road", avgPrice: "₹13.80", demand: "High", suggested: "₹14.20", trend: "+1%" },
]

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1 p-4 space-y-4 max-w-[1600px] mx-auto w-full">
        {/* Analytics Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white">
                <BarChart3 className="h-6 w-6" />
             </div>
             <div>
                <h1 className="text-xl font-bold tracking-tight">Business Intelligence</h1>
                <p className="text-xs text-muted-foreground">Detailed revenue, pricing, and route-based area analytics.</p>
             </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 text-xs gap-2">
              <FileDown className="h-3.5 w-3.5" /> Export PDF Report
            </Button>
            <Button size="sm" className="h-8 text-xs gap-2 bg-slate-900">
              <Calculator className="h-3.5 w-3.5" /> Simulation Mode
            </Button>
          </div>
        </div>

        {/* Top Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
           {/* Price Intelligence */}
           <Card className="shadow-none border border-border/50">
             <CardHeader className="pb-2 border-b mb-4 flex flex-row items-center justify-between h-14">
               <div>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-emerald-500" /> Route Pricing Intel
                  </CardTitle>
                  <CardDescription className="text-[10px]">Comparing actual vs suggested prices</CardDescription>
               </div>
               <Badge className="text-[9px] font-bold">ALPHA</Badge>
             </CardHeader>
             <CardContent className="px-2">
               <HighChartsWrapper options={routeAnalyticsOptions} />
             </CardContent>
           </Card>

           {/* Growth Trends */}
           <Card className="shadow-none border border-border/50">
             <CardHeader className="pb-2 border-b mb-4 flex flex-row items-center justify-between h-14">
               <div>
                  <CardTitle className="text-sm font-bold flex items-center gap-2">
                    <Target className="h-4 w-4 text-blue-500" /> Growth & Volume Trend
                  </CardTitle>
                  <CardDescription className="text-[10px]">Monthly ride volume scaling</CardDescription>
               </div>
               <div className="flex items-center gap-1">
                  <Badge variant="outline" className="text-[9px]">+24% YoY</Badge>
               </div>
             </CardHeader>
             <CardContent className="px-2">
               <HighChartsWrapper options={rideVolumeOptions} />
             </CardContent>
           </Card>
        </div>

        {/* Pricing Table & Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
           <Card className="lg:col-span-2 shadow-none border border-border/50 overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-sm font-bold">Area Pricing Details</CardTitle>
                <CardDescription className="text-[10px]">Granular per-area pricing analytics for data improvement</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30 border-y py-0 h-9">
                      <TableHead className="text-[10px] font-bold h-9 py-0">Target Area</TableHead>
                      <TableHead className="text-[10px] font-bold h-9 py-0">Avg Price/KM</TableHead>
                      <TableHead className="text-[10px] font-bold h-9 py-0">Demand Status</TableHead>
                      <TableHead className="text-[10px] font-bold h-9 py-0 text-right">Suggested Optimization</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {areaData.map((item) => (
                      <TableRow key={item.area} className="h-12 hover:bg-slate-50 transition-colors">
                        <TableCell className="text-xs font-semibold">{item.area}</TableCell>
                        <TableCell className="text-xs font-medium">{item.avgPrice}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[9px] h-5 px-2 border-none font-bold ${item.demand === 'Peak' ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                            {item.demand}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-col items-end">
                             <span className="text-xs font-bold text-slate-900">{item.suggested}</span>
                             <span className="text-[9px] text-emerald-600 font-bold flex items-center">
                               <ArrowUpRight className="h-2 w-2 mr-0.5" /> {item.trend}
                             </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <div className="p-3 border-t flex items-center justify-between bg-slate-50/50">
                 <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <Info className="h-3 w-3" /> 
                    <span>Suggestions are updated every 24h based on historical trends.</span>
                 </div>
                 <Button variant="link" size="sm" className="h-auto p-0 text-[10px] font-bold">RE-CALCULATE ALL AREAS</Button>
              </div>
           </Card>

           {/* Revenue Model Insights */}
           <Card className="shadow-none border border-border/50 bg-slate-900 text-white">
              <CardHeader className="pb-4 border-b border-white/10">
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-amber-400" /> Revenue Model Optimization
                </CardTitle>
                <CardDescription className="text-[10px] text-slate-400">Strategic suggestions for future phases</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                 <div className="space-y-4">
                    <div className="flex gap-4">
                       <div className="h-6 w-6 rounded bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0">
                          <Info className="h-3.5 w-3.5" />
                       </div>
                       <div className="space-y-1">
                          <p className="text-xs font-bold leading-none">Tiered Commission Fees</p>
                          <p className="text-[10px] text-slate-400 leading-normal">Implementing a 10% / 15% / 20% tier based on driver rating can increase retention by 22%.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="h-6 w-6 rounded bg-emerald-400/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <Route className="h-3.5 w-3.5" />
                       </div>
                       <div className="space-y-1">
                          <p className="text-xs font-bold leading-none">Priority Route Subscription</p>
                          <p className="text-[10px] text-slate-400 leading-normal">Pilot a ₹199/month sub for drivers to get Patna-Gaya leads first. Potential +15% MRR.</p>
                       </div>
                    </div>
                    <div className="flex gap-4">
                       <div className="h-6 w-6 rounded bg-blue-400/20 text-blue-400 flex items-center justify-center shrink-0">
                          <Calculator className="h-3.5 w-3.5" />
                       </div>
                       <div className="space-y-1">
                          <p className="text-xs font-bold leading-none">Automated Surge Engine</p>
                          <p className="text-[10px] text-slate-400 leading-normal">Data suggests Patna Central needs a 1.2x multiplier between 8AM-10AM on Weekdays.</p>
                       </div>
                    </div>
                 </div>
                 <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold h-9 text-xs">
                    Start Revenue Simulation
                 </Button>
              </CardContent>
           </Card>
        </div>
      </main>
    </div>
  )
}
