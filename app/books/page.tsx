"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Library, BookOpen, Download, Star, Search, Filter, Eye, Heart, Share2, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("الكل")
  const [favorites, setFavorites] = useState<number[]>([])

  const categories = ["الكل", "التاريخ", "الآثار", "اللغة", "الديانة", "الفن", "العمارة", "الحياة اليومية"]

  const books = [
    {
      id: 1,
      title: "كتاب الموتى المصري",
      author: "والاس بدج",
      description: "النصوص الجنائزية المصرية القديمة الكاملة",
      category: "الديانة",
      pages: 456,
      rating: 4.8,
      downloads: 15420,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2020,
    },
    {
      id: 2,
      title: "الحضارة المصرية القديمة",
      author: "سليم حسن",
      description: "موسوعة شاملة عن تاريخ مصر القديمة",
      category: "التاريخ",
      pages: 892,
      rating: 4.9,
      downloads: 23150,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2019,
    },
    {
      id: 3,
      title: "اللغة المصرية القديمة",
      author: "عبد الحليم نور الدين",
      description: "دراسة شاملة للهيروغليفية والديموطيقية",
      category: "اللغة",
      pages: 624,
      rating: 4.7,
      downloads: 12890,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2021,
    },
    {
      id: 4,
      title: "معابد الكرنك",
      author: "زاهي حواس",
      description: "دراسة معمارية وأثرية لمعابد الكرنك",
      category: "العمارة",
      pages: 512,
      rating: 4.6,
      downloads: 9870,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2022,
    },
    {
      id: 5,
      title: "الفن المصري القديم",
      author: "محمد صالح",
      description: "تطور الفن والنحت في مصر القديمة",
      category: "الفن",
      pages: 438,
      rating: 4.5,
      downloads: 8650,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2020,
    },
    {
      id: 6,
      title: "الحياة اليومية في مصر القديمة",
      author: "أحمد فخري",
      description: "كيف عاش المصريون القدماء",
      category: "الحياة اليومية",
      pages: 368,
      rating: 4.7,
      downloads: 11240,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2021,
    },
    {
      id: 7,
      title: "أسرار الأهرامات",
      author: "مارك لينر",
      description: "دراسة علمية لبناء الأهرامات",
      category: "الآثار",
      pages: 576,
      rating: 4.8,
      downloads: 18920,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2022,
    },
    {
      id: 8,
      title: "الآلهة المصرية",
      author: "ريتشارد ويلكنسون",
      description: "موسوعة الآلهة والمعبودات المصرية",
      category: "الديانة",
      pages: 724,
      rating: 4.9,
      downloads: 16780,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2020,
    },
    {
      id: 9,
      title: "توت عنخ آمون",
      author: "هوارد كارتر",
      description: "اكتشاف مقبرة الملك الذهبي",
      category: "التاريخ",
      pages: 412,
      rating: 4.9,
      downloads: 21340,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2021,
    },
    {
      id: 10,
      title: "الطب في مصر القديمة",
      author: "جون نن",
      description: "العلوم الطبية والصيدلانية عند الفراعنة",
      category: "الحياة اليومية",
      pages: 328,
      rating: 4.6,
      downloads: 7890,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2020,
    },
    {
      id: 11,
      title: "نفرتيتي والعمارنة",
      author: "سيريل ألدريد",
      description: "عصر إخناتون والثورة الدينية",
      category: "التاريخ",
      pages: 496,
      rating: 4.7,
      downloads: 13560,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2022,
    },
    {
      id: 12,
      title: "وادي الملوك",
      author: "كينت ويكس",
      description: "استكشاف مقابر الفراعنة في الأقصر",
      category: "الآثار",
      pages: 544,
      rating: 4.8,
      downloads: 14720,
      cover: "/placeholder.svg?height=300&width=200",
      language: "عربي",
      year: 2021,
    },
  ]

  const toggleFavorite = (bookId: number) => {
    setFavorites((prev) => (prev.includes(bookId) ? prev.filter((id) => id !== bookId) : [...prev, bookId]))
  }

  const filteredBooks = selectedCategory === "الكل" ? books : books.filter((book) => book.category === selectedCategory)

  const searchedBooks = filteredBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <header className="bg-slate-800/90 backdrop-blur-xl text-white shadow-2xl border-b border-cyan-500/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="text-cyan-300 hover:text-cyan-100">
                ← العودة للرئيسية
              </Button>
            </Link>
            <div className="text-center">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent flex items-center gap-3 justify-center">
                <Library className="h-8 w-8 text-amber-400" />
                مكتبة الكتب الفرعونية
              </h1>
              <p className="text-cyan-300 mt-2">مكتبة شاملة من الكتب عن الحضارة المصرية القديمة</p>
            </div>
            <div className="w-32" />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-slate-800/50 backdrop-blur-xl border border-amber-500/30">
            <CardContent className="p-4 text-center">
              <Library className="h-8 w-8 text-amber-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-amber-100">{books.length}</p>
              <p className="text-sm text-cyan-300">كتاب متاح</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 backdrop-blur-xl border border-cyan-500/30">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-cyan-100">
                {books.reduce((sum, book) => sum + book.downloads, 0).toLocaleString()}
              </p>
              <p className="text-sm text-cyan-300">تحميل</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 backdrop-blur-xl border border-purple-500/30">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-purple-100">
                {(books.reduce((sum, book) => sum + book.rating, 0) / books.length).toFixed(1)}
              </p>
              <p className="text-sm text-cyan-300">متوسط التقييم</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-800/50 backdrop-blur-xl border border-pink-500/30">
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-pink-100">{favorites.length}</p>
              <p className="text-sm text-cyan-300">المفضلة</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-800/50 backdrop-blur-xl border border-cyan-500/30">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400" />
                <Input
                  placeholder="ابحث عن كتاب..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-12 bg-slate-900/50 border border-cyan-500/30 text-cyan-100"
                />
              </div>
              <Button className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white">
                <Filter className="h-5 w-5 mr-2" />
                تصفية
              </Button>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-amber-600 to-yellow-600 text-white"
                      : "border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {searchedBooks.map((book) => (
            <Card
              key={book.id}
              className="group hover:shadow-2xl hover:shadow-amber-500/25 transition-all duration-500 bg-slate-800/50 backdrop-blur-xl border border-cyan-500/30 hover:border-amber-500/50 hover:-translate-y-2"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={book.cover || "/placeholder.svg"}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-amber-500/90 text-white border-0">{book.category}</Badge>
                  </div>
                  <div className="absolute top-2 left-2 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => toggleFavorite(book.id)}
                      className={`${
                        favorites.includes(book.id)
                          ? "bg-pink-500/90 hover:bg-pink-600"
                          : "bg-slate-900/80 hover:bg-slate-900"
                      } text-white h-8 w-8 p-0 transition-all`}
                    >
                      <Heart className={`h-4 w-4 ${favorites.includes(book.id) ? "fill-white" : ""}`} />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-slate-900/80 hover:bg-slate-900 text-white h-8 w-8 p-0"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-cyan-100 mb-1 line-clamp-1">{book.title}</h3>
                    <p className="text-sm text-amber-300">{book.author}</p>
                  </div>

                  <p className="text-sm text-cyan-300/80 line-clamp-2">{book.description}</p>

                  <div className="flex items-center justify-between text-xs text-cyan-400">
                    <span>{book.pages} صفحة</span>
                    <span>{book.year}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-cyan-100">{book.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-cyan-400">
                      <Download className="h-4 w-4" />
                      <span className="text-xs">{book.downloads.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white">
                      <Eye className="h-4 w-4 mr-2" />
                      قراءة
                    </Button>
                    <Button className="flex-1 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
                      <Download className="h-4 w-4 mr-2" />
                      تحميل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {searchedBooks.length === 0 && (
          <Card className="bg-slate-800/50 backdrop-blur-xl border border-cyan-500/30">
            <CardContent className="p-12 text-center">
              <BookOpen className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-cyan-100 mb-2">لا توجد نتائج</h3>
              <p className="text-cyan-300">جرب البحث بكلمات مختلفة أو اختر تصنيف آخر</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
