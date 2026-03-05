"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { verifyDriver, rejectDriver } from "@/app/actions"
import { useRouter } from "next/navigation"

interface VerificationActionsProps {
  userId: string
}

export function VerificationActions({ userId }: VerificationActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleVerify = async () => {
    setIsLoading(true)
    try {
      const result = await verifyDriver(userId)
      if (result.success) {
        router.refresh()
      } else {
        alert("Failed to verify driver")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReject = async () => {
    setIsLoading(true)
    try {
      const result = await rejectDriver(userId)
      if (result.success) {
        router.refresh()
      } else {
        alert("Failed to reject driver")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-end gap-2 mt-6">
      <Button 
        variant="outline" 
        size="sm" 
        className="h-9 px-4 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-600 border-rose-200"
        onClick={handleReject}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" /> : <XCircle className="mr-2 h-3.5 w-3.5" />}
        Reject Application
      </Button>
      <Button 
        size="sm" 
        className="h-9 px-4 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white border-none"
        onClick={handleVerify}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin mr-2" /> : <CheckCircle2 className="mr-2 h-3.5 w-3.5" />}
        Approve Driver
      </Button>
    </div>
  )
}
