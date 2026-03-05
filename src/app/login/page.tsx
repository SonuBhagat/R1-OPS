"use client"

import { useState } from "react"
import { loginAdmin } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LayoutDashboard, Lock, User, AlertCircle, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    const result = await loginAdmin(formData)
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    } else if (result?.success) {
      window.location.href = "/"
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      </div>

      <Card className="w-full max-w-md border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl relative z-10 overflow-hidden rounded-3xl mx-4">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-indigo-600" />
        
        <CardHeader className="pt-8 md:pt-10 pb-4 md:pb-6 text-center">
          <div className="mx-auto w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 mb-4 md:mb-6 group hover:scale-110 transition-transform duration-500">
            <LayoutDashboard className="h-7 w-7 md:h-8 md:h-8 text-white group-hover:rotate-12 transition-transform" />
          </div>
          <CardTitle className="text-2xl md:text-3xl font-bold text-white tracking-tight">RAAHI ADMIN</CardTitle>
          <CardDescription className="text-xs md:text-sm text-slate-400 font-medium">Secure Access Control Panel</CardDescription>
        </CardHeader>

        <CardContent className="px-6 md:px-8 pb-8 md:pb-10">
          <form action={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Username</label>
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                  <User className="h-4 w-4" />
                </div>
                <Input 
                  name="username" 
                  placeholder="admin" 
                  autoComplete="username" 
                  required
                  className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">Password</label>
              <div className="relative group">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-primary transition-colors">
                  <Lock className="h-4 w-4" />
                </div>
                <Input 
                  name="password" 
                  type="password" 
                  placeholder="••••••••" 
                  autoComplete="current-password"
                  required
                  className="pl-11 h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:border-primary/50 focus:ring-primary/20 rounded-xl transition-all"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                {error}
              </div>
            )}

            <Button 
               disabled={isLoading}
               className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" /> Verifying...
                </div>
              ) : (
                "Sign In to Dashboard"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-[11px] text-slate-500 font-medium uppercase tracking-widest">
              © 2026 Raahi Logistics • Phase 1
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Decorative dots grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />
    </div>
  )
}
