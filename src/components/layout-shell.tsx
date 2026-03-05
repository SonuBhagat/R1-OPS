"use client"

import React from "react"
import { usePathname } from "next/navigation"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  // Hide sidebar on login page
  const isAuthPage = pathname === "/login"

  if (isAuthPage) {
    return (
      <main className="min-h-screen">
        {children}
      </main>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-background">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
