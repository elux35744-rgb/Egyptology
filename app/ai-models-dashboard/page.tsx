"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Video,
  Heart,
  Target,
  Scroll,
  Zap,
  Cpu,
  Activity,
  Settings,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Database,
  Monitor,
  Gauge,
} from "lucide-react"

interface AIModel {
  id: string
  name: string
  version: string
  type: string
  architecture: string
  parameters: string
  accuracy: number
  status: "active" | "training" | "idle" | "error"
  lastTraining: string | null
  performance: {
    accuracy: number
    efficiency: number
    speed: number
    quality: number
  }
  icon: any
  color: string
}

export default function AIModelsDashboard() {
  const [models, setModels] = useState<AIModel[]>([
    {
      id: "conversation-ai",
      name: "نموذج المحادثة المتقدم",
      version: "3.0",
      type: "language_model",
      architecture: "Transformer",
      parameters: "175B",
      accuracy: 97,
      status: "active",
      lastTraining: "2024-01-15",
      performance: {
        accuracy: 97,
        efficiency: 94,
        speed: 92,
        quality: 96,
      },
      icon: Brain,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "video-generation-ai",
      name: "نموذج إنشاء الفيديو",
      version: "2.5",
      type: "generative_model",
      architecture: "Diffusion-GAN-Transformer",
      parameters: "45B",
      accuracy: 95,
      status: "active",
      lastTraining: "2024-01-14",
      performance: {
        accuracy: 95,
        efficiency: 91,
        speed: 88,
        quality: 98,
      },
      icon: Video,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "emotion-detection",
      name: "نموذج كشف المشاعر",
      version: "1.8",
      type: "classification_model",
      architecture: "Multimodal Emotion Transformer",
      parameters: "2.1B",
      accuracy: 93,
      status: "training",
      lastTraining: "2024-01-16",
      performance: {
        accuracy: 93,
        efficiency: 89,
        speed: 95,
        quality: 91,
      },
      icon: Heart,
      color: "from-red-500 to-orange-500",
    },
    {
      id: "personalization-engine",
      name: "محرك التخصيص الذكي",
      version: "2.2",
      type: "recommendation_model",
      architecture: "Deep Reinforcement Learning",
      parameters: "1.8B",
      accuracy: 89,
      status: "active",
      lastTraining: "2024-01-13",
      performance: {
        accuracy: 89,
        efficiency: 92,
        speed: 94,
        quality: 87,
      },
      icon: Target,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "hieroglyph-master",
      name: "خبير الهيروغليفية",
      version: "3.1",
      type: "vision_language_model",
      architecture: "Vision-Language Transformer",
      parameters: "8.5B",
      accuracy: 96,
      status: "active",
      lastTraining: "2024-01-15",
      performance: {
        accuracy: 96,
        efficiency: 93,
        speed: 90,
        quality: 97,
      },
      icon: Scroll,
      color: "from-yellow-500 to-amber-500",
    },
    {
      id: "neural-network-trainer",
      name: "مدرب الشبكات العصبية",
      version: "4.0",
      type: "training_system",
      architecture: "Meta-Learning Framework",
      parameters: "12B",
      accuracy: 94,
      status: "idle",
      lastTraining: "2024-01-12",
      performance: {
        accuracy: 94,
        efficiency: 96,
        speed: 87,
        quality: 93,
      },
      icon: Cpu,
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: "quantum-optimizer",
      name: "محسن الذكاء الاصطناعي الكمي",
      version: "2.0",
      type: "optimization_system",
      architecture: "Quantum-Inspired Optimization",
      parameters: "5.2B",
      accuracy: 91,
      status: "active",
      lastTraining: "2024-01-16",
      performance: {
        accuracy: 91,
        efficiency: 98,
        speed: 85,
        quality: 89,
      },
      icon: Zap,
      color: "from-violet-500 to-purple-500",
    },
    {
      id: "supreme-orchestrator",
      name: "منسق الذكاء الاصطناعي الأعلى",
      version: "5.0",
      type: "orchestration_system",
      architecture: "Multi-Agent Coordination",
      parameters: "25B",
      accuracy: 98,
      status: "active",
      lastTraining: "2024-01-16",
      performance: {
        accuracy: 98,
        efficiency: 97,
        speed: 93,
        quality: 96,
      },
      icon: Activity,
      color: "from-cyan-500 to-teal-500",
    },
  ])

  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null)
  const [systemMetrics, setSystemMetrics] = useState({
    totalModels: 8,
    activeModels: 6,
    trainingModels: 1,
    averageAccuracy: 94.1,
    systemHealth: 96,
    totalParameters: "279.6B",
    dailyInferences: 1250000,
    uptime: 99.9,
  })

  const handleStartTraining = async (modelId: string) => {
    setModels((prev) => prev.map((model) => (model.id === modelId ? { ...model, status: "training" as const } : model)))

    // محاكاة عملية التدريب
    setTimeout(() => {
      setModels((prev) =>
        prev.map((model) =>
          model.id === modelId
            ? {
                ...model,
                status: "active" as const,
                accuracy: Math.min(model.accuracy + Math.random() * 2, 99),
                lastTraining: new Date().toISOString().split("T")[0],
              }
            : model,
        ),
      )
    }, 3000)
  }

  const handleStopModel = (modelId: string) => {
    setModels((prev) => prev.map((model) => (model.id === modelId ? { ...model, status: "idle" as const } : model)))
  }

  const handleRestartModel = (modelId: string) => {
    setModels((prev) => prev.map((model) => (model.id === modelId ? { ...model, status: "active" as const } : model)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "training":
        return "bg-blue-500 animate-pulse"
      case "idle":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "نشط"
      case "training":
        return "قيد التدريب"
      case "idle":
        return "خامل"
      case "error":
        return "خطأ"
      default:
        return "غير معروف"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 text-center">🧠 لوحة إدارة نماذج الذكاء الاصطناعي</h1>
          <p className="text-gray-300 text-center text-lg">إدارة شاملة لجميع نماذج الذكاء الاصطناعي المتقدمة</p>
        </div>

        {/* System Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">إجمالي النماذج</p>
                  <p className="text-2xl font-bold">{systemMetrics.totalModels}</p>
                </div>
                <Database className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">النماذج النشطة</p>
                  <p className="text-2xl font-bold">{systemMetrics.activeModels}</p>
                </div>
                <Activity className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">متوسط الدقة</p>
                  <p className="text-2xl font-bold">{systemMetrics.averageAccuracy}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-cyan-600 to-cyan-700 border-0 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100 text-sm">صحة النظام</p>
                  <p className="text-2xl font-bold">{systemMetrics.systemHealth}%</p>
                </div>
                <Gauge className="h-8 w-8 text-cyan-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-slate-700">
            <TabsTrigger value="models" className="text-white data-[state=active]:bg-slate-700">
              النماذج
            </TabsTrigger>
            <TabsTrigger value="performance" className="text-white data-[state=active]:bg-slate-700">
              الأداء
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="text-white data-[state=active]:bg-slate-700">
              المراقبة
            </TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-6">
            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {models.map((model) => {
                const IconComponent = model.icon
                return (
                  <Card
                    key={model.id}
                    className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${model.color}`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(model.status)}`} />
                          <Badge variant="secondary" className="text-xs">
                            {getStatusText(model.status)}
                          </Badge>
                        </div>
                      </div>
                      <CardTitle className="text-white text-lg">{model.name}</CardTitle>
                      <CardDescription className="text-gray-400">
                        {model.architecture} • {model.parameters} معامل
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">الدقة</span>
                          <span className="text-white font-medium">{model.accuracy}%</span>
                        </div>
                        <Progress value={model.accuracy} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="text-center p-2 bg-slate-700/50 rounded">
                          <div className="text-gray-400">الكفاءة</div>
                          <div className="text-white font-medium">{model.performance.efficiency}%</div>
                        </div>
                        <div className="text-center p-2 bg-slate-700/50 rounded">
                          <div className="text-gray-400">السرعة</div>
                          <div className="text-white font-medium">{model.performance.speed}%</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {model.status === "idle" ? (
                          <Button
                            size="sm"
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            onClick={() => handleRestartModel(model.id)}
                          >
                            <Play className="h-4 w-4 mr-1" />
                            تشغيل
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1 border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                            onClick={() => handleStopModel(model.id)}
                          >
                            <Pause className="h-4 w-4 mr-1" />
                            إيقاف
                          </Button>
                        )}

                        <Button
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleStartTraining(model.id)}
                          disabled={model.status === "training"}
                        >
                          {model.status === "training" ? (
                            <>
                              <RotateCcw className="h-4 w-4 mr-1 animate-spin" />
                              تدريب...
                            </>
                          ) : (
                            <>
                              <Brain className="h-4 w-4 mr-1" />
                              تدريب
                            </>
                          )}
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                          onClick={() => setSelectedModel(model)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>

                      {model.lastTraining && (
                        <div className="text-xs text-gray-400 text-center">آخر تدريب: {model.lastTraining}</div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {models.map((model) => (
                <Card key={model.id} className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <model.icon className="h-5 w-5" />
                      {model.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(model.performance).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400 capitalize">
                            {key === "accuracy"
                              ? "الدقة"
                              : key === "efficiency"
                                ? "الكفاءة"
                                : key === "speed"
                                  ? "السرعة"
                                  : "الجودة"}
                          </span>
                          <span className="text-white font-medium">{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">إجمالي المعاملات</p>
                      <p className="text-2xl font-bold text-white">{systemMetrics.totalParameters}</p>
                    </div>
                    <Database className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">الاستنتاجات اليومية</p>
                      <p className="text-2xl font-bold text-white">{systemMetrics.dailyInferences.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">وقت التشغيل</p>
                      <p className="text-2xl font-bold text-white">{systemMetrics.uptime}%</p>
                    </div>
                    <Monitor className="h-8 w-8 text-cyan-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">النماذج قيد التدريب</p>
                      <p className="text-2xl font-bold text-white">{systemMetrics.trainingModels}</p>
                    </div>
                    <Brain className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Real-time Activity */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">النشاط في الوقت الفعلي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {models
                    .filter((m) => m.status === "active" || m.status === "training")
                    .map((model) => (
                      <div key={model.id} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(model.status)}`} />
                          <span className="text-white">{model.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {model.accuracy}% دقة
                          </Badge>
                          <span className="text-gray-400 text-sm">{getStatusText(model.status)}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Model Details Modal */}
        {selectedModel && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="bg-slate-800 border-slate-700 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <selectedModel.icon className="h-6 w-6" />
                    {selectedModel.name}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedModel(null)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400 text-sm">الإصدار</p>
                    <p className="text-white font-medium">{selectedModel.version}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">النوع</p>
                    <p className="text-white font-medium">{selectedModel.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">المعمارية</p>
                    <p className="text-white font-medium">{selectedModel.architecture}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">المعاملات</p>
                    <p className="text-white font-medium">{selectedModel.parameters}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-white font-semibold">مقاييس الأداء</h3>
                  {Object.entries(selectedModel.performance).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 capitalize">
                          {key === "accuracy"
                            ? "الدقة"
                            : key === "efficiency"
                              ? "الكفاءة"
                              : key === "speed"
                                ? "السرعة"
                                : "الجودة"}
                        </span>
                        <span className="text-white font-medium">{value}%</span>
                      </div>
                      <Progress value={value} className="h-3" />
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      handleStartTraining(selectedModel.id)
                      setSelectedModel(null)
                    }}
                  >
                    بدء التدريب
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 text-white hover:bg-slate-700 bg-transparent"
                    onClick={() => setSelectedModel(null)}
                  >
                    إغلاق
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
