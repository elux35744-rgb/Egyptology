"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Send, Mic, Camera, Settings } from "lucide-react"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface Avatar {
  id: string
  name: string
  image: string
  voice: string
  greeting: string
}

const avatars: Avatar[] = [
  {
    id: "thoth",
    name: "تحوت - إله الحكمة",
    image: "/placeholder.svg?height=200&width=200",
    voice: "male",
    greeting: "أهلاً وسهلاً بك، أنا تحوت إله الحكمة والكتابة. سأساعدك في رحلتك لاستكشاف أسرار مصر القديمة.",
  },
  {
    id: "isis",
    name: "إيزيس - إلهة السحر",
    image: "/placeholder.svg?height=200&width=200",
    voice: "female",
    greeting: "مرحباً بك يا صديقي، أنا إيزيس إلهة السحر والحماية. دعني أرشدك عبر عجائب الحضارة المصرية.",
  },
  {
    id: "anubis",
    name: "أنوبيس - حارس الموتى",
    image: "/placeholder.svg?height=200&width=200",
    voice: "male",
    greeting: "السلام عليك، أنا أنوبيس حارس العالم الآخر. سأكشف لك أسرار المومياوات والحياة الأبدية.",
  },
  {
    id: "hathor",
    name: "حتحور - إلهة الحب",
    image: "/placeholder.svg?height=200&width=200",
    voice: "female",
    greeting: "أهلاً بك حبيبي، أنا حتحور إلهة الحب والجمال. سأشاركك قصص الحب والفن في مصر القديمة.",
  },
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState<Avatar>(avatars[0])
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)
  const [hasGreeted, setHasGreeted] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasGreeted) {
      const timer = setTimeout(() => {
        const welcomeMessage: Message = {
          id: Date.now().toString(),
          content: selectedAvatar.greeting,
          isUser: false,
          timestamp: new Date(),
        }
        setMessages([welcomeMessage])

        // تشغيل الصوت إذا كان متاحاً
        if ("speechSynthesis" in window) {
          const utterance = new SpeechSynthesisUtterance(selectedAvatar.greeting)
          utterance.lang = "ar-SA"
          utterance.rate = 0.8
          speechSynthesis.speak(utterance)
        }

        setHasGreeted(true)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [selectedAvatar, hasGreeted])

  const handleAvatarChange = (avatar: Avatar) => {
    setSelectedAvatar(avatar)
    setShowAvatarSelector(false)

    const changeMessage: Message = {
      id: Date.now().toString(),
      content: avatar.greeting,
      isUser: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, changeMessage])

    // تشغيل الصوت
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(avatar.greeting)
      utterance.lang = "ar-SA"
      utterance.rate = 0.8
      speechSynthesis.speak(utterance)
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // محاكاة استجابة الذكاء الاصطناعي
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue)
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)

      // تشغيل الاستجابة صوتياً
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(aiResponse)
        utterance.lang = "ar-SA"
        utterance.rate = 0.8
        speechSynthesis.speak(utterance)
      }
    }, 2000)
  }

  const generateAIResponse = (question: string): string => {
    const responses = [
      `${selectedAvatar.name} يجيب: هذا سؤال رائع! في الحضارة المصرية القديمة، كان هذا الموضوع مهماً جداً...`,
      `بحكمة ${selectedAvatar.name}: دعني أشرح لك هذا الأمر بالتفصيل من منظور مصري قديم...`,
      `${selectedAvatar.name} يقول: هذا يذكرني بقصة من التاريخ المصري العريق...`,
      `بمعرفة ${selectedAvatar.name}: سأوضح لك هذا الأمر كما فهمه المصريون القدماء...`,
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleVoiceRecording = () => {
    setIsRecording(!isRecording)
    // هنا يمكن إضافة منطق التسجيل الصوتي الفعلي
  }

  const handleMediaUpload = () => {
    // هنا يمكن إضافة منطق رفع الوسائط
    document.getElementById("media-upload")?.click()
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-6">
          <div className="relative inline-block">
            <button onClick={() => setShowAvatarSelector(!showAvatarSelector)} className="relative group">
              <img
                src={selectedAvatar.image || "/placeholder.svg"}
                alt={selectedAvatar.name}
                className="w-32 h-32 rounded-full border-4 border-yellow-400 shadow-2xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-2 shadow-lg">
                <Settings className="w-4 h-4" />
              </div>
            </button>

            {showAvatarSelector && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-2xl z-10">
                <h3 className="text-lg font-semibold mb-4 text-center">اختر مرشدك</h3>
                <div className="grid grid-cols-2 gap-4">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => handleAvatarChange(avatar)}
                      className="flex flex-col items-center p-3 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <img
                        src={avatar.image || "/placeholder.svg"}
                        alt={avatar.name}
                        className="w-16 h-16 rounded-full border-2 border-yellow-400 mb-2"
                      />
                      <span className="text-sm text-center">{avatar.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {selectedAvatar.name}
          </h1>
          <p className="text-blue-200">مرشدك الشخصي في رحلة اكتشاف مصر القديمة</p>
        </div>

        <Card className="bg-white/5 backdrop-blur-lg border-white/10 shadow-2xl">
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    msg.isUser ? "bg-blue-600 text-white" : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-white/10">
            <div className="flex items-center gap-3">
              {/* زر الوسائط على اليمين */}
              <button
                onClick={handleMediaUpload}
                className="bg-purple-600 hover:bg-purple-700 p-3 rounded-full transition-colors shadow-lg"
              >
                <Camera className="w-5 h-5" />
              </button>

              <button
                onClick={handleVoiceRecording}
                className={`p-3 rounded-full transition-colors shadow-lg ${
                  isRecording ? "bg-red-600 hover:bg-red-700 animate-pulse" : "bg-green-600 hover:bg-green-700"
                }`}
              >
                <Mic className="w-5 h-5" />
              </button>

              {/* صندوق النص المستطيل */}
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="اسأل مرشدك عن أسرار مصر القديمة..."
                className="flex-1 bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* سهم الإرسال على الشمال */}
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 p-3 rounded-full transition-colors shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </Card>

        {/* إدخال مخفي للوسائط */}
        <input
          type="file"
          id="media-upload"
          accept="image/*,audio/*,video/*"
          className="hidden"
          onChange={(e) => {
            // منطق معالجة الملفات
            console.log("File selected:", e.target.files?.[0])
          }}
        />
      </div>
    </div>
  )
}
