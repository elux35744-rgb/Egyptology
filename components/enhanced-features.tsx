"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Crown,
  Heart,
  Star,
  Award,
  Flame,
  Compass,
  Map,
  Clock,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  BookOpen,
  Trophy,
  Rocket,
} from "lucide-react"

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  progress: number
  maxProgress: number
  unlocked: boolean
  rarity: "common" | "rare" | "epic" | "legendary"
  category: string
}

interface LearningPath {
  id: string
  title: string
  description: string
  difficulty: "beginner" | "intermediate" | "advanced" | "expert"
  estimatedTime: string
  modules: {
    id: string
    title: string
    completed: boolean
    locked: boolean
  }[]
  progress: number
}

interface UserStats {
  level: number
  experience: number
  nextLevelExp: number
  totalTimeSpent: number
  questionsAnswered: number
  topicsExplored: number
  achievementsUnlocked: number
  streakDays: number
  favoriteCategory: string
  learningEfficiency: number
}

export function EnhancedFeatures() {
  const [userStats, setUserStats] = useState<UserStats>({
    level: 12,
    experience: 2847,
    nextLevelExp: 3000,
    totalTimeSpent: 1247,
    questionsAnswered: 156,
    topicsExplored: 23,
    achievementsUnlocked: 8,
    streakDays: 7,
    favoriteCategory: "الهيروغليفية",
    learningEfficiency: 87,
  })

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "first_question",
      title: "أول سؤال",
      description: "طرحت أول سؤال في المساعد الذكي",
      icon: "🎯",
      progress: 1,
      maxProgress: 1,
      unlocked: true,
      rarity: "common",
      category: "البداية",
    },
    {
      id: "hieroglyph_master",
      title: "خبير الهيروغليفية",
      description: "تعلمت 50 رمز هيروغليفي",
      icon: "𓋹",
      progress: 34,
      maxProgress: 50,
      unlocked: false,
      rarity: "rare",
      category: "الهيروغليفية",
    },
    {
      id: "pharaoh_scholar",
      title: "عالم الفراعنة",
      description: "تعرفت على 20 فرعون مختلف",
      icon: "👑",
      progress: 12,
      maxProgress: 20,
      unlocked: false,
      rarity: "epic",
      category: "التاريخ",
    },
    {
      id: "pyramid_explorer",
      title: "مستكشف الأهرامات",
      description: "استكشفت جميع الأهرامات الرئيسية",
      icon: "🔺",
      progress: 3,
      maxProgress: 7,
      unlocked: false,
      rarity: "legendary",
      category: "الآثار",
    },
    {
      id: "daily_learner",
      title: "المتعلم اليومي",
      description: "تعلمت لمدة 7 أيام متتالية",
      icon: "🔥",
      progress: 7,
      maxProgress: 7,
      unlocked: true,
      rarity: "rare",
      category: "الانتظام",
    },
    {
      id: "mythology_expert",
      title: "خبير الأساطير",
      description: "تعرفت على 15 إله مصري",
      icon: "🐍",
      progress: 8,
      maxProgress: 15,
      unlocked: false,
      rarity: "epic",
      category: "الأساطير",
    },
  ])

  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: "hieroglyphs_basics",
      title: "أساسيات الهيروغليفية",
      description: "تعلم قراءة وكتابة الرموز المصرية القديمة",
      difficulty: "beginner",
      estimatedTime: "4 ساعات",
      progress: 65,
      modules: [
        { id: "intro", title: "مقدمة عن الهيروغليفية", completed: true, locked: false },
        { id: "basic_symbols", title: "الرموز الأساسية", completed: true, locked: false },
        { id: "phonetic", title: "الرموز الصوتية", completed: true, locked: false },
        { id: "determinatives", title: "الرموز التحديدية", completed: false, locked: false },
        { id: "writing_practice", title: "تمارين الكتابة", completed: false, locked: true },
      ],
    },
    {
      id: "pharaohs_dynasty",
      title: "سلالات الفراعنة",
      description: "رحلة عبر تاريخ الأسرات المصرية",
      difficulty: "intermediate",
      estimatedTime: "6 ساعات",
      progress: 30,
      modules: [
        { id: "old_kingdom", title: "الدولة القديمة", completed: true, locked: false },
        { id: "middle_kingdom", title: "الدولة الوسطى", completed: false, locked: false },
        { id: "new_kingdom", title: "الدولة الحديثة", completed: false, locked: true },
        { id: "ptolemaic", title: "العصر البطلمي", completed: false, locked: true },
      ],
    },
    {
      id: "pyramid_mysteries",
      title: "أسرار الأهرامات",
      description: "اكتشف كيف بُنيت هذه العجائب المعمارية",
      difficulty: "advanced",
      estimatedTime: "8 ساعات",
      progress: 15,
      modules: [
        { id: "construction", title: "تقنيات البناء", completed: false, locked: false },
        { id: "astronomy", title: "التوجه الفلكي", completed: false, locked: true },
        { id: "chambers", title: "الغرف السرية", completed: false, locked: true },
        { id: "theories", title: "النظريات الحديثة", completed: false, locked: true },
      ],
    },
  ])

  const getRarityColor = (rarity: Achievement["rarity"]) => {
    switch (rarity) {
      case "common":
        return "bg-gray-500"
      case "rare":
        return "bg-blue-500"
      case "epic":
        return "bg-purple-500"
      case "legendary":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getDifficultyColor = (difficulty: LearningPath["difficulty"]) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500"
      case "intermediate":
        return "bg-yellow-500"
      case "advanced":
        return "bg-orange-500"
      case "expert":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* User Stats Overview */}
      <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-2 border-amber-300">
        <CardHeader>
          <CardTitle className="text-amber-800 flex items-center gap-2">
            <Crown className="h-6 w-6" />
            ملفك الشخصي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-700">{userStats.level}</div>
              <div className="text-sm text-amber-600">المستوى</div>
              <Progress value={(userStats.experience / userStats.nextLevelExp) * 100} className="mt-2" />
              <div className="text-xs text-amber-500 mt-1">
                {userStats.experience}/{userStats.nextLevelExp} نقطة خبرة
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-700">{userStats.totalTimeSpent}</div>
              <div className="text-sm text-blue-600">دقيقة تعلم</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-700">{userStats.questionsAnswered}</div>
              <div className="text-sm text-green-600">سؤال مُجاب</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-700">{userStats.achievementsUnlocked}</div>
              <div className="text-sm text-purple-600">إنجاز مُحقق</div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
              <Flame className="h-8 w-8 text-orange-500" />
              <div>
                <div className="font-semibold text-orange-700">{userStats.streakDays} أيام</div>
                <div className="text-sm text-orange-600">سلسلة التعلم</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
              <Target className="h-8 w-8 text-blue-500" />
              <div>
                <div className="font-semibold text-blue-700">{userStats.learningEfficiency}%</div>
                <div className="text-sm text-blue-600">كفاءة التعلم</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
              <Heart className="h-8 w-8 text-pink-500" />
              <div>
                <div className="font-semibold text-pink-700">{userStats.favoriteCategory}</div>
                <div className="text-sm text-pink-600">الموضوع المفضل</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="achievements" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="achievements" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            الإنجازات
          </TabsTrigger>
          <TabsTrigger value="learning-paths" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            مسارات التعلم
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            التحليلات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="achievements" className="space-y-4">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center gap-2">
                <Award className="h-6 w-6" />
                الإنجازات ({achievements.filter((a) => a.unlocked).length}/{achievements.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={`border-2 transition-all duration-300 ${
                      achievement.unlocked
                        ? "border-green-300 bg-green-50 shadow-lg"
                        : "border-gray-300 bg-gray-50 opacity-75"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-800">{achievement.title}</h3>
                            <Badge className={`${getRarityColor(achievement.rarity)} text-white text-xs`}>
                              {achievement.rarity === "common" && "عادي"}
                              {achievement.rarity === "rare" && "نادر"}
                              {achievement.rarity === "epic" && "ملحمي"}
                              {achievement.rarity === "legendary" && "أسطوري"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                          <div className="space-y-2">
                            <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2" />
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>
                                {achievement.progress}/{achievement.maxProgress}
                              </span>
                              <span>{achievement.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="learning-paths" className="space-y-4">
          <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center gap-2">
                <Compass className="h-6 w-6" />
                مسارات التعلم المخصصة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {learningPaths.map((path) => (
                  <Card key={path.id} className="border-2 border-amber-200 hover:border-amber-400 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-amber-800">{path.title}</h3>
                            <Badge className={`${getDifficultyColor(path.difficulty)} text-white`}>
                              {path.difficulty === "beginner" && "مبتدئ"}
                              {path.difficulty === "intermediate" && "متوسط"}
                              {path.difficulty === "advanced" && "متقدم"}
                              {path.difficulty === "expert" && "خبير"}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{path.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {path.estimatedTime}
                            </div>
                            <div className="flex items-center gap-1">
                              <BookOpen className="h-4 w-4" />
                              {path.modules.length} وحدة
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-amber-600">{path.progress}%</div>
                          <div className="text-sm text-gray-500">مكتمل</div>
                        </div>
                      </div>

                      <Progress value={path.progress} className="mb-4" />

                      <div className="space-y-2">
                        {path.modules.map((module, index) => (
                          <div
                            key={module.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border ${
                              module.completed
                                ? "bg-green-50 border-green-200"
                                : module.locked
                                  ? "bg-gray-50 border-gray-200 opacity-50"
                                  : "bg-blue-50 border-blue-200"
                            }`}
                          >
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {module.completed ? (
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                  ✓
                                </div>
                              ) : module.locked ? (
                                <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                                  🔒
                                </div>
                              ) : (
                                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                  {index + 1}
                                </div>
                              )}
                            </div>
                            <span className={`flex-1 ${module.locked ? "text-gray-400" : "text-gray-700"}`}>
                              {module.title}
                            </span>
                            {!module.locked && !module.completed && (
                              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white">
                                ابدأ
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />
                  تقدم التعلم الأسبوعي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"].map((day, index) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="w-16 text-sm text-gray-600">{day}</span>
                      <Progress value={Math.random() * 100} className="flex-1" />
                      <span className="w-12 text-sm text-gray-500">{Math.floor(Math.random() * 60)}د</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800 flex items-center gap-2">
                  <PieChart className="h-6 w-6" />
                  توزيع المواضيع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { topic: "الهيروغليفية", percentage: 35, color: "bg-blue-500" },
                    { topic: "التاريخ", percentage: 25, color: "bg-purple-500" },
                    { topic: "الآثار", percentage: 20, color: "bg-green-500" },
                    { topic: "الأساطير", percentage: 15, color: "bg-orange-500" },
                    { topic: "الثقافة", percentage: 5, color: "bg-red-500" },
                  ].map((item) => (
                    <div key={item.topic} className="flex items-center gap-3">
                      <div className={`w-4 h-4 ${item.color} rounded`}></div>
                      <span className="flex-1 text-sm">{item.topic}</span>
                      <span className="text-sm font-semibold">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800 flex items-center gap-2">
                  <Activity className="h-6 w-6" />
                  نشاط التعلم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-green-800">درس مكتمل</div>
                        <div className="text-sm text-green-600">أساسيات الهيروغليفية</div>
                      </div>
                    </div>
                    <div className="text-sm text-green-500">منذ ساعة</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-blue-800">إنجاز جديد</div>
                        <div className="text-sm text-blue-600">المتعلم اليومي</div>
                      </div>
                    </div>
                    <div className="text-sm text-blue-500">منذ 3 ساعات</div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-white">
                        <Star className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-purple-800">مستوى جديد</div>
                        <div className="text-sm text-purple-600">وصلت للمستوى 12</div>
                      </div>
                    </div>
                    <div className="text-sm text-purple-500">أمس</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
              <CardHeader>
                <CardTitle className="text-amber-800 flex items-center gap-2">
                  <Rocket className="h-6 w-6" />
                  أهداف الأسبوع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>تعلم 10 رموز هيروغليفية جديدة</span>
                      <span>7/10</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>قضاء 5 ساعات في التعلم</span>
                      <span>3.2/5</span>
                    </div>
                    <Progress value={64} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>إكمال مسار تعليمي واحد</span>
                      <span>0/1</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>الحفاظ على سلسلة التعلم</span>
                      <span>7/7</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
