"use client"

import { useState, useEffect } from "react"
import { Shield, Database, Activity, Settings, BarChart3, Users } from 'lucide-react'

export default function AdminLoading() {
  const [progress, setProgress] = useState(0)
  const [currentSystem, setCurrentSystem] = useState(0)

  const systems = [
    { name: "نظام الأمان", icon: Shield, color: "from-red-500 to-pink-600" },
    { name: "قاعدة البيانات", icon: Database, color: "from-blue-500 to-indigo-600" },
    { name: "مراقبة النشاط", icon: Activity, color: "from-green-500 to-emerald-600" },
    { name: "التحليلات", icon: BarChart3, color: "from-purple-500 to-violet-600" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + Math.random() * 5
      })
      setCurrentSystem((prev) => (prev + 1) % systems.length)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const currentSystemData = systems[currentSystem]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
      {/* Circuit Pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="text-center space-y-8 relative z-10 max-w-md mx-auto px-6">
        {/* Icon */}
        <div className="relative">
          <div className={`w-24 h-24 mx-auto bg-gradient-to-br ${currentSystemData.color} rounded-full flex items-center justify-center shadow-2xl animate-pulse`}>
            <currentSystemData.icon className="h-12 w-12 text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-2 border-white flex items-center justify-center animate-ping">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">لوحة الإدارة</h2>
          <p className="text-blue-200">جاري تحميل أنظمة الإدارة...</p>
        </div>

        {/* Current System */}
        <div className="bg-white/10 backdrop-blur rounded-xl p-6 shadow-xl border border-white/20">
          <div className="text-lg font-bold text-white mb-2">{currentSystemData.name}</div>
          <div className="text-sm text-blue-200">جاري التحقق من الحالة...</div>
        </div>

        {/* System Indicators */}
        <div className="flex justify-center gap-3">
          {systems.map((system, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentSystem
                  ? `bg-gradient-to-r ${system.color}`
                  : "bg-gray-600"
              } ${index === currentSystem ? "scale-125" : ""}`}
            />
          ))}
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
          <div
            className={`h-2 bg-gradient-to-r ${currentSystemData.color} rounded-full transition-all duration-300`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <div className="text-sm text-blue-200">{Math.round(Math.min(progress, 100))}% مكتمل</div>
      </div>
    </div>
  )
}
