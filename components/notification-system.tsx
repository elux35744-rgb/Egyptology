"use client"

import { useState } from "react"
import { Bell, Gift, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  type: "success" | "info" | "reward"
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "reward",
      title: "مكافأة Pi جديدة!",
      message: "لقد حصلت على 50 Pi لإكمال التحدي اليومي",
      timestamp: new Date(),
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "جلسة مباشرة جديدة",
      message: 'انضم إلى جلسة "أسرار الأهرامات" غداً الساعة 8 مساءً',
      timestamp: new Date(Date.now() - 3600000),
      read: false,
    },
  ])

  const [showNotifications, setShowNotifications] = useState(false)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "reward":
        return <Gift className="h-5 w-5 text-yellow-400" />
      case "success":
        return <Star className="h-5 w-5 text-green-400" />
      default:
        return <Zap className="h-5 w-5 text-cyan-400" />
    }
  }

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" onClick={() => setShowNotifications(!showNotifications)} className="relative">
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </Button>

      {showNotifications && (
        <div className="absolute left-0 top-full mt-2 w-80 bg-gradient-to-br from-slate-900 to-purple-900 rounded-xl border border-cyan-500/20 shadow-2xl z-50">
          <div className="p-4 border-b border-gray-700">
            <h3 className="font-bold text-white">الإشعارات</h3>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">لا توجد إشعارات جديدة</div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700/50 hover:bg-slate-800/30 cursor-pointer ${
                    !notification.read ? "bg-cyan-500/5" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <h4 className="font-medium text-white text-sm">{notification.title}</h4>
                      <p className="text-gray-300 text-xs mt-1">{notification.message}</p>
                      <span className="text-gray-500 text-xs">
                        {notification.timestamp.toLocaleTimeString("ar-EG")}
                      </span>
                    </div>
                    {!notification.read && <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  )
}
