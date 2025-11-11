"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Cpu,
  MemoryStick as Memory,
  HardDrive,
  Wifi,
  Battery,
  Thermometer,
  Activity,
  Zap,
  Shield,
  Brain,
  Database,
  Cloud,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Minimize2,
  Maximize2,
} from "lucide-react"

interface SystemMetrics {
  cpu: number
  memory: number
  storage: number
  network: number
  temperature: number
  battery: number
  aiProcessing: number
  quantumOps: number
  security: number
  blockchain: number
  cloudSync: number
  neuralNetworks: number
}

export default function AdvancedSystemMonitor() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [metrics, setMetrics] = useState<SystemMetrics>({
    cpu: 85,
    memory: 72,
    storage: 68,
    network: 98,
    temperature: 42,
    battery: 89,
    aiProcessing: 94,
    quantumOps: 87,
    security: 100,
    blockchain: 91,
    cloudSync: 96,
    neuralNetworks: 15,
  })

  const [alerts, setAlerts] = useState([
    { type: "success", message: "جميع الأنظمة تعمل بكفاءة عالية" },
    { type: "info", message: "تم تحديث 3 نماذج ذكاء اصطناعي" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        cpu: Math.max(70, Math.min(95, prev.cpu + Math.floor(Math.random() * 10 - 5))),
        memory: Math.max(60, Math.min(90, prev.memory + Math.floor(Math.random() * 8 - 4))),
        storage: Math.max(50, Math.min(85, prev.storage + Math.floor(Math.random() * 4 - 2))),
        network: Math.max(85, Math.min(100, prev.network + Math.floor(Math.random() * 6 - 3))),
        temperature: Math.max(35, Math.min(55, prev.temperature + Math.floor(Math.random() * 4 - 2))),
        battery: Math.max(70, Math.min(100, prev.battery + Math.floor(Math.random() * 6 - 3))),
        aiProcessing: Math.max(80, Math.min(100, prev.aiProcessing + Math.floor(Math.random() * 6 - 3))),
        quantumOps: Math.max(75, Math.min(95, prev.quantumOps + Math.floor(Math.random() * 8 - 4))),
        security: Math.max(95, Math.min(100, prev.security + Math.floor(Math.random() * 2 - 1))),
        blockchain: Math.max(85, Math.min(98, prev.blockchain + Math.floor(Math.random() * 6 - 3))),
        cloudSync: Math.max(90, Math.min(100, prev.cloudSync + Math.floor(Math.random() * 4 - 2))),
        neuralNetworks: Math.max(12, Math.min(20, prev.neuralNetworks + Math.floor(Math.random() * 2 - 1))),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number, threshold = 80) => {
    if (value >= threshold) return "text-green-400"
    if (value >= threshold - 20) return "text-yellow-400"
    return "text-red-400"
  }

  const getStatusIcon = (value: number, threshold = 80) => {
    if (value >= threshold) return <CheckCircle className="h-4 w-4 text-green-400" />
    if (value >= threshold - 20) return <AlertTriangle className="h-4 w-4 text-yellow-400" />
    return <XCircle className="h-4 w-4 text-red-400" />
  }

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-slate-800/90 backdrop-blur-xl border border-cyan-500/30 text-cyan-300 hover:text-cyan-100 hover:bg-slate-700/90"
          size="sm"
        >
          <Activity className="h-4 w-4 mr-2" />
          مراقب النظام
          <Maximize2 className="h-4 w-4 ml-2" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="bg-slate-800/95 backdrop-blur-xl border border-cyan-500/30 text-white">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyan-400" />
              <h3 className="font-bold text-cyan-300">مراقب النظام المتقدم</h3>
            </div>
            <Button
              onClick={() => setIsMinimized(true)}
              variant="ghost"
              size="sm"
              className="text-cyan-400 hover:text-cyan-300"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {/* Core System Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-blue-400" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-blue-300">معالج</span>
                    <span className={`text-xs font-bold ${getStatusColor(metrics.cpu)}`}>{metrics.cpu}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${metrics.cpu}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Memory className="h-4 w-4 text-purple-400" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-purple-300">ذاكرة</span>
                    <span className={`text-xs font-bold ${getStatusColor(metrics.memory)}`}>{metrics.memory}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${metrics.memory}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-green-400" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-green-300">ذكاء اصطناعي</span>
                    <span className={`text-xs font-bold ${getStatusColor(metrics.aiProcessing)}`}>
                      {metrics.aiProcessing}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${metrics.aiProcessing}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-400" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-yellow-300">كمي</span>
                    <span className={`text-xs font-bold ${getStatusColor(metrics.quantumOps)}`}>
                      {metrics.quantumOps}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-1 rounded-full transition-all duration-300"
                      style={{ width: `${metrics.quantumOps}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Metrics */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-700">
              <div className="text-center">
                <Shield className="h-4 w-4 text-green-400 mx-auto mb-1" />
                <div className="text-xs text-green-300">أمان</div>
                <div className="text-xs font-bold text-green-400">{metrics.security}%</div>
              </div>
              <div className="text-center">
                <Database className="h-4 w-4 text-indigo-400 mx-auto mb-1" />
                <div className="text-xs text-indigo-300">بلوك تشين</div>
                <div className="text-xs font-bold text-indigo-400">{metrics.blockchain}%</div>
              </div>
              <div className="text-center">
                <Cloud className="h-4 w-4 text-cyan-400 mx-auto mb-1" />
                <div className="text-xs text-cyan-300">سحابي</div>
                <div className="text-xs font-bold text-cyan-400">{metrics.cloudSync}%</div>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-700">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-300">جميع الأنظمة نشطة</span>
              </div>
              <Badge className="bg-green-500/20 text-green-300 text-xs">{metrics.neuralNetworks} شبكة عصبية</Badge>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-1 pt-2 border-t border-slate-700">
              <div className="text-center">
                <Wifi className="h-3 w-3 text-blue-400 mx-auto" />
                <div className="text-xs text-blue-300">{metrics.network}%</div>
              </div>
              <div className="text-center">
                <Thermometer className="h-3 w-3 text-orange-400 mx-auto" />
                <div className="text-xs text-orange-300">{metrics.temperature}°C</div>
              </div>
              <div className="text-center">
                <Battery className="h-3 w-3 text-green-400 mx-auto" />
                <div className="text-xs text-green-300">{metrics.battery}%</div>
              </div>
              <div className="text-center">
                <HardDrive className="h-3 w-3 text-purple-400 mx-auto" />
                <div className="text-xs text-purple-300">{metrics.storage}%</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
