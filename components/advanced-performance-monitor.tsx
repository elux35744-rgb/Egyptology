"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cpu, Zap, Shield, Brain, Activity, TrendingUp } from "lucide-react"

export default function AdvancedPerformanceMonitor() {
  const [systemStats, setSystemStats] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    aiProcessing: 78,
    quantumSpeed: 94,
    securityLevel: 100,
    networkLatency: 12,
  })

  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(30, Math.min(85, prev.memoryUsage + (Math.random() - 0.5) * 8)),
        aiProcessing: Math.max(60, Math.min(95, prev.aiProcessing + (Math.random() - 0.5) * 5)),
        quantumSpeed: Math.max(85, Math.min(99, prev.quantumSpeed + (Math.random() - 0.5) * 3)),
        securityLevel: 100,
        networkLatency: Math.max(5, Math.min(25, prev.networkLatency + (Math.random() - 0.5) * 4)),
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="bg-slate-900/95 backdrop-blur-xl border border-cyan-500/30 shadow-2xl">
        <CardContent className="p-4 w-80">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-cyan-300">مراقب الأداء المتقدم</h3>
            <button onClick={() => setIsVisible(false)} className="text-cyan-400 hover:text-cyan-300 text-xs">
              ×
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-blue-400" />
                <span className="text-xs text-cyan-300">معالج</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-slate-700 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${systemStats.cpuUsage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-blue-400 w-8">{systemStats.cpuUsage}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="text-xs text-cyan-300">ذاكرة</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-slate-700 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${systemStats.memoryUsage}%` }}
                  ></div>
                </div>
                <span className="text-xs text-green-400 w-8">{systemStats.memoryUsage}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-purple-400" />
                <span className="text-xs text-cyan-300">ذكاء</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-slate-700 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${systemStats.aiProcessing}%` }}
                  ></div>
                </div>
                <span className="text-xs text-purple-400 w-8">{systemStats.aiProcessing}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <span className="text-xs text-cyan-300">كمي</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-16 bg-slate-700 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${systemStats.quantumSpeed}%` }}
                  ></div>
                </div>
                <span className="text-xs text-yellow-400 w-8">{systemStats.quantumSpeed}%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-xs text-cyan-300">أمان</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-emerald-500/20 text-emerald-400 text-xs px-2 py-0.5">عسكري</Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                <span className="text-xs text-cyan-300">شبكة</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-cyan-400">{systemStats.networkLatency}ms</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
