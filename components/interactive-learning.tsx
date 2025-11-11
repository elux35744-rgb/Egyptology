"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import {
  Gamepad2,
  Puzzle,
  Brain,
  Target,
  Clock,
  Star,
  Trophy,
  Heart,
  Eye,
  CheckCircle,
  XCircle,
  Play,
  Volume2,
  VolumeX,
  Shuffle,
  Award,
  MagnetIcon as Magic,
  Crown,
  Gem,
} from "lucide-react"

interface QuizQuestion {
  id: string
  type: "multiple-choice" | "true-false" | "fill-blank" | "matching" | "hieroglyph-translation"
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  category: string
  points: number
  timeLimit?: number
}

interface GameState {
  currentQuestion: number
  score: number
  lives: number
  timeRemaining: number
  streak: number
  powerUps: {
    skipQuestion: number
    extraTime: number
    fiftyFifty: number
    doublePoints: number
  }
  achievements: string[]
}

export function InteractiveLearning() {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: 0,
    score: 0,
    lives: 3,
    timeRemaining: 30,
    streak: 0,
    powerUps: {
      skipQuestion: 2,
      extraTime: 1,
      fiftyFifty: 1,
      doublePoints: 1,
    },
    achievements: [],
  })

  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [gameMode, setGameMode] = useState<"quiz" | "memory" | "puzzle" | "adventure">("quiz")
  const [soundEnabled, setSoundEnabled] = useState(true)

  const quizQuestions: QuizQuestion[] = [
    {
      id: "q1",
      type: "multiple-choice",
      question: "ما هو اسم الفرعون الذي بنى الهرم الأكبر؟",
      options: ["خوفو", "خفرع", "منكاورع", "زوسر"],
      correctAnswer: "خوفو",
      explanation: "الهرم الأكبر في الجيزة بناه الفرعون خوفو من الأسرة الرابعة حوالي 2580-2560 ق.م",
      difficulty: "easy",
      category: "الأهرامات",
      points: 10,
      timeLimit: 30,
    },
    {
      id: "q2",
      type: "hieroglyph-translation",
      question: "ما معنى هذا الرمز الهيروغليفي: 𓋹",
      options: ["ماء", "شمس", "حياة", "موت"],
      correctAnswer: "حياة",
      explanation: "رمز العنخ (𓋹) يعني الحياة وهو من أهم الرموز في الحضارة المصرية القديمة",
      difficulty: "medium",
      category: "الهيروغليفية",
      points: 15,
      timeLimit: 25,
    },
    {
      id: "q3",
      type: "true-false",
      question: "كانت كليوباترا السابعة آخر فراعنة مصر",
      correctAnswer: "صحيح",
      explanation: "كليوباترا السابعة (69-30 ق.م) كانت آخر حاكمة من البطالمة وآخر فراعنة مصر القديمة",
      difficulty: "medium",
      category: "التاريخ",
      points: 12,
      timeLimit: 20,
    },
    {
      id: "q4",
      type: "fill-blank",
      question: "عاصمة مصر القديمة في عهد الدولة القديمة كانت _____",
      correctAnswer: "منف",
      explanation: "منف (ممفيس) كانت عاصمة مصر القديمة خلال عهد الدولة القديمة وموقع مهم للحكم والإدارة",
      difficulty: "hard",
      category: "الجغرافيا",
      points: 20,
      timeLimit: 35,
    },
    {
      id: "q5",
      type: "multiple-choice",
      question: "أي من هذه الآلهة المصرية كان إله الشمس؟",
      options: ["نوبسيس", "رع", "تحوت", "حورس"],
      correctAnswer: "رع",
      explanation: "رع كان إله الشمس الرئيسي في الديانة المصرية القديمة ومن أهم الآلهة في البانثيون المصري",
      difficulty: "easy",
      category: "الأساطير",
      points: 10,
      timeLimit: 25,
    },
  ]

  const currentQuestion = quizQuestions[gameState.currentQuestion]

  // Define functions using useCallback to avoid dependency issues
  const checkAchievements = useCallback(
    (isCorrect: boolean) => {
      const newAchievements: string[] = []

      if (isCorrect && gameState.streak === 4) {
        newAchievements.push("سلسلة ذهبية - 5 إجابات صحيحة متتالية!")
      }

      if (gameState.score >= 100) {
        newAchievements.push("جامع النقاط - حصلت على 100 نقطة!")
      }

      if (newAchievements.length > 0) {
        setGameState((prev) => ({
          ...prev,
          achievements: [...prev.achievements, ...newAchievements],
        }))
      }
    },
    [gameState.streak, gameState.score],
  )

  const checkFinalAchievements = useCallback(() => {
    const newAchievements: string[] = []

    if (gameState.score >= 150) {
      newAchievements.push("خبير علم المصريات - نتيجة ممتازة!")
    }

    if (gameState.lives === 3) {
      newAchievements.push("الكمال المطلق - أنهيت اللعبة بدون أخطاء!")
    }

    if (newAchievements.length > 0) {
      setGameState((prev) => ({
        ...prev,
        achievements: [...prev.achievements, ...newAchievements],
      }))
    }
  }, [gameState.score, gameState.lives])

  const nextQuestion = useCallback(() => {
    if (gameState.currentQuestion < quizQuestions.length - 1) {
      setGameState((prev) => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        timeRemaining: quizQuestions[prev.currentQuestion + 1]?.timeLimit || 30,
      }))
      setSelectedAnswer("")
      setShowExplanation(false)
    } else {
      setIsPlaying(false)
      checkFinalAchievements()
    }
  }, [gameState.currentQuestion, checkFinalAchievements])

  const handleTimeUp = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      lives: prev.lives - 1,
      streak: 0,
    }))
    setShowExplanation(true)
    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }, [nextQuestion])

  const startGame = () => {
    setGameState({
      currentQuestion: 0,
      score: 0,
      lives: 3,
      timeRemaining: quizQuestions[0]?.timeLimit || 30,
      streak: 0,
      powerUps: {
        skipQuestion: 2,
        extraTime: 1,
        fiftyFifty: 1,
        doublePoints: 1,
      },
      achievements: [],
    })
    setIsPlaying(true)
    setSelectedAnswer("")
    setShowExplanation(false)
  }

  const handleAnswer = (answer: string) => {
    if (showExplanation) return

    setSelectedAnswer(answer)
    const isCorrect = answer === currentQuestion.correctAnswer

    if (isCorrect) {
      const points =
        gameState.powerUps.doublePoints > 0 && gameState.streak >= 3
          ? currentQuestion.points * 2
          : currentQuestion.points

      setGameState((prev) => ({
        ...prev,
        score: prev.score + points,
        streak: prev.streak + 1,
      }))

      checkAchievements(true)
    } else {
      setGameState((prev) => ({
        ...prev,
        lives: prev.lives - 1,
        streak: 0,
      }))
    }

    setShowExplanation(true)

    // Auto advance after showing explanation
    setTimeout(() => {
      nextQuestion()
    }, 3000)
  }

  const usePowerUp = (powerUp: keyof GameState["powerUps"]) => {
    if (gameState.powerUps[powerUp] <= 0) return

    setGameState((prev) => ({
      ...prev,
      powerUps: {
        ...prev.powerUps,
        [powerUp]: prev.powerUps[powerUp] - 1,
      },
    }))

    switch (powerUp) {
      case "skipQuestion":
        nextQuestion()
        break
      case "extraTime":
        setGameState((prev) => ({ ...prev, timeRemaining: prev.timeRemaining + 15 }))
        break
      case "fiftyFifty":
        // Remove two wrong answers (implementation would depend on question type)
        break
      case "doublePoints":
        // Double points for next correct answer (handled in handleAnswer)
        break
    }
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

  const getStreakBonus = () => {
    if (gameState.streak >= 5) return "🔥 سلسلة نارية!"
    if (gameState.streak >= 3) return "⚡ سلسلة رائعة!"
    if (gameState.streak >= 2) return "✨ سلسلة جيدة!"
    return ""
  }

  // Timer effect
  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isPlaying && gameState.timeRemaining > 0 && !showExplanation) {
      timer = setTimeout(() => {
        setGameState((prev) => ({ ...prev, timeRemaining: prev.timeRemaining - 1 }))
      }, 1000)
    } else if (gameState.timeRemaining === 0 && isPlaying) {
      handleTimeUp()
    }
    return () => clearTimeout(timer)
  }, [isPlaying, gameState.timeRemaining, showExplanation, handleTimeUp])

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <Card className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Gamepad2 className="h-6 w-6" />
              التعلم التفاعلي
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="text-purple-600"
              >
                {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              variant={gameMode === "quiz" ? "default" : "outline"}
              onClick={() => setGameMode("quiz")}
              className="h-20 flex flex-col items-center gap-2"
            >
              <Brain className="h-6 w-6" />
              <span className="text-sm">اختبار سريع</span>
            </Button>
            <Button
              variant={gameMode === "memory" ? "default" : "outline"}
              onClick={() => setGameMode("memory")}
              className="h-20 flex flex-col items-center gap-2"
            >
              <Eye className="h-6 w-6" />
              <span className="text-sm">لعبة الذاكرة</span>
            </Button>
            <Button
              variant={gameMode === "puzzle" ? "default" : "outline"}
              onClick={() => setGameMode("puzzle")}
              className="h-20 flex flex-col items-center gap-2"
            >
              <Puzzle className="h-6 w-6" />
              <span className="text-sm">ألغاز هيروغليفية</span>
            </Button>
            <Button
              variant={gameMode === "adventure" ? "default" : "outline"}
              onClick={() => setGameMode("adventure")}
              className="h-20 flex flex-col items-center gap-2"
            >
              <Crown className="h-6 w-6" />
              <span className="text-sm">مغامرة فرعونية</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Game Stats */}
      {isPlaying && (
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
          <CardContent className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{gameState.score}</div>
                <div className="text-sm text-blue-500">النقاط</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Heart
                      key={i}
                      className={`h-6 w-6 ${i < gameState.lives ? "text-red-500 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-red-500">الأرواح</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{gameState.timeRemaining}</div>
                <div className="text-sm text-green-500">ثانية</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{gameState.streak}</div>
                <div className="text-sm text-purple-500">سلسلة</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-orange-600">
                  {gameState.currentQuestion + 1}/{quizQuestions.length}
                </div>
                <div className="text-sm text-orange-500">السؤال</div>
              </div>
              <div className="text-center">
                <Badge className={getDifficultyColor(currentQuestion?.difficulty || "easy")}>
                  {currentQuestion?.difficulty === "easy" && "سهل"}
                  {currentQuestion?.difficulty === "medium" && "متوسط"}
                  {currentQuestion?.difficulty === "hard" && "صعب"}
                </Badge>
                <div className="text-sm text-gray-500 mt-1">{currentQuestion?.category}</div>
              </div>
            </div>

            {gameState.streak > 1 && (
              <div className="mt-4 text-center">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2">
                  {getStreakBonus()}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Power-ups */}
      {isPlaying && (
        <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-amber-800 text-lg flex items-center gap-2">
              <Magic className="h-5 w-5" />
              القوى الخاصة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => usePowerUp("skipQuestion")}
                disabled={gameState.powerUps.skipQuestion <= 0}
                className="flex flex-col items-center gap-1 h-16"
              >
                <Shuffle className="h-4 w-4" />
                <span className="text-xs">تخطي السؤال</span>
                <Badge variant="secondary" className="text-xs">
                  {gameState.powerUps.skipQuestion}
                </Badge>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => usePowerUp("extraTime")}
                disabled={gameState.powerUps.extraTime <= 0}
                className="flex flex-col items-center gap-1 h-16"
              >
                <Clock className="h-4 w-4" />
                <span className="text-xs">وقت إضافي</span>
                <Badge variant="secondary" className="text-xs">
                  {gameState.powerUps.extraTime}
                </Badge>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => usePowerUp("fiftyFifty")}
                disabled={gameState.powerUps.fiftyFifty <= 0}
                className="flex flex-col items-center gap-1 h-16"
              >
                <Target className="h-4 w-4" />
                <span className="text-xs">50/50</span>
                <Badge variant="secondary" className="text-xs">
                  {gameState.powerUps.fiftyFifty}
                </Badge>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => usePowerUp("doublePoints")}
                disabled={gameState.powerUps.doublePoints <= 0 || gameState.streak < 3}
                className="flex flex-col items-center gap-1 h-16"
              >
                <Gem className="h-4 w-4" />
                <span className="text-xs">نقاط مضاعفة</span>
                <Badge variant="secondary" className="text-xs">
                  {gameState.powerUps.doublePoints}
                </Badge>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Game Area */}
      <Card className="bg-white/95 backdrop-blur-sm border-2 border-amber-200 shadow-xl">
        <CardContent className="p-6">
          {!isPlaying ? (
            <div className="text-center space-y-6">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white mx-auto">
                <Gamepad2 className="h-12 w-12" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-purple-800 mb-2">اختبار علم المصريات التفاعلي</h2>
                <p className="text-purple-600 text-lg">اختبر معرفتك بالحضارة المصرية القديمة!</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Brain className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="font-semibold text-blue-800">أسئلة متنوعة</div>
                  <div className="text-sm text-blue-600">هيروغليفية، تاريخ، آثار</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
                  <div className="font-semibold text-green-800">نظام نقاط</div>
                  <div className="text-sm text-green-600">اكسب نقاط وإنجازات</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Magic className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="font-semibold text-purple-800">قوى خاصة</div>
                  <div className="text-sm text-purple-600">استخدم المساعدات</div>
                </div>
              </div>

              <Button
                onClick={startGame}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-xl"
              >
                <Play className="h-6 w-6 ml-2" />
                ابدأ اللعبة
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Question */}
              <div className="text-center">
                <div className="mb-4">
                  <Progress value={((gameState.currentQuestion + 1) / quizQuestions.length) * 100} className="h-3" />
                </div>
                <h2 className="text-2xl font-bold text-amber-800 mb-4">{currentQuestion?.question}</h2>

                {currentQuestion?.type === "hieroglyph-translation" && <div className="text-6xl mb-4">𓋹</div>}
              </div>

              {/* Timer */}
              <div className="text-center">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    gameState.timeRemaining <= 10 ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                  }`}
                >
                  <Clock className="h-5 w-5" />
                  <span className="font-bold">{gameState.timeRemaining} ثانية</span>
                </div>
              </div>

              {/* Answer Options */}
              {currentQuestion?.type === "multiple-choice" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options?.map((option, index) => (
                    <Button
                      key={index}
                      variant={selectedAnswer === option ? "default" : "outline"}
                      onClick={() => handleAnswer(option)}
                      disabled={showExplanation}
                      className={`p-6 text-lg h-auto ${
                        showExplanation
                          ? option === currentQuestion.correctAnswer
                            ? "bg-green-500 text-white border-green-500"
                            : selectedAnswer === option
                              ? "bg-red-500 text-white border-red-500"
                              : ""
                          : selectedAnswer === option
                            ? "bg-amber-500 text-white"
                            : "hover:bg-amber-50"
                      }`}
                    >
                      {option}
                      {showExplanation && option === currentQuestion.correctAnswer && (
                        <CheckCircle className="h-5 w-5 mr-2" />
                      )}
                      {showExplanation && selectedAnswer === option && option !== currentQuestion.correctAnswer && (
                        <XCircle className="h-5 w-5 mr-2" />
                      )}
                    </Button>
                  ))}
                </div>
              )}

              {currentQuestion?.type === "true-false" && (
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                  <Button
                    variant={selectedAnswer === "صحيح" ? "default" : "outline"}
                    onClick={() => handleAnswer("صحيح")}
                    disabled={showExplanation}
                    className={`p-6 text-lg h-auto ${
                      showExplanation
                        ? "صحيح" === currentQuestion.correctAnswer
                          ? "bg-green-500 text-white"
                          : selectedAnswer === "صحيح"
                            ? "bg-red-500 text-white"
                            : ""
                        : selectedAnswer === "صحيح"
                          ? "bg-amber-500 text-white"
                          : "hover:bg-amber-50"
                    }`}
                  >
                    ✓ صحيح
                  </Button>
                  <Button
                    variant={selectedAnswer === "خطأ" ? "default" : "outline"}
                    onClick={() => handleAnswer("خطأ")}
                    disabled={showExplanation}
                    className={`p-6 text-lg h-auto ${
                      showExplanation
                        ? "خطأ" === currentQuestion.correctAnswer
                          ? "bg-green-500 text-white"
                          : selectedAnswer === "خطأ"
                            ? "bg-red-500 text-white"
                            : ""
                        : selectedAnswer === "خطأ"
                          ? "bg-amber-500 text-white"
                          : "hover:bg-amber-50"
                    }`}
                  >
                    ✗ خطأ
                  </Button>
                </div>
              )}

              {currentQuestion?.type === "fill-blank" && (
                <div className="max-w-md mx-auto">
                  <Input
                    placeholder="اكتب إجابتك هنا..."
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    disabled={showExplanation}
                    className="text-center text-lg p-4"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleAnswer(selectedAnswer)
                      }
                    }}
                  />
                  {!showExplanation && (
                    <Button
                      onClick={() => handleAnswer(selectedAnswer)}
                      disabled={!selectedAnswer.trim()}
                      className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-white"
                    >
                      تأكيد الإجابة
                    </Button>
                  )}
                </div>
              )}

              {/* Explanation */}
              {showExplanation && (
                <Card
                  className={`border-2 ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? "border-green-300 bg-green-50"
                      : "border-red-300 bg-red-50"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      {selectedAnswer === currentQuestion.correctAnswer ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                      <span
                        className={`font-bold ${
                          selectedAnswer === currentQuestion.correctAnswer ? "text-green-800" : "text-red-800"
                        }`}
                      >
                        {selectedAnswer === currentQuestion.correctAnswer ? "إجابة صحيحة!" : "إجابة خاطئة"}
                      </span>
                    </div>
                    <p className="text-gray-700">{currentQuestion.explanation}</p>
                    {selectedAnswer === currentQuestion.correctAnswer && (
                      <div className="mt-3 flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">+{currentQuestion.points} نقطة</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievements Popup */}
      {gameState.achievements.length > 0 && (
        <Card className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              إنجازات جديدة!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {gameState.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <Award className="h-6 w-6 text-yellow-600" />
                  <span className="font-medium text-yellow-800">{achievement}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
