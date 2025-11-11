"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Users,
  ArrowLeft,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
  Award,
  Crown,
  Star,
  Eye,
  ThumbsUp,
  Filter,
  Send,
  ImageIcon,
  Video,
  Bookmark,
  Flag,
} from "lucide-react"
import Link from "next/link"

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [newPost, setNewPost] = useState("")

  const categories = [
    { id: "all", name: "الكل", count: 1247 },
    { id: "discussions", name: "مناقشات", count: 456 },
    { id: "discoveries", name: "اكتشافات", count: 234 },
    { id: "questions", name: "أسئلة", count: 345 },
    { id: "photos", name: "صور", count: 123 },
    { id: "videos", name: "فيديوهات", count: 89 },
  ]

  const posts = [
    {
      id: "1",
      author: {
        name: "د. سارة أحمد",
        avatar: "/placeholder.svg?height=50&width=50&text=Dr.+Sarah",
        title: "خبيرة علم المصريات",
        verified: true,
        level: "خبير",
      },
      content:
        "اكتشاف مذهل جديد في سقارة! تم العثور على مقبرة تعود للدولة القديمة تحتوي على نقوش هيروغليفية نادرة تصف طقوس دينية لم نرها من قبل. هذا الاكتشاف قد يغير فهمنا للديانة المصرية القديمة.",
      image: "/placeholder.svg?height=300&width=500&text=اكتشاف+سقارة",
      category: "discoveries",
      timestamp: "منذ ساعتين",
      likes: 234,
      comments: 67,
      shares: 23,
      isPopular: true,
      tags: ["اكتشاف", "سقارة", "هيروغليفية", "دين"],
    },
    {
      id: "2",
      author: {
        name: "أحمد محمد",
        avatar: "/placeholder.svg?height=50&width=50&text=Ahmed",
        title: "طالب آثار",
        verified: false,
        level: "متحمس",
      },
      content:
        "سؤال للخبراء: ما هو الفرق بين الكتابة الهيروغليفية والهيراطيقية؟ أحاول فهم تطور الكتابة المصرية القديمة وأحتاج توضيحاً من المتخصصين.",
      category: "questions",
      timestamp: "منذ 4 ساعات",
      likes: 45,
      comments: 23,
      shares: 8,
      isPopular: false,
      tags: ["سؤال", "هيروغليفية", "هيراطيقية", "كتابة"],
    },
    {
      id: "3",
      author: {
        name: "فاطمة حسن",
        avatar: "/placeholder.svg?height=50&width=50&text=Fatima",
        title: "مرشدة سياحية",
        verified: true,
        level: "محترف",
      },
      content:
        "شاركت اليوم مع مجموعة من السياح الأجانب في جولة بمعبد الكرنك. كانت تجربة رائعة رؤية إعجابهم بعظمة الحضارة المصرية. إليكم بعض الصور من الجولة!",
      image: "/placeholder.svg?height=300&width=500&text=معبد+الكرنك+جولة",
      category: "photos",
      timestamp: "منذ 6 ساعات",
      likes: 156,
      comments: 34,
      shares: 19,
      isPopular: true,
      tags: ["معبد الكرنك", "سياحة", "جولة", "صور"],
    },
    {
      id: "4",
      author: {
        name: "د. محمود علي",
        avatar: "/placeholder.svg?height=50&width=50&text=Dr.+Mahmoud",
        title: "أستاذ التاريخ المصري القديم",
        verified: true,
        level: "خبير",
      },
      content:
        "مناقشة: هل تعتقدون أن الأهرامات بُنيت بتقنيات متقدمة لم نكتشفها بعد؟ أم أن الحلول كانت بسيطة لكن عبقرية؟ أريد سماع آرائكم المختلفة حول هذا الموضوع الشائك.",
      category: "discussions",
      timestamp: "منذ 8 ساعات",
      likes: 89,
      comments: 45,
      shares: 12,
      isPopular: false,
      tags: ["أهرامات", "تقنيات", "مناقشة", "بناء"],
    },
    {
      id: "5",
      author: {
        name: "نادية سالم",
        avatar: "/placeholder.svg?height=60&width=60&text=Nadia",
        title: "مصورة آثار",
        verified: false,
        level: "متحمس",
      },
      content:
        "فيديو جديد من تصويري لشروق الشمس على معبد أبو سمبل. اللحظة السحرية عندما تضيء أشعة الشمس وجه رمسيس الثاني. تجربة لا تُنسى!",
      video: "/placeholder.svg?height=300&width=500&text=فيديو+أبو+سمبل",
      category: "videos",
      timestamp: "منذ 12 ساعة",
      likes: 267,
      comments: 78,
      shares: 45,
      isPopular: true,
      tags: ["أبو سمبل", "شروق", "فيديو", "رمسيس"],
    },
  ]

  const topMembers = [
    {
      name: "د. زاهي حواس",
      avatar: "/placeholder.svg?height=60&width=60&text=Dr.+Hawass",
      title: "عالم آثار مصرية",
      posts: 234,
      followers: 15420,
      level: "أسطورة",
    },
    {
      name: "د. سليم حسن",
      avatar: "/placeholder.svg?height=60&width=60&text=Dr.+Hassan",
      title: "خبير هيروغليفية",
      posts: 189,
      followers: 8934,
      level: "خبير",
    },
    {
      name: "أ. مريم أحمد",
      avatar: "/placeholder.svg?height=60&width=60&text=Mariam",
      title: "باحثة آثار",
      posts: 156,
      followers: 5678,
      level: "محترف",
    },
  ]

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.content.includes(searchQuery) || post.author.name.includes(searchQuery)
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log("Liked post:", postId)
  }

  const handleComment = (postId: string) => {
    // Handle comment functionality
    console.log("Comment on post:", postId)
  }

  const handleShare = (postId: string) => {
    // Handle share functionality
    console.log("Shared post:", postId)
  }

  const handleNewPost = () => {
    if (newPost.trim()) {
      // Handle new post creation
      console.log("New post:", newPost)
      setNewPost("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 text-white shadow-2xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <ArrowLeft className="h-6 w-6" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">👥 المجتمع</h1>
                  <p className="text-purple-100">تفاعل مع محبي علم المصريات</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-white/20 text-white border-white/30">15,420 عضو</Badge>
              <Badge className="bg-white/20 text-white border-white/30">2,847 نشط</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Create Post */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src="/placeholder.svg?height=50&width=50&text=You" />
                    <AvatarFallback>أنت</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Textarea
                      placeholder="شارك معرفتك أو اطرح سؤالاً..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      className="border-2 border-purple-300 focus:border-purple-500 resize-none"
                      rows={3}
                    />
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-purple-300 bg-transparent">
                          <ImageIcon className="h-4 w-4 mr-1" />
                          صورة
                        </Button>
                        <Button variant="outline" size="sm" className="border-purple-300 bg-transparent">
                          <Video className="h-4 w-4 mr-1" />
                          فيديو
                        </Button>
                      </div>
                      <Button
                        onClick={handleNewPost}
                        className="bg-purple-500 hover:bg-purple-600 text-white"
                        disabled={!newPost.trim()}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        نشر
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Search and Filters */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-500" />
                    <Input
                      placeholder="ابحث في المنشورات..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pr-10 border-2 border-purple-300 focus:border-purple-500"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-2 border-purple-300 bg-transparent">
                      <Filter className="h-4 w-4 mr-2" />
                      فلترة
                    </Button>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`${
                        selectedCategory === category.id
                          ? "bg-purple-500 text-white"
                          : "border-purple-300 text-purple-700 hover:bg-purple-50"
                      }`}
                    >
                      {category.name}
                      <Badge variant="secondary" className="ml-2">
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white/95 backdrop-blur-sm border-2 border-purple-200 hover:border-purple-400 shadow-xl transition-all duration-300"
                >
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-purple-800">{post.author.name}</h3>
                            {post.author.verified && <Badge className="bg-blue-500 text-white text-xs">✓ موثق</Badge>}
                            <Badge variant="secondary" className="text-xs">
                              {post.author.level}
                            </Badge>
                          </div>
                          <p className="text-sm text-purple-600">{post.author.title}</p>
                          <p className="text-xs text-purple-500">{post.timestamp}</p>
                        </div>
                      </div>
                      {post.isPopular && (
                        <Badge className="bg-orange-500 text-white">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          شائع
                        </Badge>
                      )}
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-purple-800 leading-relaxed mb-3">{post.content}</p>

                      {post.image && (
                        <div className="relative rounded-lg overflow-hidden mb-3">
                          <img
                            src={post.image || "/placeholder.svg"}
                            alt="Post image"
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {post.video && (
                        <div className="relative rounded-lg overflow-hidden mb-3 bg-black">
                          <img
                            src={post.video || "/placeholder.svg"}
                            alt="Video thumbnail"
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Button size="icon" className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                              <Video className="h-8 w-8" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-purple-300 text-purple-700">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-purple-200">
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLike(post.id)}
                          className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                        >
                          <Heart className="h-4 w-4 mr-1" />
                          {post.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleComment(post.id)}
                          className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShare(post.id)}
                          className="text-purple-600 hover:text-purple-800 hover:bg-purple-50"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          {post.shares}
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="text-purple-600 hover:text-purple-800">
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-purple-600 hover:text-purple-800">
                          <Flag className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Members */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  أعضاء مميزون
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-purple-800 text-sm">{member.name}</h4>
                        <Badge className="bg-purple-500 text-white text-xs">{member.level}</Badge>
                      </div>
                      <p className="text-xs text-purple-600">{member.title}</p>
                      <div className="flex items-center gap-3 text-xs text-purple-500 mt-1">
                        <span>{member.posts} منشور</span>
                        <span>{member.followers.toLocaleString()} متابع</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card className="bg-gradient-to-br from-purple-100 to-violet-100 border-2 border-purple-300 shadow-xl">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  إحصائيات المجتمع
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-800">15,420</div>
                  <div className="text-sm text-purple-600">إجمالي الأعضاء</div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-800">2,847</div>
                  <div className="text-sm text-purple-600">نشط اليوم</div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-800">1,247</div>
                  <div className="text-sm text-purple-600">منشور هذا الأسبوع</div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-purple-200 shadow-xl">
              <CardHeader>
                <CardTitle className="text-purple-800 flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  روابط سريعة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-purple-700 hover:bg-purple-50">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  المنشورات الشائعة
                </Button>
                <Button variant="ghost" className="w-full justify-start text-purple-700 hover:bg-purple-50">
                  <Eye className="h-4 w-4 mr-2" />
                  الأكثر مشاهدة
                </Button>
                <Button variant="ghost" className="w-full justify-start text-purple-700 hover:bg-purple-50">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  الأعلى تقييماً
                </Button>
                <Button variant="ghost" className="w-full justify-start text-purple-700 hover:bg-purple-50">
                  <Bookmark className="h-4 w-4 mr-2" />
                  المحفوظات
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
