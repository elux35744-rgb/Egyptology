"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  ArrowLeft,
  Upload,
  Camera,
  Wand2,
  Download,
  Share2,
  Eye,
  Sparkles,
  Crown,
  Palette,
  Settings,
  RefreshCw,
  Heart,
  Star,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function AIPortraitPage() {
  const [activeTab, setActiveTab] = useState("upload")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedStyle, setSelectedStyle] = useState("pharaoh")
  const [generationProgress, setGenerationProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const pharaonicStyles = [
    {
      id: "pharaoh",
      name: "فرعون ملكي",
      description: "تحويل إلى فرعون بالتاج الذهبي والزينة الملكية",
      preview: "/placeholder.svg?height=150&width=150",
      premium: false,
    },
    {
      id: "queen",
      name: "ملكة فرعونية",
      description: "تحويل إلى ملكة بالتاج والمجوهرات الذهبية",
      preview: "/placeholder.svg?height=150&width=150",
      premium: false,
    },
    {
      id: "priest",
      name: "كاهن مقدس",
      description: "تحويل إلى كاهن بالرداء المقدس والرموز الدينية",
      preview: "/placeholder.svg?height=150&width=150",
      premium: true,
    },
    {
      id: "scribe",
      name: "كاتب ملكي",
      description: "تحويل إلى كاتب فرعوني بأدوات الكتابة الهيروغليفية",
      preview: "/placeholder.svg?height=150&width=150",
      premium: false,
    },
    {
      id: "warrior",
      name: "محارب فرعوني",
      description: "تحويل إلى محارب بالدرع والسيف الذهبي",
      preview: "/placeholder.svg?height=150&width=150",
      premium: true,
    },
    {
      id: "goddess",
      name: "إلهة مصرية",
      description: "تحويل إلى إلهة بالأجنحة والرموز المقدسة",
      preview: "/placeholder.svg?height=150&width=150",
      premium: true,
    },
  ]

  const [settings, setSettings] = useState({
    faceAccuracy: [95],
    detailLevel: [90],
    colorIntensity: [85],
    backgroundStyle: [80],
  })

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setActiveTab("customize")
      }
      reader.readAsDataURL(file)
    }
  }

  const generatePharaonicPortrait = async () => {
    if (!uploadedImage) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI generation process
    const progressSteps = [
      { step: 20, message: "تحليل ملامح الوجه..." },
      { step: 40, message: "تطبيق النمط الفرعوني..." },
      { step: 60, message: "إضافة التفاصيل الذهبية..." },
      { step: 80, message: "تحسين الجودة..." },
      { step: 100, message: "اكتمل التحويل!" },
    ]

    for (const { step, message } of progressSteps) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setGenerationProgress(step)
    }

    // Simulate generated result
    setGeneratedImage("/placeholder.svg?height=400&width=400&text=Generated+Pharaonic+Portrait")
    setIsGenerating(false)
    setActiveTab("result")
  }

  const downloadImage = () => {
    if (generatedImage) {
      const link = document.createElement("a")
      link.href = generatedImage
      link.download = "pharaonic-portrait.png"
      link.click()
    }
  }

  const shareImage = async () => {
    if (navigator.share && generatedImage) {
      try {
        await navigator.share({
          title: "صورتي الفرعونية",
          text: "شاهد صورتي بعد تحويلها إلى نمط فرعوني!",
          url: generatedImage,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    }
  }

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('/images/pharaonic-bg.png'), linear-gradient(135deg, #92400e 0%, #d97706 50%, #f59e0b 100%)`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundBlendMode: "overlay, normal",
      }}
    >
      {/* Pharaonic Overlay Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('/images/papyrus-texture.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Header */}
      <header
        className="relative text-white p-4 shadow-2xl border-b-4 border-yellow-400"
        style={{
          backgroundImage: `url('/images/pharaonic-header.png'), linear-gradient(90deg, #92400e 0%, #d97706 50%, #f59e0b 100%)`,
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          backgroundBlendMode: "overlay, normal",
        }}
      >
        <div className="flex items-center gap-4 relative z-10">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-yellow-600/20">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <Wand2 className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold drop-shadow-lg" style={{ fontFamily: "serif" }}>
                𓊪𓏏𓊖 مولد الصور الفرعونية بالذكاء الاصطناعي 𓊪𓏏𓊖
              </h1>
              <p className="text-yellow-200 text-sm">حول صورتك إلى لوحة فرعونية بدقة عالية</p>
            </div>
          </div>
        </div>
      </header>

      <div className="p-4 space-y-6 relative z-10">
        {/* AI Features Banner */}
        <Card className="bg-gradient-to-r from-blue-100/95 to-purple-100/95 border-2 border-blue-400 shadow-2xl backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <div className="text-center">
                <h2 className="text-xl font-bold text-blue-900">تقنية الذكاء الاصطناعي المتقدمة</h2>
                <p className="text-blue-700 text-sm">دقة 99% في الحفاظ على ملامح الوجه الأصلية</p>
              </div>
              <Sparkles className="h-8 w-8 text-blue-600" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-800">4K</div>
                <div className="text-sm text-blue-700">دقة عالية</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-800">30s</div>
                <div className="text-sm text-blue-700">سرعة التحويل</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-800">99%</div>
                <div className="text-sm text-blue-700">دقة الملامح</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-gradient-to-r from-amber-900/90 to-yellow-800/90 backdrop-blur-md border-2 border-yellow-400/50 shadow-xl">
            <TabsTrigger
              value="upload"
              className="text-yellow-100 data-[state=active]:bg-yellow-600 data-[state=active]:text-white text-xs"
            >
              <Upload className="h-4 w-4 mr-1" />
              رفع الصورة
            </TabsTrigger>
            <TabsTrigger
              value="customize"
              className="text-yellow-100 data-[state=active]:bg-yellow-600 data-[state=active]:text-white text-xs"
              disabled={!uploadedImage}
            >
              <Palette className="h-4 w-4 mr-1" />
              التخصيص
            </TabsTrigger>
            <TabsTrigger
              value="generate"
              className="text-yellow-100 data-[state=active]:bg-yellow-600 data-[state=active]:text-white text-xs"
              disabled={!uploadedImage}
            >
              <Wand2 className="h-4 w-4 mr-1" />
              التحويل
            </TabsTrigger>
            <TabsTrigger
              value="result"
              className="text-yellow-100 data-[state=active]:bg-yellow-600 data-[state=active]:text-white text-xs"
              disabled={!generatedImage}
            >
              <Eye className="h-4 w-4 mr-1" />
              النتيجة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            {/* Upload Section */}
            <Card className="bg-white/95 backdrop-blur border-2 border-yellow-400 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-amber-900 text-center">
                  <Upload className="h-6 w-6 mx-auto mb-2" />
                  ارفع صورتك الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-amber-300 rounded-lg p-8 text-center">
                  {uploadedImage ? (
                    <div className="space-y-4">
                      <Image
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded"
                        width={200}
                        height={200}
                        className="mx-auto rounded-lg shadow-lg"
                      />
                      <p className="text-green-600 font-bold">تم رفع الصورة بنجاح!</p>
                      <Button
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="border-amber-600 text-amber-700"
                      >
                        اختيار صورة أخرى
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl text-amber-400">📸</div>
                      <div>
                        <h3 className="text-lg font-bold text-amber-900 mb-2">اختر صورة واضحة للوجه</h3>
                        <p className="text-amber-700 text-sm mb-4">
                          للحصول على أفضل النتائج، استخدم صورة عالية الجودة مع إضاءة جيدة
                        </p>
                      </div>
                      <div className="flex gap-3 justify-center">
                        <Button
                          onClick={() => fileInputRef.current?.click()}
                          className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          اختيار من الجهاز
                        </Button>
                        <Button variant="outline" className="border-amber-600 text-amber-700 bg-transparent">
                          <Camera className="h-4 w-4 mr-2" />
                          التقاط صورة
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Tips */}
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-blue-900 mb-2">💡 نصائح للحصول على أفضل النتائج:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• استخدم صورة واضحة بدقة عالية (على الأقل 512x512)</li>
                      <li>• تأكد من أن الوجه واضح ومواجه للكاميرا</li>
                      <li>• تجنب الظلال القوية أو الإضاءة الخافتة</li>
                      <li>• يفضل خلفية بسيطة وغير معقدة</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customize" className="space-y-6">
            {/* Style Selection */}
            <Card className="bg-white/95 backdrop-blur border-2 border-yellow-400 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center gap-2">
                  <Crown className="h-6 w-6" />
                  اختر النمط الفرعوني
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {pharaonicStyles.map((style) => (
                    <Card
                      key={style.id}
                      className={`cursor-pointer transition-all ${
                        selectedStyle === style.id
                          ? "border-2 border-amber-600 bg-amber-50"
                          : "border border-gray-200 hover:border-amber-400"
                      }`}
                      onClick={() => setSelectedStyle(style.id)}
                    >
                      <CardContent className="p-3">
                        <div className="relative">
                          <Image
                            src={style.preview || "/placeholder.svg"}
                            alt={style.name}
                            width={120}
                            height={120}
                            className="w-full h-24 object-cover rounded-lg mb-2"
                          />
                          {style.premium && (
                            <Badge className="absolute top-1 right-1 bg-purple-600 text-white text-xs">مميز</Badge>
                          )}
                        </div>
                        <h4 className="font-bold text-sm text-amber-900">{style.name}</h4>
                        <p className="text-xs text-amber-700 mt-1">{style.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Advanced Settings */}
            <Card className="bg-white/95 backdrop-blur border-2 border-yellow-400 shadow-xl">
              <CardHeader>
                <CardTitle className="text-amber-900 flex items-center gap-2">
                  <Settings className="h-6 w-6" />
                  إعدادات متقدمة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-amber-900 mb-2 block">
                    دقة الحفاظ على ملامح الوجه: {settings.faceAccuracy[0]}%
                  </label>
                  <Slider
                    value={settings.faceAccuracy}
                    onValueChange={(value) => setSettings({ ...settings, faceAccuracy: value })}
                    max={100}
                    min={70}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-amber-900 mb-2 block">
                    مستوى التفاصيل: {settings.detailLevel[0]}%
                  </label>
                  <Slider
                    value={settings.detailLevel}
                    onValueChange={(value) => setSettings({ ...settings, detailLevel: value })}
                    max={100}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-amber-900 mb-2 block">
                    كثافة الألوان الذهبية: {settings.colorIntensity[0]}%
                  </label>
                  <Slider
                    value={settings.colorIntensity}
                    onValueChange={(value) => setSettings({ ...settings, colorIntensity: value })}
                    max={100}
                    min={30}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-amber-900 mb-2 block">
                    نمط الخلفية: {settings.backgroundStyle[0]}%
                  </label>
                  <Slider
                    value={settings.backgroundStyle}
                    onValueChange={(value) => setSettings({ ...settings, backgroundStyle: value })}
                    max={100}
                    min={0}
                    step={10}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={() => setActiveTab("generate")}
              className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-lg py-3"
            >
              <Wand2 className="h-5 w-5 mr-2" />
              المتابعة للتحويل
            </Button>
          </TabsContent>

          <TabsContent value="generate" className="space-y-6">
            {/* Generation Process */}
            <Card className="bg-white/95 backdrop-blur border-2 border-yellow-400 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-amber-900 text-center">
                  <Wand2 className="h-6 w-6 mx-auto mb-2" />
                  تحويل الصورة بالذكاء الاصطناعي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {uploadedImage && (
                  <div className="flex justify-center">
                    <Image
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Original"
                      width={200}
                      height={200}
                      className="rounded-lg shadow-lg"
                    />
                  </div>
                )}

                <div className="text-center space-y-4">
                  <div className="text-lg font-bold text-amber-900">
                    النمط المختار: {pharaonicStyles.find((s) => s.id === selectedStyle)?.name}
                  </div>

                  {isGenerating ? (
                    <div className="space-y-4">
                      <div className="text-blue-600 font-medium">جاري التحويل... {generationProgress}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${generationProgress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin text-blue-600" />
                        <span className="text-sm text-blue-600">يرجى الانتظار...</span>
                      </div>
                    </div>
                  ) : (
                    <Button
                      onClick={generatePharaonicPortrait}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg"
                      disabled={!uploadedImage}
                    >
                      <Sparkles className="h-5 w-5 mr-2" />
                      بدء التحويل الفرعوني
                    </Button>
                  )}
                </div>

                {/* Process Steps */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                  <CardContent className="p-4">
                    <h4 className="font-bold text-blue-900 mb-3">مراحل التحويل:</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>تحليل ملامح الوجه بدقة عالية</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>تطبيق النمط الفرعوني المختار</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>إضافة التفاصيل الذهبية والزخارف</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span>تحسين الجودة والألوان</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="result" className="space-y-6">
            {/* Result Display */}
            <Card className="bg-white/95 backdrop-blur border-2 border-yellow-400 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-amber-900 text-center">
                  <Crown className="h-6 w-6 mx-auto mb-2" />
                  صورتك الفرعونية الجديدة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {generatedImage && (
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <Image
                        src={generatedImage || "/placeholder.svg"}
                        alt="Generated Pharaonic Portrait"
                        width={300}
                        height={300}
                        className="rounded-lg shadow-2xl border-4 border-amber-400"
                      />
                      <div className="absolute -top-2 -right-2">
                        <Badge className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white">
                          <Sparkles className="h-3 w-3 mr-1" />
                          جديد
                        </Badge>
                      </div>
                    </div>

                    {/* Before/After Comparison */}
                    {uploadedImage && (
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="text-center">
                          <Image
                            src={uploadedImage || "/placeholder.svg"}
                            alt="Original"
                            width={150}
                            height={150}
                            className="rounded-lg shadow-lg mx-auto"
                          />
                          <p className="text-sm text-gray-600 mt-2">الصورة الأصلية</p>
                        </div>
                        <div className="text-center">
                          <Image
                            src={generatedImage || "/placeholder.svg"}
                            alt="Generated"
                            width={150}
                            height={150}
                            className="rounded-lg shadow-lg mx-auto"
                          />
                          <p className="text-sm text-amber-700 mt-2 font-bold">النسخة الفرعونية</p>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 justify-center flex-wrap">
                      <Button
                        onClick={downloadImage}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        تحميل الصورة
                      </Button>
                      <Button
                        onClick={shareImage}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        مشاركة
                      </Button>
                      <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                        <Heart className="h-4 w-4 mr-2" />
                        إضافة للمفضلة
                      </Button>
                    </div>

                    {/* Rating */}
                    <Card className="bg-amber-50 border-amber-200">
                      <CardContent className="p-4 text-center">
                        <h4 className="font-bold text-amber-900 mb-2">قيم النتيجة</h4>
                        <div className="flex justify-center gap-1 mb-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="h-6 w-6 text-yellow-400 fill-yellow-400 cursor-pointer hover:scale-110 transition-transform"
                            />
                          ))}
                        </div>
                        <p className="text-sm text-amber-700">ساعدنا في تحسين الخدمة</p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Generate Another */}
                <div className="text-center">
                  <Button
                    onClick={() => {
                      setUploadedImage(null)
                      setGeneratedImage(null)
                      setActiveTab("upload")
                    }}
                    variant="outline"
                    className="border-amber-600 text-amber-700 hover:bg-amber-50"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    إنشاء صورة جديدة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Gallery Section */}
        <Card className="bg-gradient-to-br from-amber-50/95 to-yellow-100/95 border-2 border-yellow-400 shadow-xl backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-amber-900 text-center">معرض الصور الفرعونية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="relative">
                  <Image
                    src={`/placeholder.svg?height=100&width=100&text=Sample+${i}`}
                    alt={`Sample ${i}`}
                    width={100}
                    height={100}
                    className="w-full h-20 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Eye className="h-4 w-4 text-white" />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-amber-700 text-sm mt-4">أمثلة على التحويلات السابقة</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
