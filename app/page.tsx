"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  BookOpen,
  Video,
  MapPin,
  Scroll,
  User,
  MessageCircle,
  Crown,
  Camera,
  ArrowRight,
  Brain,
  Library,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setIsLoading(true)
      console.log("[v0] Searching for:", searchQuery)
      setTimeout(() => setIsLoading(false), 1000)
    }
  }

  const features = [
    {
      title: "قاموس الهيروغليفية",
      description: "اكتشف معاني الرموز المصرية القديمة",
      icon: <BookOpen className="h-8 w-8" />,
      href: "/dictionary",
      color: "from-cyan-500 to-blue-600",
      stats: "2,847 رمز",
    },
    {
      title: "الفيديوهات التعليمية",
      description: "شاهد محتوى تفاعلي عن الحضارة المصرية",
      icon: <Video className="h-8 w-8" />,
      href: "/videos",
      color: "from-purple-500 to-pink-600",
      stats: "856 فيديو",
    },
    {
      title: "الكتب الفرعونية",
      description: "مكتبة شاملة من الكتب عن الحضارة المصرية",
      icon: <Library className="h-8 w-8" />,
      href: "/books",
      color: "from-amber-500 to-yellow-600",
      stats: "342 كتاب",
    },
    {
      title: "الأماكن الأثرية",
      description: "استكشف المعابد والمقابر الفرعونية",
      icon: <MapPin className="h-8 w-8" />,
      href: "/places",
      color: "from-green-500 to-emerald-600",
      stats: "234 مكان",
    },
    {
      title: "القصص التاريخية",
      description: "اقرأ قصص الملوك والآلهة",
      icon: <Scroll className="h-8 w-8" />,
      href: "/stories",
      color: "from-orange-500 to-red-600",
      stats: "156 قصة",
    },
    {
      title: "صورتك الفرعونية",
      description: "حول صورتك لملك فرعوني بالذكاء الاصطناعي",
      icon: <User className="h-8 w-8" />,
      href: "/ai-portrait",
      color: "from-pink-500 to-rose-600",
      stats: "AI مدعوم",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-slate-800/90 backdrop-blur-xl text-white shadow-2xl border-b border-cyan-500/30">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  علم المصريات
                </h1>
                <p className="text-cyan-300 text-lg mt-2">اكتشف أسرار الحضارة المصرية القديمة</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Link href="/login">
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-8 py-3 text-lg">
                تسجيل الدخول
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-12">
        {/* Search Section */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border border-cyan-500/30 shadow-2xl">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
                ابحث في كنوز مصر
              </h2>
              <p className="text-cyan-300 text-lg">اكتشف المعلومات بسهولة</p>
            </div>
            <div className="relative max-w-2xl mx-auto">
              <Brain className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-cyan-400" />
              <Input
                placeholder="ابحث عن أي معلومة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="px-12 py-6 text-lg bg-slate-900/50 border border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/70"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="mt-4 w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white px-6 py-4 text-lg"
            >
              {isLoading ? "جاري البحث..." : "ابحث"}
            </Button>
          </CardContent>
        </Card>

        {/* Main Features Grid */}
        <div>
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
            استكشف الميزات
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Link key={index} href={feature.href}>
                <Card className="group hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 cursor-pointer bg-slate-800/50 backdrop-blur-xl border border-cyan-500/30 hover:border-purple-500/50 hover:-translate-y-2 h-full">
                  <CardContent className="p-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-cyan-100 mb-2 group-hover:text-purple-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-cyan-300/80 text-sm mb-3">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {feature.stats}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-cyan-400 group-hover:translate-x-1 group-hover:text-purple-400 transition-all duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-xl border border-cyan-500/30">
          <CardContent className="p-6">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-8">
              إجراءات سريعة
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dictionary">
                <Button className="w-full h-20 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex flex-col items-center gap-2 shadow-lg hover:shadow-blue-500/50 transition-all">
                  <BookOpen className="h-7 w-7" />
                  <span className="text-sm font-semibold">قاموس سريع</span>
                </Button>
              </Link>
              <Link href="/ai-portrait">
                <Button className="w-full h-20 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white flex flex-col items-center gap-2 shadow-lg hover:shadow-purple-500/50 transition-all">
                  <Camera className="h-7 w-7" />
                  <span className="text-sm font-semibold">صورة فرعونية</span>
                </Button>
              </Link>
              <Link href="/assistant">
                <Button className="w-full h-20 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white flex flex-col items-center gap-2 shadow-lg hover:shadow-green-500/50 transition-all">
                  <MessageCircle className="h-7 w-7" />
                  <span className="text-sm font-semibold">اسأل الخبير</span>
                </Button>
              </Link>
              <Link href="/video-creator">
                <Button className="w-full h-20 bg-gradient-to-br from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white flex flex-col items-center gap-2 shadow-lg hover:shadow-pink-500/50 transition-all">
                  <Video className="h-7 w-7" />
                  <span className="text-sm font-semibold">إنشاء فيديو</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
