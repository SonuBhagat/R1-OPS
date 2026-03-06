"use client"

import { useState } from "react"
import { loginAdmin } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Lock, User, AlertCircle, Loader2, Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic Background Elements - Very subtle for flat design */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-blue-100/40 rounded-full blur-[120px] mix-blend-multiply" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[70%] bg-indigo-100/40 rounded-full blur-[120px] mix-blend-multiply delay-150" />
      </div>

      <div className="w-full max-w-md relative z-10 group">
        {/* Subtle accent glow behind the card on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 via-blue-400/10 to-indigo-500/20 rounded-[2.2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <Card className="w-full h-full border border-white/60 bg-white/70 backdrop-blur-3xl shadow-none relative overflow-hidden rounded-[2rem] p-1">
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-blue-500 to-indigo-600 opacity-90" />
          
          <div className="bg-white/80 rounded-[1.8rem] h-full w-full">
            <CardHeader className="pt-10 md:pt-12 pb-6 md:pb-8 text-center relative">
              <div className="mx-auto w-48 md:w-56 mb-8 flex items-center justify-center relative">
                {/* Logo backdrop accent */}
                <div className="absolute inset-0 bg-blue-50/50 rounded-full blur-2xl scale-150 -z-10" />
                <Image src="/fulllogo.png" alt="RAAHI Logo" width={400} height={100} className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500" />
              </div>
              <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">Welcome back.</CardTitle>
              <CardDescription className="text-[15px] text-slate-500 font-medium mt-2">Log in to manage your mobility network.</CardDescription>
            </CardHeader>

            <CardContent className="px-8 md:px-12 pb-10 md:pb-12">
              <form action={handleSubmit} className="space-y-6">
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Email or Username</label>
                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-primary transition-colors">
                      <User className="h-4 w-4" />
                    </div>
                    <Input 
                      name="username" 
                      placeholder="admin" 
                      autoComplete="username" 
                      required
                      className="pl-12 h-14 bg-slate-50/80 border border-slate-100 hover:bg-white text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-primary/30 focus:ring-4 focus:ring-primary/10 rounded-2xl transition-all shadow-none"
                    />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest pl-1">Password</label>
                  </div>
                  <div className="relative group/input">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/input:text-primary transition-colors">
                      <Lock className="h-4 w-4" />
                    </div>
                    <Input 
                      name="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      autoComplete="current-password"
                      required
                      className="pl-11 pr-12 h-14 bg-slate-50/80 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/10 rounded-xl transition-all shadow-sm group-hover/input:border-slate-300"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                    <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
                    {error}
                  </div>
                )}

                <Button 
                   disabled={isLoading}
                   className="w-full h-14 mt-4 rounded-2xl bg-slate-900 hover:bg-primary hover:scale-[1.02] active:scale-[0.98] text-white font-bold text-base shadow-none transition-all duration-300"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> Verifying
                    </div>
                  ) : (
                    "Welcome Back"
                  )}
                </Button>
              </form>

              <div className="mt-10 pt-8 border-t border-slate-100/50 text-center relative">
                <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest relative z-10 bg-white/80 inline-block px-4">
                  © 2026 RaahiOne Mobility Private Limited
                </p>
                {/* Decorative horizontal line behind text */}
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 -translate-y-1/2 z-0" />
              </div>
            </CardContent>
          </div>
        </Card>
      </div>
      
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
