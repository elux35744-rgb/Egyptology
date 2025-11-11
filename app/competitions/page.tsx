"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Trophy,
  Medal,
  Star,
  Users,
  Target,
  Gift,
  Crown,
  Zap,
  Camera,
  Palette,
  BookOpen,
  Video,
  Sparkles,
} from "lucide-react"

interface Competition {
  id: string
  title: string
  description: string
  category: "video" | "art" | "knowledge" | "story"
  prize: number
  participants: number
  timeLeft: string
  difficulty: "سهل" | "متوسط" | "صعب"
  status: "active" | "upcoming" | "ended"
  requirements: string[]
  icon: any
}

interface LeaderboardEntry {
  rank: number
  username: string
  avatar: string
  score: number
  piEarned: number
  badge: string
}

export default function CompetitionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [userSubmissions, setUserSubmissions] = useState<number>(3)

  const competitions: Competition[] = [
    {
      id: "1",
      title: "مسابقة أفضل فيديو تعليمي",
      description: "أنشئ فيديو تعليمي عن الحضارة المصرية باستخدام الاستوديو الفرعوني",
      category: "video",
      prize: 5000,
      participants: 247,
      timeLeft: "5 أيام",
      difficulty: "متوسط",
      status: "active",
      requirements: ["مدة لا تقل عن دقيقتين", "استخدام 3 تأثيرات على الأقل", "محتوى تعليمي أصلي"],
      icon: Video,
    },
    {
      id: "2",
      title: "تحدي الرسم الرقمي الفرعوني",
      description: "ارسم لوحة رقمية مستوحاة من الفن المصري القديم",
      category: "art",
      prize: 3500,
      participants: 189,
      timeLeft: "3 أيام",
      difficulty: "صعب",
      status: "active",
      requirements: ["دقة عالية", "ألوان أصيلة", "تفاصيل دقيقة"],
      icon: Palette,
    },
    {
      id: "3",
      title: "اختبار المعرفة الأسبوعي",
      description: "اختبار شامل عن تاريخ وثقافة مصر القديمة",
      category: "knowledge",
      prize: 1500,
      participants: 892,
      timeLeft: "2 أيام",
      difficulty: "سهل",
      status: "active",
      requirements: ["50 سؤال", "30 دقيقة", "درجة لا تقل عن 80%"],
      icon: BookOpen,
    },
    {
      id: "4",
      title: "مسابقة القصة القصيرة",
      description: "اكتب قصة قصيرة تدور أحداثها في مصر القديمة",
      category: "story",
      prize: 2500,
      participants: 156,
      timeLeft: "7 أيام",
      difficulty: "متوسط",
      status: "active",
      requirements: ["500-1000 كلمة", "أحداث تاريخية دقيقة", "إبداع في السرد"],
      icon: BookOpen,
    },
    {
      id: "5",
      title: "تحدي التصوير الإبداعي",
      description: "التقط صوراً إبداعية مستوحاة من الحضارة المصرية",
      category: "art",
      prize: 4000,
      participants: 0,
      timeLeft: "10 أيام",
      difficulty: "متوسط",
      status: "upcoming",
      requirements: ["جودة عالية", "إبداع في التكوين", "معالجة احترافية"],
      icon: Camera,
    },
  ]

  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      username: "أحمد المصري",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 9850,
      piEarned: 15420,
      badge: "ملك المسابقات",
    },
    {
      rank: 2,
      username: "فاطمة النيل",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 9200,
      piEarned: 12890,
      badge: "ملكة الإبداع",
    },
    {
      rank: 3,
      username: "محمد الأثري",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 8750,
      piEarned: 11250,
      badge: "خبير التاريخ",
    },
    {
      rank: 4,
      username: "سارة الفنانة",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 8100,
      piEarned: 9870,
      badge: "فنانة مبدعة",
    },
    {
      rank: 5,
      username: "يوسف الكاتب",
      avatar: "/placeholder.svg?height=40&width=40",
      score: 7650,
      piEarned: 8940,
      badge: "راوي القصص",
    },
  ]

  const categories = [
    { id: "all", name: "الكل", icon: Target },
    { id: "video", name: "الفيديو", icon: Video },
    { id: "art", name: "الفن", icon: Palette },
    { id: "knowledge", name: "المعرفة", icon: BookOpen },
    { id: "story", name: "القصص", icon: BookOpen },
  ]

  const filteredCompetitions =
    selectedCategory === "all" ? competitions : competitions.filter((comp) => comp.category === selectedCategory)

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "سهل":
        return "bg-green-500"
      case "متوسط":
        return "bg-yellow-500"
      case "صعب":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "upcoming":
        return "bg-blue-500"
      case "ended":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "video":
        return "from-red-500 to-pink-500"
      case "art":
        return "from-purple-500 to-indigo-500"
      case "knowledge":
        return "from-blue-500 to-cyan-500"
      case "story":
        return "from-green-500 to-emerald-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const joinCompetition = (competitionId: string) => {
    // هنا يمكن إضافة منطق الانضمام للمسابقة
    alert("تم الانضمام للمسابقة بنجاح!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-4">
              مسابقات ومحتوى المستخدمين
            </h1>
            <p className="text-xl text-gray-300 mb-6">شارك في المسابقات واكسب Pi وأظهر إبداعك للعالم</p>

            {/* إحصائيات سريعة */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-yellow-500/30">
                <CardContent className="p-4 text-center">
                  <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">24</div>
                  <div className="text-sm text-gray-300">مسابقة نشطة</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">1,484</div>
                  <div className="text-sm text-gray-300">مشارك</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-green-500/30">
                <CardContent className="p-4 text-center">
                  <Zap className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">47,250</div>
                  <div className="text-sm text-gray-300">Pi موزعة</div>
                </CardContent>
              </Card>
              <Card className="bg-white/10 backdrop-blur-sm border-cyan-500/30">
                <CardContent className="p-4 text-center">
                  <Star className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{userSubmissions}</div>
                  <div className="text-sm text-gray-300">مشاركاتك</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="competitions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-white/10 backdrop-blur-sm mb-8">
            <TabsTrigger value="competitions" className="text-white">
              المسابقات النشطة
            </TabsTrigger>
            <TabsTrigger value="leaderboard" className="text-white">
              لوحة المتصدرين
            </TabsTrigger>
            <TabsTrigger value="submissions" className="text-white">
              مشاركاتي
            </TabsTrigger>
          </TabsList>

          <TabsContent value="competitions">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* فلاتر الفئات */}
              <div className="lg:col-span-1">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
                  <CardHeader>
                    <CardTitle className="text-white">فئات المسابقات</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {categories.map((category) => {
                        const IconComponent = category.icon
                        return (
                          <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "outline"}
                            className={`w-full justify-start ${
                              selectedCategory === category.id
                                ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                                : "border-white/20 text-white hover:bg-white/10"
                            }`}
                            onClick={() => setSelectedCategory(category.id)}
                          >
                            <IconComponent className="w-4 h-4 mr-2" />
                            {category.name}
                          </Button>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* نصائح للفوز */}
                <Card className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-sm border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-green-400" />
                      نصائح للفوز
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-gray-300 text-sm space-y-2">
                      <li>• اقرأ المتطلبات بعناية</li>
                      <li>• ابدأ مبكراً لتجنب الضغط</li>
                      <li>• استخدم الأدوات المتاحة</li>
                      <li>• اطلب المساعدة من المجتمع</li>
                      <li>• كن مبدعاً وأصيلاً</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* قائمة المسابقات */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredCompetitions.map((competition) => {
                    const IconComponent = competition.icon
                    return (
                      <Card
                        key={competition.id}
                        className="bg-white/10 backdrop-blur-sm border-white/20 hover:border-yellow-500/50 transition-all duration-300 hover:scale-105"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div
                              className={`p-3 rounded-full bg-gradient-to-r ${getCategoryColor(competition.category)}`}
                            >
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div className="flex gap-2">
                              <Badge className={`${getDifficultyColor(competition.difficulty)} text-white`}>
                                {competition.difficulty}
                              </Badge>
                              <Badge className={`${getStatusColor(competition.status)} text-white`}>
                                {competition.status === "active"
                                  ? "نشطة"
                                  : competition.status === "upcoming"
                                    ? "قريباً"
                                    : "انتهت"}
                              </Badge>
                            </div>
                          </div>
                          <CardTitle className="text-white text-lg">{competition.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 mb-4">{competition.description}</p>

                          {/* معلومات المسابقة */}
                          <div className="space-y-3 mb-4">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">الجائزة:</span>
                              <span className="text-yellow-400 font-bold">{competition.prize} π</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">المشاركون:</span>
                              <span className="text-white">{competition.participants}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">الوقت المتبقي:</span>
                              <span className="text-red-400 font-bold">{competition.timeLeft}</span>
                            </div>
                          </div>

                          {/* المتطلبات */}
                          <div className="mb-4">
                            <div className="text-sm text-gray-400 mb-2">المتطلبات:</div>
                            <ul className="text-xs text-gray-300 space-y-1">
                              {competition.requirements.map((req, index) => (
                                <li key={index}>• {req}</li>
                              ))}
                            </ul>
                          </div>

                          <Button
                            onClick={() => joinCompetition(competition.id)}
                            className={`w-full ${
                              competition.status === "active"
                                ? `bg-gradient-to-r ${getCategoryColor(competition.category)} hover:opacity-90`
                                : "bg-gray-500 cursor-not-allowed"
                            }`}
                            disabled={competition.status !== "active"}
                          >
                            {competition.status === "active"
                              ? "انضم للمسابقة"
                              : competition.status === "upcoming"
                                ? "قريباً"
                                : "انتهت"}
                          </Button>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* لوحة المتصدرين */}
              <div className="lg:col-span-2">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                      لوحة المتصدرين الشهرية
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leaderboard.map((entry) => (
                        <div
                          key={entry.rank}
                          className={`flex items-center gap-4 p-4 rounded-lg ${
                            entry.rank <= 3
                              ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30"
                              : "bg-white/5 border border-white/10"
                          }`}
                        >
                          <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                              entry.rank === 1
                                ? "bg-yellow-500 text-white"
                                : entry.rank === 2
                                  ? "bg-gray-400 text-white"
                                  : entry.rank === 3
                                    ? "bg-orange-600 text-white"
                                    : "bg-gray-600 text-white"
                            }`}
                          >
                            {entry.rank}
                          </div>
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={entry.avatar || "/placeholder.svg"} alt={entry.username} />
                            <AvatarFallback>{entry.username[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-white font-semibold">{entry.username}</h3>
                              {entry.rank <= 3 && <Crown className="w-4 h-4 text-yellow-400" />}
                            </div>
                            <p className="text-gray-400 text-sm">{entry.badge}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold">{entry.score.toLocaleString()}</div>
                            <div className="text-yellow-400 text-sm">{entry.piEarned.toLocaleString()} π</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* إحصائيات وجوائز */}
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Gift className="w-5 h-5 text-purple-400" />
                      جوائز هذا الشهر
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                        <Medal className="w-6 h-6 text-yellow-400" />
                        <div>
                          <div className="text-white font-semibold">المركز الأول</div>
                          <div className="text-yellow-400 text-sm">10,000 π + شارة ذهبية</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-400/20 rounded-lg border border-gray-400/30">
                        <Medal className="w-6 h-6 text-gray-400" />
                        <div>
                          <div className="text-white font-semibold">المركز الثاني</div>
                          <div className="text-gray-300 text-sm">7,500 π + شارة فضية</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-orange-600/20 rounded-lg border border-orange-600/30">
                        <Medal className="w-6 h-6 text-orange-400" />
                        <div>
                          <div className="text-white font-semibold">المركز الثالث</div>
                          <div className="text-orange-300 text-sm">5,000 π + شارة برونزية</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-cyan-400" />
                      ترتيبك الحالي
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">#47</div>
                      <div className="text-gray-400 mb-4">من أصل 1,484 مشارك</div>
                      <Progress value={75} className="mb-2" />
                      <div className="text-sm text-gray-400">تحتاج 250 نقطة للوصول للمركز 40</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="submissions">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">مشاركاتي في المسابقات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">لا توجد مشاركات بعد</h3>
                  <p className="text-gray-400 mb-6">ابدأ بالمشاركة في المسابقات لتظهر مشاركاتك هنا</p>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500">تصفح المسابقات النشطة</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
