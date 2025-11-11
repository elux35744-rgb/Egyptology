"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, Database, Users } from "lucide-react"

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    responseTime: 0,
    activeUsers: 0,
    dbQueries: 0,
    systemLoad: 0,
  })

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        responseTime: Math.floor(Math.random() * 50) + 20,
        activeUsers: Math.floor(Math.random() * 100) + 2800,
        dbQueries: Math.floor(Math.random() * 20) + 45,
        systemLoad: Math.floor(Math.random() * 30) + 15,
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Card className="bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 text-white">
        <CardContent className="p-3">
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-green-400" />
              <span>{metrics.responseTime}ms</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3 text-blue-400" />
              <span>{metrics.activeUsers}</span>
            </div>
            <div className="flex items-center gap-1">
              <Database className="h-3 w-3 text-purple-400" />
              <span>{metrics.dbQueries}/s</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="h-3 w-3 text-orange-400" />
              <Badge variant="outline" className="text-xs px-1 py-0 h-4">
                {metrics.systemLoad}%
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
