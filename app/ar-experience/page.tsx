"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Camera, Smartphone, ArrowLeft, Play, Pause, RotateCcw } from "lucide-react"
import Link from "next/link"

export default function ARExperiencePage() {
  const [isARActive, setIsARActive] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState("giza")
  const [arStats, setArStats] = useState({
    objectsDetected: 0,
    trackingAccuracy: 0,
    renderingFPS: 0,
  })

  const locations = [
    {
      id: "giza",
      name: "أهرامات الجيزة",
      description: "استكشف الأهرامات الثلاثة وأبو الهول",
      image: "/placeholder.svg?height=200&width=300",
      objects: 15,
    },
    {
      id: "karnak",
      name: "معبد الكرنك",
      description: "جولة داخل أكبر معابد مصر القديمة",
      image: "/placeholder.svg?height=200&width=300",
      objects: 23,
    },
    {
      id: "valley-kings",
      name: "وادي الملوك",
      description: "اكتشف مقابر الفراعنة العظام",
      image: "/placeholder.svg?height=200&width=300",
      objects: 18,
    },
    {
      id: "abu-simbel",
      name: "أبو سمبل",
      description: "معبد رمسيس الثاني الرائع",
      image: "/placeholder.svg?height=200&width=300",
      objects: 12,
    },
  ]

  useEffect(() => {
    if (isARActive) {
      const interval = setInterval(() => {
        setArStats((prev) => ({
          objectsDetected: Math.min(
            locations.find((l) => l.id === selectedLocation)?.objects || 0,
            prev.objectsDetected + Math.floor(Math.random() * 3),
          ),
          trackingAccuracy: Math.min(99.8, prev.trackingAccuracy + Math.random() * 5),
          renderingFPS: Math.min(60, prev.renderingFPS + Math.random() * 10),
        }))
      }, 500)

      return () => clearInterval(interval)
    } else {
      setArStats({ objectsDetected: 0, trackingAccuracy: 0, renderingFPS: 0 })
    }
  }, [isARActive, selectedLocation])

  const startARExperience = () => {
    setIsARActive(true)
  }

  const stopARExperience = () => {
    setIsARActive(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <Button variant="ghost" className="text-pink-300 hover:text-pink-100">
              <ArrowLeft className="h-5 w-5 mr-2" />
              العودة للرئيسية
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                تجربة الواقع المعزز
              </h1>
              <p className="text-pink-300">استكشف المعابد والمقابر بتقنية AR المتطورة</p>
            </div>
          </div>
        </div>

        {/* AR Stats */}
        {isARActive && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-slate-800/50 backdrop-blur-xl border border-pink-500/30">
              <CardContent className="p-4 text-center">
                <Camera className="h-8 w-8 mx-auto mb-2 text-pink-400" />
                <div className="text-2xl font-bold text-pink-400">{arStats.objectsDetected}</div>
                <div className="text-sm text-pink-300">كائن مكتشف</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/30">
              <CardContent className="p-4 text-center">
                <Eye className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                <div className="text-2xl font-bold text-purple-400">{arStats.trackingAccuracy.toFixed(1)}%</div>
                <div className="text-sm text-purple-300">دقة التتبع</div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 backdrop-blur-xl border border-rose-500/30">
              <CardContent className="p-4 text-center">
                <Smartphone className="h-8 w-8 mx-auto mb-2 text-rose-400" />
                <div className="text-2xl font-bold text-rose-400">{arStats.renderingFPS.toFixed(0)}</div>
                <div className="text-sm text-rose-300">إطار/ثانية</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* AR Viewer */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border border-pink-500/30 mb-8">
          <CardHeader>
            <CardTitle className="text-pink-300 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Eye className="h-6 w-6" />
                عارض الواقع المعزز
              </span>
              <Badge className="bg-pink-500/20 text-pink-300 border border-pink-500/30">
                {isARActive ? "نشط" : "متوقف"}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div
                className={`aspect-video rounded-lg border-2 ${
                  isARActive
                    ? "border-pink-500 bg-gradient-to-br from-pink-900/50 to-purple-900/50"
                    : "border-slate-600 bg-slate-900/50"
                } flex items-center justify-center`}
              >
                {isARActive ? (
                  <div className="text-center space-y-4">
                    <div className="relative">
                      <img
                        src={locations.find((l) => l.id === selectedLocation)?.image || "/placeholder.svg"}
                        alt="AR View"
                        className="rounded-lg opacity-80"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 border-4 border-pink-400 rounded-full animate-pulse flex items-center justify-center">
                          <div className="w-16 h-16 bg-pink-400 rounded-full animate-ping"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-pink-300">جاري تحليل البيئة المحيطة...</p>
                  </div>
                ) : (
                  <div className="text-center space-y-4">
                    <Camera className="h-16 w-16 mx-auto text-slate-500" />
                    <p className="text-slate-400">اضغط "بدء التجربة" لتشغيل الواقع المعزز</p>
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4 mt-6">
                {!isARActive ? (
                  <Button
                    onClick={startARExperience}
                    className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-3"
                  >
                    <Play className="h-5 w-5 mr-2" />
                    بدء التجربة
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={stopARExperience}
                      className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white"
                    >
                      <Pause className="h-5 w-5 mr-2" />
                      إيقاف
                    </Button>
                    <Button
                      onClick={() => setArStats({ objectsDetected: 0, trackingAccuracy: 0, renderingFPS: 0 })}
                      variant="outline"
                      className="border-pink-500/30 text-pink-300 hover:bg-pink-500/20"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      إعادة تعيين
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Selection */}
        <Card className="bg-slate-800/50 backdrop-blur-xl border border-pink-500/30">
          <CardHeader>
            <CardTitle className="text-pink-300">اختر الموقع للاستكشاف</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {locations.map((location) => (
                <div
                  key={location.id}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                    selectedLocation === location.id
                      ? "border-pink-500 bg-pink-500/10"
                      : "border-slate-600 bg-slate-700/50 hover:border-pink-500/50"
                  }`}
                  onClick={() => setSelectedLocation(location.id)}
                >
                  <img
                    src={location.image || "/placeholder.svg"}
                    alt={location.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-bold text-pink-300 mb-2">{location.name}</h3>
                  <p className="text-sm text-slate-400 mb-3">{location.description}</p>
                  <Badge className="bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    {location.objects} كائن AR
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
