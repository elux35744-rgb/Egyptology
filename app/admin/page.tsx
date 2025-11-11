"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Shield,
  Users,
  BarChart3,
  Settings,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Globe,
  Brain,
  FileText,
  Video,
  Clock,
  RefreshCw,
  Download,
  Eye,
  Key,
  UserCheck,
  Mail,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  Info,
  Cpu,
  HardDrive,
  Wifi,
  Server,
  Monitor,
  Smartphone,
  Tablet,
  BookOpen,
  HelpCircle,
  Lock,
  Code,
  Play,
  Pause,
} from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [loginError, setLoginError] = useState("")

  const [activeTab, setActiveTab] = useState("dashboard")
  const [systemStatus, setSystemStatus] = useState("healthy")
  const [totalUsers, setTotalUsers] = useState(15420)
  const [activeUsers, setActiveUsers] = useState(8934)
  const [contentItems, setContentItems] = useState(2847)
  const [systemLoad, setSystemLoad] = useState(67)

  const [aiModels, setAiModels] = useState([
    { name: "نموذج الهيروغليفية", status: "نشط", accuracy: 94.5, lastTrained: "2024-01-20" },
    { name: "نموذج القصص", status: "نشط", accuracy: 89.2, lastTrained: "2024-01-19" },
    { name: "نموذج الفيديو", status: "تدريب", accuracy: 87.8, lastTrained: "2024-01-18" },
    { name: "نموذج المحادثة", status: "نشط", accuracy: 92.1, lastTrained: "2024-01-17" },
  ])

  const [contentForm, setContentForm] = useState({
    title: "",
    type: "article",
    content: "",
    image: null,
  })

  const [adminStats, setAdminStats] = useState({
    totalUsers: 15420,
    activeUsers: 8934,
    newUsersToday: 234,
    contentItems: 2847,
    videosGenerated: 1247,
    aiInteractions: 45678,
    systemUptime: "99.9%",
    serverLoad: 67,
    databaseSize: "847GB",
    backupStatus: "completed",
    lastBackup: "2024-01-20 02:00",
    securityAlerts: 0,
    performanceScore: 94,
    userSatisfaction: 4.8,
  })

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "user_registration",
      description: "مستخدم جديد انضم للتطبيق",
      user: "أحمد محمد",
      timestamp: "منذ 5 دقائق",
      status: "success",
    },
    {
      id: 2,
      type: "content_creation",
      description: "تم إنشاء مقال جديد عن الأهرامات",
      user: "النظام",
      timestamp: "منذ 12 دقيقة",
      status: "success",
    },
    {
      id: 3,
      type: "video_generation",
      description: "تم إنشاء فيديو فرعوني جديد",
      user: "فاطمة علي",
      timestamp: "منذ 18 دقيقة",
      status: "success",
    },
    {
      id: 4,
      type: "system_update",
      description: "تحديث نظام الذكاء الاصطناعي",
      user: "النظام",
      timestamp: "منذ 25 دقيقة",
      status: "warning",
    },
    {
      id: 5,
      type: "security_scan",
      description: "فحص أمني شامل للنظام",
      user: "النظام",
      timestamp: "منذ 35 دقيقة",
      status: "success",
    },
  ])

  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 45,
    memory: 67,
    disk: 34,
    network: 89,
    database: 56,
    cache: 78,
  })

  const [userAnalytics, setUserAnalytics] = useState({
    totalRegistrations: 15420,
    activeToday: 8934,
    newToday: 234,
    retentionRate: 78,
    engagementRate: 85,
    averageSessionTime: "23 دقيقة",
    topCountries: ["مصر", "السعودية", "الإمارات", "الكويت", "قطر"],
    deviceBreakdown: {
      mobile: 65,
      desktop: 25,
      tablet: 10,
    },
  })

  const [contentStats, setContentStats] = useState({
    totalArticles: 1247,
    totalVideos: 856,
    totalImages: 3421,
    hieroglyphSymbols: 2847,
    stories: 234,
    places: 156,
    gamesCompleted: 5678,
    averageRating: 4.8,
    contentViews: 234567,
    contentShares: 12345,
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAdminStats((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        aiInteractions: prev.aiInteractions + Math.floor(Math.random() * 50),
        videosGenerated: prev.videosGenerated + Math.floor(Math.random() * 3),
      }))

      setSystemMetrics((prev) => ({
        ...prev,
        cpu: Math.max(20, Math.min(90, prev.cpu + (Math.random() - 0.5) * 10)),
        memory: Math.max(30, Math.min(95, prev.memory + (Math.random() - 0.5) * 8)),
        network: Math.max(50, Math.min(100, prev.network + (Math.random() - 0.5) * 5)),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <X className="h-4 w-4 text-red-600" />
      default:
        return <Info className="h-4 w-4 text-gray-600" />
    }
  }

  const getMetricColor = (value: number) => {
    if (value > 80) return "text-red-600"
    if (value > 60) return "text-yellow-600"
    return "text-green-600"
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.username === "admin" && loginForm.password === "admin") {
      setIsLoggedIn(true)
      setLoginError("")
    } else {
      setLoginError("اسم المستخدم أو كلمة المرور غير صحيحة")
    }
  }

  const handleAddContent = () => {
    console.log("إضافة محتوى جديد:", contentForm)
    // هنا يمكن إضافة المحتوى إلى قاعدة البيانات
    setContentForm({ title: "", type: "article", content: "", image: null })
  }

  const handleTrainModel = (modelName: string) => {
    console.log("بدء تدريب النموذج:", modelName)
    // هنا يمكن بدء عملية التدريب
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border-2 border-blue-400">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">🛡️ لوحة الإدارة</CardTitle>
            <p className="text-gray-600">تسجيل الدخول للوصول إلى لوحة التحكم</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">اسم المستخدم</label>
                <Input
                  type="text"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  placeholder="admin"
                  className="w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">كلمة المرور</label>
                <Input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  placeholder="admin"
                  className="w-full"
                  required
                />
              </div>
              {loginError && <div className="text-red-600 text-sm bg-red-50 p-2 rounded">{loginError}</div>}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                <Lock className="h-4 w-4 mr-2" />
                تسجيل الدخول
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url('/images/admin-bg.png'), linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)`,
        backgroundSize: "cover, cover",
        backgroundPosition: "center, center",
        backgroundBlendMode: "overlay, normal",
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url('/images/circuit-pattern.png')`,
          backgroundSize: "400px 400px",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
        }}
      />

      <header className="relative text-white p-6 shadow-2xl border-b-4 border-cyan-400 bg-gradient-to-r from-slate-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-cyan-600/30 border border-cyan-400/50"
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              </Link>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl border-2 border-cyan-300 animate-pulse">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold drop-shadow-lg bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    🛡️ لوحة الإدارة المتقدمة
                  </h1>
                  <p className="text-cyan-200 text-sm font-medium">
                    نظام إدارة شامل لتطبيق علم المصريات مع الذكاء الاصطناعي
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                className={`${systemStatus === "healthy" ? "bg-green-500/90 animate-pulse border border-green-300" : "bg-red-500/90 border border-red-300"} text-white px-3 py-1 shadow-lg`}
              >
                {systemStatus === "healthy" ? "🟢 النظام سليم" : "🔴 تحذير"}
              </Badge>
              <Badge className="bg-cyan-500/90 text-white px-3 py-1 shadow-lg border border-cyan-300">
                {activeUsers.toLocaleString()} مستخدم نشط
              </Badge>
              <Badge className="bg-purple-500/90 text-white px-3 py-1 shadow-lg border border-purple-300">
                94% أداء
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-red-600/30 border border-red-400/50 px-4 py-2"
                onClick={() => setIsLoggedIn(false)}
              >
                <X className="h-4 w-4 mr-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8 relative z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-9 gap-2 mb-8 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md border-2 border-cyan-400/50 shadow-2xl p-2 rounded-xl">
            <TabsTrigger
              value="dashboard"
              className="text-cyan-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white hover:bg-cyan-600/20 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-cyan-300 shadow-lg"
            >
              <Activity className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">لوحة التحكم</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="text-cyan-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white hover:bg-green-600/20 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-green-300 shadow-lg"
            >
              <Users className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">المستخدمين</span>
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="text-cyan-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-violet-600 data-[state=active]:text-white hover:bg-purple-600/20 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-purple-300 shadow-lg"
            >
              <FileText className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">المحتوى</span>
            </TabsTrigger>
            <TabsTrigger
              value="content-manager"
              className="text-cyan-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600 data-[state=active]:text-white hover:bg-orange-600/20 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-orange-300 shadow-lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">إضافة محتوى</span>
            </TabsTrigger>
            <TabsTrigger
              value="ai-management"
              className="text-cyan-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-rose-600 data-[state=active]:text-white hover:bg-pink-600/20 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-pink-300 shadow-lg"
            >
              <Brain className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">الذكاء الاصطناعي</span>
            </TabsTrigger>
            <TabsTrigger
              value="ai-developer"
              className="text-cyan-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600 data-[state=active]:to-amber-600 data-[state=active]:text-white hover:bg-yellow-600/20 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-yellow-300 shadow-lg"
            >
              <Code className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">مطور الذكاء الاصطناعي</span>
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="text-cyan-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-blue-600 data-[state=active]:text-white hover:bg-indigo-600/20 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-indigo-300 shadow-lg"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">التحليلات</span>
            </TabsTrigger>
            <TabsTrigger
              value="system"
              className="text-cyan-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-600 data-[state=active]:to-cyan-600 data-[state=active]:text-white hover:bg-teal-600/20 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-teal-300 shadow-lg"
            >
              <Server className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">النظام</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="text-cyan-100 data-[state=active]:bg-gradient-to-r data-[state=active]:from-slate-600 data-[state=active]:to-gray-600 data-[state=active]:text-white hover:bg-slate-600/20 transition-all duration-300 rounded-lg border border-transparent data-[state=active]:border-slate-300 shadow-lg"
            >
              <Settings className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">الإعدادات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-management" className="space-y-8">
            {/* لوحة تحكم الذكاء الاصطناعي الرئيسية */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 bg-gradient-to-br from-pink-100/95 via-rose-100/95 to-red-100/95 border-2 border-pink-400 shadow-2xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-900 flex items-center gap-3 text-xl">
                    <Brain className="h-7 w-7 animate-pulse" />
                    مركز التحكم بالذكاء الاصطناعي
                  </CardTitle>
                  <p className="text-pink-700">إدارة شاملة لجميع أنظمة الذكاء الاصطناعي في التطبيق</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-xl text-white text-center shadow-lg">
                      <Cpu className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-xs opacity-90">نماذج نشطة</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-xl text-white text-center shadow-lg">
                      <Activity className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">94%</div>
                      <div className="text-xs opacity-90">كفاءة النظام</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-violet-600 p-4 rounded-xl text-white text-center shadow-lg">
                      <Database className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">2.4TB</div>
                      <div className="text-xs opacity-90">بيانات التدريب</div>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-xl text-white text-center shadow-lg">
                      <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                      <div className="text-2xl font-bold">156K</div>
                      <div className="text-xs opacity-90">استعلامات يومية</div>
                    </div>
                  </div>

                  {/* أدوات التحكم السريع */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg border border-blue-300 h-12">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      إعادة تدريب النماذج
                    </Button>
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg border border-green-300 h-12">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      تحسين الأداء
                    </Button>
                    <Button className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg border border-purple-300 h-12">
                      <Download className="h-4 w-4 mr-2" />
                      تصدير النماذج
                    </Button>
                    <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg border border-orange-300 h-12">
                      <Monitor className="h-4 w-4 mr-2" />
                      مراقبة مباشرة
                    </Button>
                    <Button className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg border border-teal-300 h-12">
                      <Settings className="h-4 w-4 mr-2" />
                      إعدادات متقدمة
                    </Button>
                    <Button className="bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white shadow-lg border border-pink-300 h-12">
                      <Brain className="h-4 w-4 mr-2" />
                      تدريب مخصص
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* لوحة حالة النظام */}
              <Card className="bg-gradient-to-br from-slate-100/95 via-gray-100/95 to-zinc-100/95 border-2 border-slate-400 shadow-2xl backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-slate-900 flex items-center gap-2">
                    <Activity className="h-6 w-6" />
                    حالة النظام
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">معالج الذكاء الاصطناعي</span>
                      <Badge className="bg-green-500 text-white">نشط</Badge>
                    </div>
                    <Progress value={94} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">ذاكرة النظام</span>
                      <Badge className="bg-blue-500 text-white">78%</Badge>
                    </div>
                    <Progress value={78} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">قاعدة البيانات</span>
                      <Badge className="bg-green-500 text-white">متصلة</Badge>
                    </div>
                    <Progress value={100} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">شبكة الاتصال</span>
                      <Badge className="bg-green-500 text-white">مستقرة</Badge>
                    </div>
                    <Progress value={96} className="h-2" />
                  </div>

                  <div className="pt-4 border-t border-slate-300">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">99.8%</div>
                      <div className="text-sm text-slate-600">وقت التشغيل</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* نماذج الذكاء الاصطناعي */}
            <Card className="bg-gradient-to-br from-indigo-100/95 via-blue-100/95 to-cyan-100/95 border-2 border-indigo-400 shadow-2xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-900 flex items-center gap-3 text-xl">
                  <Cpu className="h-7 w-7" />
                  نماذج الذكاء الاصطناعي المتاحة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: "مساعد الهيروغليفية", status: "نشط", accuracy: "96%", color: "from-blue-500 to-cyan-500" },
                    { name: "مولد المحتوى", status: "نشط", accuracy: "94%", color: "from-green-500 to-emerald-500" },
                    { name: "محلل الصور", status: "تدريب", accuracy: "89%", color: "from-orange-500 to-red-500" },
                    { name: "مترجم النصوص", status: "نشط", accuracy: "98%", color: "from-purple-500 to-violet-500" },
                    { name: "مولد الفيديو", status: "نشط", accuracy: "92%", color: "from-pink-500 to-rose-500" },
                    { name: "محلل المشاعر", status: "نشط", accuracy: "91%", color: "from-teal-500 to-cyan-500" },
                    { name: "مساعد التعلم", status: "نشط", accuracy: "95%", color: "from-indigo-500 to-blue-500" },
                    { name: "نظام التوصيات", status: "نشط", accuracy: "93%", color: "from-slate-500 to-gray-500" },
                  ].map((model, index) => (
                    <Card
                      key={index}
                      className={`bg-gradient-to-br ${model.color} text-white shadow-xl border-2 border-white/20`}
                    >
                      <CardContent className="p-4">
                        <div className="text-center space-y-2">
                          <Brain className="h-8 w-8 mx-auto opacity-90" />
                          <h3 className="font-bold text-sm">{model.name}</h3>
                          <Badge
                            className={`${model.status === "نشط" ? "bg-green-500/80" : "bg-orange-500/80"} text-white border border-white/30`}
                          >
                            {model.status}
                          </Badge>
                          <div className="text-lg font-bold">{model.accuracy}</div>
                          <div className="text-xs opacity-80">دقة النموذج</div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-full text-white hover:bg-white/20 border border-white/30 mt-2"
                            onClick={() => handleTrainModel(model.name)}
                          >
                            <Settings className="h-3 w-3 mr-1" />
                            إدارة
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-developer" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-md border-2 border-yellow-400/50 shadow-2xl">
              <CardHeader className="border-b border-yellow-400/30 bg-gradient-to-r from-yellow-600/20 to-amber-600/20">
                <CardTitle className="text-2xl font-bold text-yellow-100 flex items-center gap-3">
                  <Code className="h-8 w-8 text-yellow-400" />
                  مطور التطبيق بالذكاء الاصطناعي
                </CardTitle>
                <CardDescription className="text-yellow-200/80">
                  تحكم كامل في نموذج تطوير وتعديل التطبيق تلقائياً
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {/* حالة النموذج */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 p-4 rounded-xl border border-green-400/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 font-semibold">حالة النموذج</p>
                        <p className="text-green-400 text-2xl font-bold">نشط</p>
                      </div>
                      <CheckCircle className="h-8 w-8 text-green-400" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-4 rounded-xl border border-blue-400/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 font-semibold">المهام المكتملة</p>
                        <p className="text-blue-400 text-2xl font-bold">247</p>
                      </div>
                      <Activity className="h-8 w-8 text-blue-400" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-violet-600/20 p-4 rounded-xl border border-purple-400/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 font-semibold">معدل النجاح</p>
                        <p className="text-purple-400 text-2xl font-bold">98.5%</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-400" />
                    </div>
                  </div>
                </div>

                {/* أدوات التحكم */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button
                    onClick={() => window.open("/ai-developer", "_blank")}
                    className="bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white shadow-lg border border-yellow-300 h-12"
                  >
                    <Code className="h-4 w-4 mr-2" />
                    فتح المطور
                  </Button>
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg border border-green-300 h-12">
                    <Play className="h-4 w-4 mr-2" />
                    تشغيل النموذج
                  </Button>
                  <Button className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg border border-red-300 h-12">
                    <Pause className="h-4 w-4 mr-2" />
                    إيقاف مؤقت
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg border border-blue-300 h-12">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    إعادة تدريب
                  </Button>
                </div>

                {/* إعدادات النموذج */}
                <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 p-6 rounded-xl border border-slate-600/50">
                  <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <Settings className="h-5 w-5 text-yellow-400" />
                    إعدادات النموذج
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-300 mb-2">مستوى الذكاء</label>
                      <select className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-slate-100">
                        <option>متقدم جداً</option>
                        <option>متقدم</option>
                        <option>متوسط</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">سرعة المعالجة</label>
                      <select className="w-full bg-slate-700 border border-slate-600 rounded-lg p-2 text-slate-100">
                        <option>سريع جداً</option>
                        <option>سريع</option>
                        <option>متوسط</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-blue-100/95 to-indigo-100/95 border-2 border-blue-400 shadow-xl backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Users className="h-10 w-10 mx-auto mb-3 text-blue-600" />
                  <div className="text-3xl font-bold text-blue-800 mb-1">{totalUsers.toLocaleString()}</div>
                  <div className="text-sm text-blue-700">إجمالي المستخدمين</div>
                  <Badge className="bg-green-100 text-green-800 text-xs mt-2">+234 اليوم</Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-100/95 to-emerald-100/95 border-2 border-green-400 shadow-xl backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Activity className="h-10 w-10 mx-auto mb-3 text-green-600" />
                  <div className="text-3xl font-bold text-green-800 mb-1">{activeUsers.toLocaleString()}</div>
                  <div className="text-sm text-green-700">مستخدمين نشطين</div>
                  <Badge className="bg-blue-100 text-blue-800 text-xs mt-2">58% من الإجمالي</Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-100/95 to-pink-100/95 border-2 border-purple-400 shadow-xl backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <FileText className="h-10 w-10 mx-auto mb-3 text-purple-600" />
                  <div className="text-3xl font-bold text-purple-800 mb-1">{contentItems.toLocaleString()}</div>
                  <div className="text-sm text-purple-700">عناصر المحتوى</div>
                  <Badge className="bg-orange-100 text-orange-800 text-xs mt-2">+47 اليوم</Badge>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-100/95 to-red-100/95 border-2 border-orange-400 shadow-xl backdrop-blur-sm">
                <CardContent className="p-4 text-center">
                  <Video className="h-10 w-10 mx-auto mb-3 text-orange-600" />
                  <div className="text-3xl font-bold text-orange-800 mb-1">1,247</div>
                  <div className="text-sm text-orange-700">فيديوهات مُنشأة</div>
                  <Badge className="bg-purple-100 text-purple-800 text-xs mt-2">بالذكاء الاصطناعي</Badge>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card className="bg-gradient-to-r from-green-100/95 to-blue-100/95 border-2 border-green-400 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  حالة النظام العامة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-800">{adminStats.systemUptime}</div>
                    <div className="text-sm text-green-700">وقت التشغيل</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-800">{adminStats.performanceScore}%</div>
                    <div className="text-sm text-blue-700">نقاط الأداء</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-800">{adminStats.databaseSize}</div>
                    <div className="text-sm text-purple-700">حجم قاعدة البيانات</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-800">{adminStats.userSatisfaction}/5</div>
                    <div className="text-sm text-orange-700">رضا المستخدمين</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">حمل الخادم</span>
                    <span className={`text-sm font-bold ${getMetricColor(systemMetrics.cpu)}`}>
                      {systemMetrics.cpu}%
                    </span>
                  </div>
                  <Progress value={systemMetrics.cpu} className="w-full" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">استخدام الذاكرة</span>
                    <span className={`text-sm font-bold ${getMetricColor(systemMetrics.memory)}`}>
                      {systemMetrics.memory}%
                    </span>
                  </div>
                  <Progress value={systemMetrics.memory} className="w-full" />

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">مساحة القرص</span>
                    <span className={`text-sm font-bold ${getMetricColor(systemMetrics.disk)}`}>
                      {systemMetrics.disk}%
                    </span>
                  </div>
                  <Progress value={systemMetrics.disk} className="w-full" />
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card className="bg-white/95 backdrop-blur border-2 border-blue-400 shadow-xl">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  النشاطات الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="mt-1">{getStatusIcon(activity.status)}</div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <span>بواسطة: {activity.user}</span>
                          <span>•</span>
                          <span>{activity.timestamp}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            {/* User Analytics */}
            <Card className="bg-gradient-to-r from-blue-100/95 to-indigo-100/95 border-2 border-blue-400 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <Users className="h-6 w-6" />
                  تحليلات المستخدمين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-800">
                      {userAnalytics.totalRegistrations.toLocaleString()}
                    </div>
                    <div className="text-sm text-blue-700">إجمالي التسجيلات</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-800">
                      {userAnalytics.activeToday.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">نشط اليوم</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-800">{userAnalytics.retentionRate}%</div>
                    <div className="text-sm text-purple-700">معدل الاحتفاظ</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-800">{userAnalytics.engagementRate}%</div>
                    <div className="text-sm text-orange-700">معدل التفاعل</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-blue-900 mb-3">الدول الأكثر نشاطاً</h4>
                    <div className="space-y-2">
                      {userAnalytics.topCountries.map((country, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/80 rounded p-2">
                          <span className="text-sm text-gray-700">{country}</span>
                          <Badge variant="secondary">{Math.floor(Math.random() * 1000) + 500}</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-blue-900 mb-3">توزيع الأجهزة</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">الهاتف المحمول</span>
                        </div>
                        <span className="font-bold text-blue-800">{userAnalytics.deviceBreakdown.mobile}%</span>
                      </div>
                      <Progress value={userAnalytics.deviceBreakdown.mobile} className="w-full" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4 text-green-600" />
                          <span className="text-sm">سطح المكتب</span>
                        </div>
                        <span className="font-bold text-green-800">{userAnalytics.deviceBreakdown.desktop}%</span>
                      </div>
                      <Progress value={userAnalytics.deviceBreakdown.desktop} className="w-full" />

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Tablet className="h-4 w-4 text-purple-600" />
                          <span className="text-sm">الجهاز اللوحي</span>
                        </div>
                        <span className="font-bold text-purple-800">{userAnalytics.deviceBreakdown.tablet}%</span>
                      </div>
                      <Progress value={userAnalytics.deviceBreakdown.tablet} className="w-full" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Management */}
            <Card className="bg-white/95 backdrop-blur border-2 border-blue-400 shadow-xl">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  إدارة المستخدمين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="البحث عن مستخدم..." className="pr-10" />
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Filter className="h-4 w-4 mr-2" />
                    فلترة
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة مستخدم
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      name: "أحمد محمد",
                      email: "ahmed@example.com",
                      status: "نشط",
                      joinDate: "2024-01-15",
                      role: "مستخدم",
                    },
                    {
                      name: "فاطمة علي",
                      email: "fatima@example.com",
                      status: "نشط",
                      joinDate: "2024-01-10",
                      role: "مميز",
                    },
                    {
                      name: "محمود حسن",
                      email: "mahmoud@example.com",
                      status: "غير نشط",
                      joinDate: "2024-01-05",
                      role: "مستخدم",
                    },
                    {
                      name: "سارة أحمد",
                      email: "sara@example.com",
                      status: "نشط",
                      joinDate: "2024-01-01",
                      role: "مدير",
                    },
                  ].map((user, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          className={user.status === "نشط" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                        >
                          {user.status}
                        </Badge>
                        <Badge variant="secondary">{user.role}</Badge>
                        <div className="text-sm text-gray-600">{user.joinDate}</div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            {/* Content Statistics */}
            <Card className="bg-gradient-to-r from-purple-100/95 to-pink-100/95 border-2 border-purple-400 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  إحصائيات المحتوى
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-800">
                      {contentStats.totalArticles.toLocaleString()}
                    </div>
                    <div className="text-sm text-purple-700">المقالات</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-800">{contentStats.totalVideos.toLocaleString()}</div>
                    <div className="text-sm text-blue-700">الفيديوهات</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-800">
                      {contentStats.hieroglyphSymbols.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-700">رموز هيروغليفية</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-800">{contentStats.stories}</div>
                    <div className="text-sm text-orange-700">القصص</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-xl font-bold text-indigo-800">{contentStats.averageRating}/5</div>
                    <div className="text-sm text-indigo-700">متوسط التقييم</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-xl font-bold text-teal-800">{contentStats.contentViews.toLocaleString()}</div>
                    <div className="text-sm text-teal-700">إجمالي المشاهدات</div>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-xl font-bold text-pink-800">{contentStats.contentShares.toLocaleString()}</div>
                    <div className="text-sm text-pink-700">إجمالي المشاركات</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Management */}
            <Card className="bg-white/95 backdrop-blur border-2 border-purple-400 shadow-xl">
              <CardHeader>
                <CardTitle className="text-purple-900 flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  إدارة المحتوى
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="البحث في المحتوى..." className="pr-10" />
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Filter className="h-4 w-4 mr-2" />
                    فلترة
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة محتوى
                  </Button>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      title: "أسرار الأهرامات العظيمة",
                      type: "مقال",
                      author: "د. أحمد زاهي",
                      date: "2024-01-20",
                      status: "منشور",
                      views: 1247,
                    },
                    {
                      title: "فيديو الملك توت عنخ آمون",
                      type: "فيديو",
                      author: "النظام",
                      date: "2024-01-19",
                      status: "منشور",
                      views: 856,
                    },
                    {
                      title: "قصة الملكة نفرتيتي",
                      type: "قصة",
                      author: "د. فاطمة محمد",
                      date: "2024-01-18",
                      status: "مراجعة",
                      views: 634,
                    },
                    {
                      title: "معبد الكرنك الافتراضي",
                      type: "مكان",
                      author: "فريق التطوير",
                      date: "2024-01-17",
                      status: "منشور",
                      views: 2134,
                    },
                  ].map((content, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white">
                          {content.type === "مقال" && <FileText className="h-5 w-5" />}
                          {content.type === "فيديو" && <Video className="h-5 w-5" />}
                          {content.type === "قصة" && <BookOpen className="h-5 w-5" />}
                          {content.type === "مكان" && <Globe className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{content.title}</div>
                          <div className="text-sm text-gray-600">
                            بواسطة {content.author} • {content.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge
                          className={
                            content.status === "منشور" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {content.status}
                        </Badge>
                        <Badge variant="secondary">{content.type}</Badge>
                        <div className="text-sm text-gray-600">{content.views.toLocaleString()} مشاهدة</div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Analytics Dashboard */}
            <Card className="bg-gradient-to-r from-indigo-100/95 to-blue-100/95 border-2 border-indigo-400 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-900 flex items-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  لوحة التحليلات المتقدمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-indigo-900">مؤشرات الأداء الرئيسية</h4>
                    <div className="space-y-3">
                      <div className="bg-white/80 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700">معدل النمو الشهري</span>
                          <span className="font-bold text-green-600">+23.5%</span>
                        </div>
                        <Progress value={75} className="w-full" />
                      </div>
                      <div className="bg-white/80 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700">معدل الاحتفاظ</span>
                          <span className="font-bold text-blue-600">78.2%</span>
                        </div>
                        <Progress value={78} className="w-full" />
                      </div>
                      <div className="bg-white/80 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-gray-700">رضا المستخدمين</span>
                          <span className="font-bold text-purple-600">4.8/5</span>
                        </div>
                        <Progress value={96} className="w-full" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-indigo-900">الميزات الأكثر استخداماً</h4>
                    <div className="space-y-2">
                      {[
                        { name: "قاموس الهيروغليفية", usage: 89 },
                        { name: "منشئ الفيديو", usage: 76 },
                        { name: "المساعد الذكي", usage: 68 },
                        { name: "الأماكن الأثرية", usage: 54 },
                        { name: "القصص التفاعلية", usage: 43 },
                      ].map((feature, index) => (
                        <div key={index} className="bg-white/80 rounded p-2">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-700">{feature.name}</span>
                            <span className="font-bold text-indigo-600">{feature.usage}%</span>
                          </div>
                          <Progress value={feature.usage} className="w-full h-2" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-indigo-900">إحصائيات الوقت الفعلي</h4>
                    <div className="space-y-3">
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-800">
                          {adminStats.activeUsers.toLocaleString()}
                        </div>
                        <div className="text-sm text-green-700">مستخدم متصل الآن</div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-blue-800">156</div>
                        <div className="text-sm text-blue-700">جلسة نشطة</div>
                      </div>
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-purple-800">23</div>
                        <div className="text-sm text-purple-700">فيديو يتم إنشاؤه</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Analytics */}
            <Card className="bg-gradient-to-r from-green-100/95 to-emerald-100/95 border-2 border-green-400 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-green-900 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  تحليلات الإيرادات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-800">$12,847</div>
                    <div className="text-sm text-green-700">الإيرادات الشهرية</div>
                    <Badge className="bg-green-100 text-green-800 text-xs mt-1">+18.5%</Badge>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-800">π 8,934</div>
                    <div className="text-sm text-blue-700">مدفوعات Pi</div>
                    <Badge className="bg-blue-100 text-blue-800 text-xs mt-1">+25.3%</Badge>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-800">1,247</div>
                    <div className="text-sm text-purple-700">اشتراكات نشطة</div>
                    <Badge className="bg-purple-100 text-purple-800 text-xs mt-1">+12.7%</Badge>
                  </div>
                  <div className="text-center bg-white/80 rounded-lg p-4">
                    <div className="text-2xl font-bold text-orange-800">$23.50</div>
                    <div className="text-sm text-orange-700">متوسط الإيراد لكل مستخدم</div>
                    <Badge className="bg-orange-100 text-orange-800 text-xs mt-1">+8.2%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            {/* System Performance */}
            <Card className="bg-gradient-to-r from-red-100/95 to-orange-100/95 border-2 border-red-400 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center gap-2">
                  <Server className="h-6 w-6" />
                  أداء النظام
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-red-900">موارد الخادم</h4>
                    <div className="space-y-3">
                      <div className="bg-white/80 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Cpu className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-700">المعالج</span>
                          </div>
                          <span className={`font-bold ${getMetricColor(systemMetrics.cpu)}`}>{systemMetrics.cpu}%</span>
                        </div>
                        <Progress value={systemMetrics.cpu} className="w-full" />
                      </div>

                      <div className="bg-white/80 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4 text-green-600" />
                            <span className="text-sm text-gray-700">الذاكرة</span>
                          </div>
                          <span className={`font-bold ${getMetricColor(systemMetrics.memory)}`}>
                            {systemMetrics.memory}%
                          </span>
                        </div>
                        <Progress value={systemMetrics.memory} className="w-full" />
                      </div>

                      <div className="bg-white/80 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-gray-700">القرص الصلب</span>
                          </div>
                          <span className={`font-bold ${getMetricColor(systemMetrics.disk)}`}>
                            {systemMetrics.disk}%
                          </span>
                        </div>
                        <Progress value={systemMetrics.disk} className="w-full" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-red-900">الشبكة والاتصال</h4>
                    <div className="space-y-3">
                      <div className="bg-white/80 rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Wifi className="h-4 w-4 text-blue-600" />
                            <span className="text-sm text-gray-700">سرعة الشبكة</span>
                          </div>
                          <span className="font-bold text-blue-600">{systemMetrics.network}%</span>
                        </div>
                        <Progress value={systemMetrics.network} className="w-full" />
                      </div>

                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-green-800">23ms</div>
                        <div className="text-sm text-green-700">زمن الاستجابة</div>
                      </div>

                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-purple-800">99.9%</div>
                        <div className="text-sm text-purple-700">وقت التشغيل</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-red-900">قاعدة البيانات</h4>
                    <div className="space-y-3">
                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-blue-800">{adminStats.databaseSize}</div>
                        <div className="text-sm text-blue-700">حجم قاعدة البيانات</div>
                      </div>

                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-green-800">1,247</div>
                        <div className="text-sm text-green-700">استعلامات/ثانية</div>
                      </div>

                      <div className="bg-white/80 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-purple-800">0.8ms</div>
                        <div className="text-sm text-purple-700">متوسط وقت الاستعلام</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-4">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    إعادة تشغيل النظام
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-600 text-orange-700 hover:bg-orange-50 bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    تحميل تقرير الأداء
                  </Button>
                  <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50 bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    إعدادات الخادم
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="bg-gradient-to-r from-yellow-100/95 to-amber-100/95 border-2 border-yellow-400 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-yellow-900 flex items-center gap-2">
                  <Shield className="h-6 w-6" />
                  حالة الأمان
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-yellow-900">مؤشرات الأمان</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white/80 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">جدار الحماية</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">نشط</Badge>
                      </div>

                      <div className="flex items-center justify-between bg-white/80 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">شهادة SSL</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">صالحة</Badge>
                      </div>

                      <div className="flex items-center justify-between bg-white/80 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-gray-700">النسخ الاحتياطي</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">محدث</Badge>
                      </div>

                      <div className="flex items-center justify-between bg-white/80 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-600" />
                          <span className="text-sm text-gray-700">تحديثات الأمان</span>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">متاحة</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-yellow-900">آخر الأنشطة الأمنية</h4>
                    <div className="space-y-2">
                      {[
                        { action: "فحص أمني شامل", time: "منذ ساعة", status: "success" },
                        { action: "تحديث جدار الحماية", time: "منذ 3 ساعات", status: "success" },
                        { action: "محاولة دخول مشبوهة", time: "منذ 6 ساعات", status: "warning" },
                        { action: "نسخ احتياطي للبيانات", time: "منذ 12 ساعة", status: "success" },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center justify-between bg-white/80 rounded p-2">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(activity.status)}
                            <span className="text-sm text-gray-700">{activity.action}</span>
                          </div>
                          <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* General Settings */}
            <Card className="bg-white/95 backdrop-blur border-2 border-gray-400 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-900 flex items-center gap-2">
                  <Settings className="h-6 w-6" />
                  الإعدادات العامة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900">إعدادات التطبيق</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">تسجيل المستخدمين الجدد</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">الوضع المظلم افتراضياً</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">إشعارات البريد الإلكتروني</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">التحديثات التلقائية</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-gray-900">إعدادات الأمان</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">المصادقة الثنائية إجبارية</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">تسجيل محاولات الدخول</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">حظر IP المشبوه</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">تشفير البيانات الحساسة</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900">إعدادات النظام</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">حد المستخدمين المتزامنين</label>
                      <Input type="number" defaultValue="10000" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">مهلة انتهاء الجلسة (دقيقة)</label>
                      <Input type="number" defaultValue="30" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">حجم الملف الأقصى (MB)</label>
                      <Input type="number" defaultValue="50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">
                        عدد محاولات الدخول المسموحة
                      </label>
                      <Input type="number" defaultValue="5" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900">إعدادات النسخ الاحتياطي</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">النسخ الاحتياطي التلقائي</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">تكرار النسخ الاحتياطي</label>
                        <select className="w-full p-2 border border-gray-300 rounded-md">
                          <option>يومياً</option>
                          <option>أسبوعياً</option>
                          <option>شهرياً</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">عدد النسخ المحفوظة</label>
                        <Input type="number" defaultValue="7" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Save className="h-4 w-4 mr-2" />
                    حفظ الإعدادات
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    إعادة تعيين
                  </Button>
                  <Button variant="outline" className="border-red-600 text-red-700 hover:bg-red-50 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    تصدير الإعدادات
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* API Settings */}
            <Card className="bg-gradient-to-r from-indigo-100/95 to-purple-100/95 border-2 border-indigo-400 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-900 flex items-center gap-2">
                  <Key className="h-6 w-6" />
                  إعدادات API والتكامل
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-indigo-900">مفاتيح API</h4>
                  <div className="space-y-3">
                    <div className="bg-white/80 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">OpenAI API Key</span>
                        <Badge className="bg-green-100 text-green-800">نشط</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="password" value="sk-..." readOnly className="flex-1 font-mono text-sm" />
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-white/80 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Pi Network API Key</span>
                        <Badge className="bg-green-100 text-green-800">نشط</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input type="password" value="pi-..." readOnly className="flex-1 font-mono text-sm" />
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="bg-white/80 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Database Connection</span>
                        <Badge className="bg-green-100 text-green-800">متصل</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        Host: egyptology-db.cluster.amazonaws.com
                        <br />
                        Database: egyptology_prod
                        <br />
                        Last Connection: منذ دقيقة واحدة
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-indigo-900">إعدادات التكامل</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">تكامل الذكاء الاصطناعي</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">تكامل Pi Network</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">تكامل وسائل التواصل</span>
                        <Switch />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">إشعارات البريد الإلكتروني</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">تحليلات Google</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">CDN للمحتوى</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Maintenance Mode */}
            <Card className="bg-gradient-to-r from-red-100/95 to-pink-100/95 border-2 border-red-400 shadow-xl backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-red-900 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  وضع الصيانة والطوارئ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-white/80 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-bold text-red-900">تفعيل وضع الصيانة</h4>
                      <p className="text-sm text-red-700">سيتم إيقاف الوصول للمستخدمين مؤقتاً</p>
                    </div>
                    <Switch />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-700 block mb-2">رسالة الصيانة</label>
                      <Textarea
                        placeholder="أدخل رسالة للمستخدمين أثناء الصيانة..."
                        defaultValue="نعتذر عن الإزعاج. الموقع تحت الصيانة حالياً وسيعود للعمل قريباً."
                        className="w-full"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">وقت بداية الصيانة</label>
                        <Input type="datetime-local" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">وقت انتهاء الصيانة</label>
                        <Input type="datetime-local" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    صيانة طارئة
                  </Button>
                  <Button
                    variant="outline"
                    className="border-orange-600 text-orange-700 hover:bg-orange-50 bg-transparent"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    إعادة تشغيل
                  </Button>
                  <Button variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50 bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    نسخ احتياطي
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-600 text-green-700 hover:bg-green-50 bg-transparent"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    فحص النظام
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions Footer */}
        <Card className="bg-gradient-to-r from-gray-100/95 to-slate-100/95 border-2 border-gray-400 shadow-xl backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">آخر تحديث: {new Date().toLocaleString("ar-EG")}</div>
                <Badge className="bg-blue-100 text-blue-800">الإصدار 2.1.0</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="outline">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  المساعدة
                </Button>
                <Button size="sm" variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  الدعم الفني
                </Button>
                <Link href="/ai-admin">
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Brain className="h-4 w-4 mr-2" />
                    الذكاء الاصطناعي
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
