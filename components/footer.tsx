"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Mail,
  Phone,
  MapPin,
  Shield,
  FileText,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Coins,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-purple-500/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* App Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">علم المصريات</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              منصة تعليمية تفاعلية لاستكشاف الحضارة المصرية القديمة باستخدام أحدث تقنيات الذكاء الاصطناعي والواقع
              المعزز.
            </p>
            <div className="flex items-center gap-2 text-yellow-400">
              <Coins className="w-4 h-4" />
              <span className="text-sm">مدعوم بشبكة Pi Network</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">روابط سريعة</h4>
            <div className="space-y-2">
              <Link href="/dictionary" className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                قاموس الهيروغليفية
              </Link>
              <Link href="/videos" className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                الفيديوهات التعليمية
              </Link>
              <Link href="/places" className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                الأماكن الأثرية
              </Link>
              <Link
                href="/interactive-map"
                className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm"
              >
                الخريطة التفاعلية
              </Link>
              <Link href="/challenges" className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                التحديات والاختبارات
              </Link>
              <Link
                href="/learning-paths"
                className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm"
              >
                المسارات التعليمية
              </Link>
            </div>
          </div>

          {/* Legal & Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">الدعم والقانونية</h4>
            <div className="space-y-2">
              <Link
                href="/privacy-policy"
                className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors text-sm"
              >
                <Shield className="w-4 h-4" />
                سياسة الخصوصية
              </Link>
              <Link
                href="/terms-of-service"
                className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors text-sm"
              >
                <FileText className="w-4 h-4" />
                شروط الخدمة
              </Link>
              <Link href="/community" className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                المجتمع والدعم
              </Link>
              <Link href="/live-sessions" className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                الجلسات المباشرة
              </Link>
              <Link href="/competitions" className="block text-gray-300 hover:text-cyan-400 transition-colors text-sm">
                المسابقات
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>info@egyptology-app.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <Phone className="w-4 h-4 text-cyan-400" />
                <span>+20-XXX-XXXX</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span>القاهرة، مصر</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-2">
              <h5 className="text-sm font-medium text-white">تابعنا على</h5>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-gray-400 hover:text-cyan-400">
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-gray-400 hover:text-cyan-400">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-gray-400 hover:text-cyan-400">
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-gray-400 hover:text-cyan-400">
                  <Youtube className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-right">
              © {new Date().getFullYear()} تطبيق علم المصريات. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>الإصدار 2.0.0</span>
              <span>•</span>
              <span>مدعوم بـ Pi Network</span>
              <span>•</span>
              <span>صُنع بـ ❤️ في مصر</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
