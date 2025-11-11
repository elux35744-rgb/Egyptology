"use client"

import { useState, useEffect } from "react"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, Sparkles, Brain, Eye, Video, Globe, Users, Star, Zap, Trophy, Target, Cpu, Database, Shield, Wifi, Activity, BarChart3, TrendingUp, CheckCircle, Clock, Layers, Palette, Camera, Music, Headphones, Gamepad2, MapPin, BookOpen, MessageCircle, Film, ImageIcon, ShoppingBag, Coins, Wand2 } from 'lucide-react'
import Image from "next/image"

export default function LoadingPage() {
  const [progress, setProgress] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [loadingMessage, setLoadingMessage] = useState("")
  const [completedSystems, setCompletedSystems] = useState<string[]>([])

  const loadingPhases = [
    {
      name: "تهيئة النظام الأساسي",
      message: "جاري تحضير البيئة التفاعلية المتطورة...",
      icon: Cpu,
      color: "from-blue-500 to-indigo-600",
      duration: 1500,
      systems: ["نظام التشغيل", "قاعدة البيانات", "الأمان المتقدم"]
    },
    {
      name: "تحميل الذكاء الاصطناعي",
      message: "تفعيل GPT-4 Turbo والذكاء الاصطناعي الكمي...",
      icon: Brain,
      color: "from-green-500 to-emerald-600",
      duration: 2000,
      systems: ["GPT-4 Turbo", "معالجة اللغة الطبيعية", "التعلم الآلي المتقدم"]
    },
    {
      name: "إعداد الواقع المعزز والافتراضي",
      message: "تحضير تقنيات AR/VR بدقة 8K Ultra HD...",
      icon: Eye,
      color: "from-purple-500 to-pink-600",
      duration: 1800,
      systems: ["محرك الواقع المعزز", "الواقع الافتراضي 8K", "التتبع ثلاثي الأبعاد"]
    },
    {
      name: "تحميل المحتوى التعليمي",
      message: "استيراد 18,000+ درس ومحتوى تفاعلي...",
      icon: BookOpen,
      color: "from-orange-500 to-red-600",
      duration: 2200,
      systems: ["المكتبة التعليمية", "الفيديوهات 8K", "المحتوى التفاعلي"]
    },
    {
      name: "تفعيل المجتمع العالمي",
      message: "ربط 347,000+ مستخدم حول العالم...",
      icon: Users,
      color: "from-teal-500 to-cyan-600",
      duration: 1600,
      systems: ["الشبكة العالمية", "الترجمة الفورية", "المنتديات المتخصصة"]
    },
    {
      name: "تحسين الأداء والجودة",
      message: "ضبط الأداء للحصول على أفضل تجربة...",
      icon: Zap,
      color: "from-yellow-500 to-amber-600",
      duration: 1400,
      systems: ["تحسين الأداء", "ضغط البيانات", "التخزين المؤقت الذكي"]
    }
  ]

  const features = [
    { icon: Brain, name: "ذكاء اصطناعي متقدم", description: "GPT-4 Turbo مع معالجة طبيعية" },
    { icon: Eye, name: "واقع معزز 8K", description: "تجربة غامرة بدقة عالية" },
    { icon: Video, name: "فيديوهات تفاعلية", description: "127K+ فيديو بجودة سينمائية" },
    { icon: Globe, name: "مجتمع عالمي", description: "347K+ مستخدم من 156 دولة" },
    { icon: BookOpen, name: "محتوى شامل", description: "18K+ درس ومقال متخصص" },
    { icon: Trophy, name: "نظام إنجازات", description: "67 إنجاز وجائزة متنوعة" },
    { icon: Gamepad2, name: "ألعاب تعليمية", description: "75+ لعبة تفاعلية ممتعة" },
    { icon: Wand2, name: "مولد الصور AI", description: "DALL-E 3 لإنشاء الفن الفرعوني" },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 0.5
        
        // تحديد المرحلة الحالية
        const phaseProgress = (newProgress / 100) * loadingPhases.length
        const newPhase = Math.floor(phaseProgress)
        
        if (newPhase !== currentPhase && newPhase < loadingPhases.length) {
          setCurrentPhase(newPhase)
          setLoadingMessage(loadingPhases[newPhase].message)
          
          // إضافة الأنظمة المكتملة
          if (newPhase > 0) {
            setCompletedSystems(prev => [
              ...prev,
              ...loadingPhases[newPhase - 1].systems
            ])
          }
        }
        
        if (newProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        
        return newProgress
      })
    }, 50)

    return () => clearInterval(timer)
  }, [currentPhase])

  const currentPhaseData = loadingPhases[currentPhase] || loadingPhases[0]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        {["𓂀", "𓇳", "𓊪", "𓏏", "𓊖", "𓋹", "𓋴", "𓈖", "👑", "✨", "🏛️", "📜", "⚱️", "🔱"].map((symbol, index) => (
          <div
            key={index}
            className="absolute text-6xl animate-pulse text-amber-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${index * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      <div className="max-w-4xl w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-yellow-300 animate-pulse">
                <Crown className="h-16 w-16 text-amber-900" />
              </div>
              <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-white flex items-center justify-center animate-bounce">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full border-3 border-white flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-200 to-white bg-clip-text text-transparent">
            𓊪𓏏𓊖 علم المصريات التفاعلي المتطور 𓊪𓏏𓊖
          </h1>
          <p className="text-2xl text-blue-200 mb-8">
            جاري تحضير رحلتك الذكية لاستكشاف أسرار الحضارة المصرية العظيمة
          </p>
          
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-lg">
              <Brain className="h-5 w-5 mr-2" />
              AI GPT-4 Turbo
            </Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 text-lg">
              <Eye className="h-5 w-5 mr-2" />
              AR/VR 8K
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-lg">
              <Video className="h-5 w-5 mr-2" />
              Ultra HD
            </Badge>
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-lg">
              <Globe className="h-5 w-5 mr-2" />
              عالمي
            </Badge>
          </div>
        </div>

        {/* Main Loading Card */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl mb-8">
          <CardContent className="p-10">
            {/* Current Phase */}
            <div className="flex items-center gap-6 mb-8">
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentPhaseData.color} flex items-center justify-center shadow-xl animate-pulse`}>
                <currentPhaseData.icon className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">{currentPhaseData.name}</h2>
                <p className="text-xl text-blue-200">{loadingMessage}</p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-white">{Math.round(progress)}%</div>
                <div className="text-lg text-blue-200">مكتمل</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <Progress 
                value={progress} 
                className="w-full h-6 bg-white/20" 
              />
              <div className="flex justify-between mt-3 text-sm text-blue-200">
                <span>البداية</span>
                <span>المرحلة {currentPhase + 1} من {loadingPhases.length}</span>
                <span>الاكتمال</span>
              </div>
            </div>

            {/* Phase Indicators */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
              {loadingPhases.map((phase, index) => (
                <div
                  key={index}
                  className={`text-center p-4 rounded-xl transition-all duration-500 ${
                    index <= currentPhase
                      ? `bg-gradient-to-br ${phase.color} text-white shadow-lg`
                      : "bg-white/10 text-blue-200"
                  }`}
                >
                  <phase.icon className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm font-medium">{phase.name}</div>
                  {index <= currentPhase && (
                    <CheckCircle className="h-5 w-5 mx-auto mt-2 text-green-300" />
                  )}
                </div>
              ))}
            </div>

            {/* Completed Systems */}
            {completedSystems.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">الأنظمة المكتملة:</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {completedSystems.map((system, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-2 rounded-lg text-sm"
                    >
                      <CheckCircle className="h-4 w-4" />
                      {system}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Features Preview */}
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              ✨ الميزات المتطورة التي تنتظرك
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{feature.name}</h4>
                  <p className="text-sm text-blue-200">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loading Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-white">347K+</div>
            <div className="text-blue-200">مستخدم نشط</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">18K+</div>
            <div className="text-blue-200">محتوى تعليمي</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">127K+</div>
            <div className="text-blue-200">فيديو 8K</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white">4.9/5</div>
            <div className="text-blue-200">تقييم المستخدمين</div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-blue-200 text-lg">
            مدعوم بالذكاء الاصطناعي المتقدم والتقنيات العالمية الحديثة
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Activity className="h-5 w-5 text-green-400 animate-pulse" />
            <span className="text-green-400">متصل</span>
            <Wifi className="h-5 w-5 text-blue-400" />
            <span className="text-blue-400">سرعة عالية</span>
            <Shield className="h-5 w-5 text-purple-400" />
            <span className="text-purple-400">آمن ومحمي</span>
          </div>
        </div>
      </div>
    </div>
  )
}
