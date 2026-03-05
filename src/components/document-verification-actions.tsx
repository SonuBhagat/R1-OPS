"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { updateDocumentStatus } from "@/app/actions"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"

interface DocumentVerificationActionsProps {
  docId: string
  currentStatus: string
}

export function DocumentVerificationActions({ docId, currentStatus }: DocumentVerificationActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleUpdate = async (newStatus: string) => {
    setIsLoading(true)
    try {
      const result = await updateDocumentStatus(docId, newStatus)
      if (result.success) {
        router.refresh()
      } else {
        alert("Failed to update document status")
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (currentStatus === "approved") {
    return (
      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-2 py-0 h-6">
        <CheckCircle2 className="h-3 w-3 mr-1" /> Approved
      </Badge>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="ghost" 
        size="sm" 
        className="h-8 px-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 hover:text-rose-600"
        onClick={() => handleUpdate("rejected")}
        disabled={isLoading || currentStatus === "rejected"}
      >
        {isLoading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <XCircle className="h-3 w-3 mr-1" />}
        {currentStatus === "rejected" ? "Rejected" : "Reject"}
      </Button>
      <Button 
        variant="outline"
        size="sm" 
        className="h-8 px-2 text-xs font-semibold text-emerald-600 hover:bg-emerald-50 hover:text-emerald-600 border-emerald-200"
        onClick={() => handleUpdate("approved")}
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <CheckCircle2 className="h-3 w-3 mr-1" />}
        Approve
      </Button>
    </div>
  )
}

