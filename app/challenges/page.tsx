"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Clock, Target, Award, Zap, Crown, Gem } from "lucide-react"

interface Challenge {
  id: string
  title: string
  description: string
  difficulty: "easy" | "medium" | "hard"
  category: string
  questions: Question[]
  reward: number
  timeLimit: number
  completed: boolean
}

interface Question {
  id: string
  question: string
  options: string[]
  correct: number
  explanation: string
}

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [userStats, setUserStats] = useState({
    totalPoints: 1250,
    completedChallenges: 15,
    streak: 7,
    rank: "مستكشف متقدم",
  })

  useEffect(() => {
    // محاكاة تحميل التحديات
    const mockChallenges: Challenge[] = [
      {
        id: "1",
        title: "تحدي الآلهة المصرية",
        description: "اختبر معرفتك بآلهة مصر القديمة وقصصهم",
        difficulty: "easy",
        category: "الآلهة",
        reward: 100,
        timeLimit: 300,
        completed: false,
        questions: [
          {
            id: "1",
            question: "من هو إله الشمس في الحضارة المصرية القديمة؟",
            options: ["رع", "أنوبيس", "حورس", "تحوت"],
            correct: 0,
            explanation: "رع هو إله الشمس الأعظم في الحضارة المصرية القديمة",
          },
          {
            id: "2",
            question: "ما هو رمز الإلهة إيزيس؟",
            options: ["الصقر", "العقرب", "العرش", "الثعبان"],
            options: ["الصقر", "العقرب", "العرش", "الثعبان"],
            correct: 2,
            explanation: "العرش هو الرمز المقدس للإلهة إيزيس",
          },
        ],
      },
      {
        id: "2",
        title: "أسرار الهيروغليفية",
        description: "فك رموز الكتابة المصرية القديمة",
        difficulty: "medium",
        category: "الهيروغليفية",
        reward: 200,
        timeLimit: 450,
        completed: false,
        questions: [
          {
            id: "1",
            question: "ما معنى رمز العين في الهيروغليفية؟",
            options: ["النظر", "الحماية", "الحكمة", "جميع ما سبق"],
            correct: 3,
            explanation: "رمز العين له معاني متعددة في الهيروغليفية",
          },
        ],
      },
      {
        id: "3",
        title: "ملوك الأسرات",
        description: "تحدي معرفة الملوك والملكات عبر التاريخ",
        difficulty: "hard",
        category: "التاريخ",
        reward: 300,
        timeLimit: 600,
        completed: true,
        questions: [],
      },
    ]
    setChallenges(mockChallenges)
  }, [])

  useEffect(() => {
    if (currentChallenge && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && currentChallenge) {
      handleTimeUp()
    }
  }, [timeLeft, currentChallenge])

  const startChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge)
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setScore(0)
    setTimeLeft(challenge.timeLimit)
    setShowResult(false)
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const nextQuestion = () => {
    if (selectedAnswer !== null) {
      const isCorrect = selectedAnswer === currentChallenge!.questions[currentQuestion].correct
      if (isCorrect) {
        setScore(score + 1)
      }

      if (currentQuestion + 1 < currentChallenge!.questions.length) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
      } else {
        finishChallenge()
      }
    }
  }

  const finishChallenge = () => {
    setShowResult(true)
    const finalScore = selectedAnswer === currentChallenge!.questions[currentQuestion].correct ? score + 1 : score
    const percentage = (finalScore / currentChallenge!.questions.length) * 100

    if (percentage >= 70) {
      setUserStats((prev) => ({
        ...prev,
        totalPoints: prev.totalPoints + currentChallenge!.reward,
        completedChallenges: prev.completedChallenges + 1,
        streak: prev.streak + 1,
      }))
    }
  }

  const handleTimeUp = () => {
    setShowResult(true)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  if (showResult && currentChallenge) {
    const finalScore = score
    const percentage = (finalScore / currentChallenge.questions.length) * 100
    const passed = percentage >= 70

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4">
                {passed ? (
                  <Trophy className="w-16 h-16 text-yellow-400" />
                ) : (
                  <Target className="w-16 h-16 text-gray-400" />
                )}
              </div>
              <CardTitle className="text-2xl text-white">{passed ? "تهانينا! لقد نجحت" : "حاول مرة أخرى"}</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-4xl font-bold text-cyan-400">
                {finalScore}/{currentChallenge.questions.length}
              </div>
              <div className="text-xl text-white">النسبة: {percentage.toFixed(0)}%</div>

              {passed && (
                <div className="space-y-2">
                  <div className="text-green-400 font-semibold">+ {currentChallenge.reward} Pi نقطة</div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                    <Award className="w-4 h-4 mr-1" />
                    إنجاز جديد
                  </Badge>
                </div>
              )}

              <div className="flex gap-4 justify-center">
                <Button onClick={() => setCurrentChallenge(null)} className="bg-cyan-600 hover:bg-cyan-700">
                  العودة للتحديات
                </Button>
                <Button
                  onClick={() => startChallenge(currentChallenge)}
                  variant="outline"
                  className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                >
                  إعادة المحاولة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (currentChallenge) {
    const question = currentChallenge.questions[currentQuestion]
    const progress = ((currentQuestion + 1) / currentChallenge.questions.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-2xl mx-auto">
          {/* شريط التقدم والوقت */}
          <div className="mb-6 space-y-4">
            <div className="flex justify-between items-center text-white">
              <span>
                السؤال {currentQuestion + 1} من {currentChallenge.questions.length}
              </span>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className={timeLeft < 60 ? "text-red-400" : "text-cyan-400"}>{formatTime(timeLeft)}</span>
              </div>
            </div>
            <Progress value={progress} className="h-2 bg-gray-700" />
          </div>

          <Card className="bg-black/40 border-cyan-500/30 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-xl text-white">{question.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full text-right justify-start h-auto p-4 ${
                    selectedAnswer === index
                      ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                      : "border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
                  }`}
                >
                  <span className="ml-2 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {option}
                </Button>
              ))}

              <div className="flex justify-between pt-4">
                <Button
                  onClick={() => setCurrentChallenge(null)}
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  إنهاء التحدي
                </Button>
                <Button
                  onClick={nextQuestion}
                  disabled={selectedAnswer === null}
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50"
                >
                  {currentQuestion + 1 === currentChallenge.questions.length ? "إنهاء" : "التالي"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* إحصائيات المستخدم */}
        <Card className="mb-8 bg-black/40 border-cyan-500/30 backdrop-blur-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Gem className="w-6 h-6 text-cyan-400 mr-2" />
                  <span className="text-2xl font-bold text-cyan-400">{userStats.totalPoints}</span>
                </div>
                <p className="text-gray-300 text-sm">نقاط Pi</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Trophy className="w-6 h-6 text-yellow-400 mr-2" />
                  <span className="text-2xl font-bold text-yellow-400">{userStats.completedChallenges}</span>
                </div>
                <p className="text-gray-300 text-sm">تحدي مكتمل</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Zap className="w-6 h-6 text-orange-400 mr-2" />
                  <span className="text-2xl font-bold text-orange-400">{userStats.streak}</span>
                </div>
                <p className="text-gray-300 text-sm">أيام متتالية</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Crown className="w-6 h-6 text-purple-400 mr-2" />
                  <span className="text-lg font-bold text-purple-400">{userStats.rank}</span>
                </div>
                <p className="text-gray-300 text-sm">الرتبة</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* التحديات المتاحة */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <Card
              key={challenge.id}
              className="bg-black/40 border-cyan-500/30 backdrop-blur-lg hover:border-cyan-400/50 transition-all"
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge className={`${getDifficultyColor(challenge.difficulty)} text-white`}>
                    {challenge.difficulty === "easy" ? "سهل" : challenge.difficulty === "medium" ? "متوسط" : "صعب"}
                  </Badge>
                  {challenge.completed && (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">مكتمل</Badge>
                  )}
                </div>
                <CardTitle className="text-white">{challenge.title}</CardTitle>
                <p className="text-gray-300 text-sm">{challenge.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">الفئة:</span>
                    <span className="text-cyan-400">{challenge.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">المكافأة:</span>
                    <span className="text-yellow-400 font-semibold">{challenge.reward} Pi</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">الوقت المحدد:</span>
                    <span className="text-orange-400">{Math.floor(challenge.timeLimit / 60)} دقيقة</span>
                  </div>

                  <Button
                    onClick={() => startChallenge(challenge)}
                    className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700"
                    disabled={challenge.questions.length === 0}
                  >
                    {challenge.completed ? "إعادة التحدي" : "بدء التحدي"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* تحدي اليوم */}
        <Card className="mt-8 bg-gradient-to-r from-yellow-900/40 to-orange-900/40 border-yellow-500/30 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-yellow-400 flex items-center">
              <Star className="w-6 h-6 mr-2" />
              تحدي اليوم الخاص
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-semibold mb-2">أسرار الأهرامات</h3>
                <p className="text-gray-300 text-sm mb-2">تحدي خاص بمضاعفة المكافآت</p>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-yellow-400">مكافأة: 500 Pi</span>
                  <span className="text-orange-400">صعوبة: متقدم</span>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700">
                ابدأ الآن
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
