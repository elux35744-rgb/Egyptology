"use client"

import { useState } from "react"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const recentSearches = ["الأهرامات", "توت عنخ آمون", "الهيروغليفية", "معبد الكرنك"]

  const trendingSearches = ["حضارة مصر القديمة", "الآلهة المصرية", "المومياوات", "وادي الملوك"]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-gradient-to-br from-slate-900 to-purple-900 rounded-2xl p-6 w-full max-w-2xl mx-4 border border-cyan-500/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">البحث في التطبيق</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن أي شيء..."
            className="pl-10 bg-slate-800/50 border-cyan-500/30 text-white placeholder-gray-400"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">عمليات البحث الأخيرة</span>
            </div>
            <div className="space-y-2">
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  className="block w-full text-right p-2 rounded-lg bg-slate-800/30 hover:bg-slate-700/50 text-white transition-colors"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-4 w-4 text-cyan-400" />
              <span className="text-sm text-gray-400">الأكثر بحثاً</span>
            </div>
            <div className="space-y-2">
              {trendingSearches.map((search, index) => (
                <button
                  key={index}
                  className="block w-full text-right p-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-purple-500/10 hover:from-cyan-500/20 hover:to-purple-500/20 text-white transition-colors border border-cyan-500/20"
                  onClick={() => setSearchQuery(search)}
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
