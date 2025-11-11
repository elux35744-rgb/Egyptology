"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Brain,
  Cpu,
  Shield,
  Eye,
  Users,
  Activity,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Settings,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"

export default function UltraAdvancedSystem() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [systemMetrics, setSystemMetrics] = useState({
    quantumProcessors: 8,
    neuralNetworks: 25,
    aiPersonalities: 12,
    holographicSessions: 67,
    emotionalAnalyses: 234,
    collaborativeUsers: 156,
    securityLevel: 100,
    quantumEncryption: 99.9,
    predictiveAccuracy: 97.8,
    systemUptime: 99.99,
  })

  const [realTimeAlerts, setRealTimeAlerts] = useState([
    { type: "success", message: "نظام الذكاء العاطفي يعمل بكفاءة عالية", time: "منذ دقيقة" },
    { type: "info", message: "تم تحديث 3 نماذج ذكاء اصطناعي", time: "منذ 5 دقائق" },
    { type: "warning", message: "استخدام الذاكرة الكمية 85%", time: "منذ 10 دقائق" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics((prev) => ({
        ...prev,
        holographicSessions: prev.holographicSessions + Math.floor(Math.random() * 5 - 2),
        emotionalAnalyses: prev.emotionalAnalyses + Math.floor(Math.random() * 10 - 5),
        collaborativeUsers: prev.collaborativeUsers + Math.floor(Math.random() * 8 - 4),
        predictiveAccuracy: Math.max(95, Math.min(99, prev.predictiveAccuracy + Math.random() * 2 - 1)),
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-gradient-to-br from-slate-900/95 via-purple-900/95 to-indigo-900/95 backdrop-blur-xl border border-purple-500/30 shadow-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Sparkles className="h-6 w-6 animate-pulse" />
            نظام الذكاء الفائق v3.0
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-300 hover:text-purple-100"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Cpu className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-cyan-400">{systemMetrics.quantumProcessors}</div>
            <div className="text-xs text-cyan-300">معالج كمي</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-purple-400">{systemMetrics.neuralNetworks}</div>
            <div className="text-xs text-purple-300">شبكة عصبية</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-green-400">{systemMetrics.securityLevel}%</div>
            <div className="text-xs text-green-300">أمان كمي</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-violet-400">{systemMetrics.holographicSessions}</div>
            <div className="text-xs text-violet-300">جلسة هولوجرام</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <div className="text-2xl">💝</div>
            </div>
            <div className="text-2xl font-bold text-rose-400">{systemMetrics.emotionalAnalyses}</div>
            <div className="text-xs text-rose-300">تحليل عاطفي</div>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Users className="h-6 w-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-indigo-400">{systemMetrics.collaborativeUsers}</div>
            <div className="text-xs text-indigo-300">تعاون فوري</div>
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-slate-800/50 backdrop-blur border border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-cyan-300 text-lg flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    مقاييس الأداء
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-cyan-300">دقة التنبؤ</span>
                        <span className="text-cyan-400">{systemMetrics.predictiveAccuracy.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
                          style={{ width: `${systemMetrics.predictiveAccuracy}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-green-300">وقت التشغيل</span>
                        <span className="text-green-400">{systemMetrics.systemUptime}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-purple-300">التشفير الكمي</span>
                        <span className="text-purple-400">{systemMetrics.quantumEncryption}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-full"></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 backdrop-blur border border-purple-500/30">
                <CardHeader>
                  <CardTitle className="text-purple-300 text-lg flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    تنبيهات النظام
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {realTimeAlerts.map((alert, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-slate-700/50">
                        {alert.type === "success" && <CheckCircle className="h-4 w-4 text-green-400 mt-0.5" />}
                        {alert.type === "info" && <Activity className="h-4 w-4 text-blue-400 mt-0.5" />}
                        {alert.type === "warning" && <AlertTriangle className="h-4 w-4 text-yellow-400 mt-0.5" />}
                        <div className="flex-1">
                          <div className="text-sm text-slate-200">{alert.message}</div>
                          <div className="text-xs text-slate-400">{alert.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                <Settings className="h-4 w-4 mr-2" />
                إعدادات متقدمة
              </Button>
              <Button
                variant="outline"
                className="border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 bg-transparent"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                تقرير مفصل
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
