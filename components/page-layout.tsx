import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Crown } from "lucide-react"
import Link from "next/link"

interface PageLayoutProps {
  children: ReactNode
  title: string
  description?: string
  icon?: ReactNode
  badge?: string
  backHref?: string
  headerActions?: ReactNode
}

export default function PageLayout({
  children,
  title,
  description,
  icon,
  badge,
  backHref = "/",
  headerActions,
}: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      {/* Unified Header */}
      <header className="bg-slate-800/90 backdrop-blur-xl text-white shadow-2xl border-b border-cyan-500/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link href={backHref}>
              <Button variant="ghost" className="text-cyan-300 hover:text-cyan-100 hover:bg-cyan-500/20">
                <ArrowLeft className="h-5 w-5 mr-2" />
                العودة
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <Link href="/">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer">
                  🏺 علم المصريات
                </h1>
              </Link>
            </div>
            {headerActions && <div>{headerActions}</div>}
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-2">
              {icon && (
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 backdrop-blur-xl border border-cyan-500/30 rounded-xl flex items-center justify-center text-cyan-400">
                  {icon}
                </div>
              )}
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {title}
                </h2>
                {description && <p className="text-cyan-300 text-lg mt-1">{description}</p>}
              </div>
              {badge && (
                <Badge className="bg-gradient-to-r from-emerald-600/80 to-teal-600/80 text-white px-4 py-2">
                  {badge}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
