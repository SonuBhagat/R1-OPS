"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Loader2, User, MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { globalSearch } from "@/app/actions"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function GlobalSearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true)
        const res = await globalSearch(query)
        setResults(res)
        setIsLoading(false)
        setIsOpen(true)
      } else {
        setResults([])
        setIsOpen(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (resultsRef.current && !resultsRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative flex-1 max-w-sm">
      <div className="relative flex items-center">
        {isLoading ? (
          <Loader2 className="absolute left-2.5 h-4 w-4 text-primary animate-spin" />
        ) : (
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
        )}
        <Input 
          placeholder="Search users or rides..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="pl-9 h-9 border-none bg-muted/50 focus-visible:ring-1 focus-visible:ring-primary shadow-none transition-all focus:bg-white focus:shadow-sm"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div 
          ref={resultsRef}
          className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="p-2">
            {results.map((result) => (
              <button
                key={`${result.type}-${result.id}`}
                onClick={() => {
                  router.push(result.url)
                  setIsOpen(false)
                  setQuery("")
                }}
                className="w-full flex items-center gap-3 p-2.5 hover:bg-slate-50 rounded-lg transition-colors group text-left"
              >
                <div className={`p-2 rounded-lg ${result.type === 'User' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'} group-hover:scale-110 transition-transform`}>
                  {result.type === 'User' ? <User className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-bold text-slate-900 truncate">{result.title}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{result.type}</span>
                </div>
              </button>
            ))}
          </div>
          <div className="bg-slate-50 p-2 text-center border-t border-slate-100">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Press Esc to close</span>
          </div>
        </div>
      )}
    </div>
  )
}
