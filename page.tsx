"use client"

import { useEffect, useState } from "react"
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import SplashScreen from "../components/ui/splash-screen";


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showSplash, setShowSplash] = useState(true)

  // نمونه دسته‌بندی‌های غذا
  const categories = ["غذای اصلی", "پیش غذا", "دسر", "نوشیدنی"]

  // نمونه غذاهای ویژه
  const featuredItems = [
    {
      id: 1,
      name: "کباب مخصوص",
      description: "گوشت کباب شده با ادویه مخصوص",
      price: 120000,
      image: "/placeholder.svg?height=200&width=200",
      category: "غذای اصلی",
    },
    {
      id: 2,
      name: "مرغ کاری",
      description: "خوراک مرغ تند با برنج",
      price: 95000,
      image: "/placeholder.svg?height=200&width=200",
      category: "غذای اصلی",
    },
    {
      id: 3,
      name: "سالاد الویه",
      description: "سالاد سیب زمینی تازه با سبزیجات",
      price: 65000,
      image: "/placeholder.svg?height=200&width=200",
      category: "پیش غذا",
    },
    {
      id: 4,
      name: "بستنی زعفرانی",
      description: "بستنی سنتی با زعفران و پسته",
      price: 45000,
      image: "/placeholder.svg?height=200&width=200",
      category: "دسر",
    },
  ]

  // اسلایدر تصاویر
  const slides = [
    {
      image: "/placeholder.svg?height=500&width=1200",
      title: "غذاهای لذیذ ایرانی",
      description: "طعم‌های اصیل و خاطره‌انگیز",
    },
    {
      image: "/placeholder.svg?height=500&width=1200",
      title: "تخفیف ویژه آخر هفته",
      description: "۲۰٪ تخفیف برای سفارش‌های بالای ۳۰۰ هزار تومان",
    },
    {
      image: "/placeholder.svg?height=500&width=1200",
      title: "ارسال سریع و رایگان",
      description: "برای سفارش‌های بالای ۲۰۰ هزار تومان",
    },
  ]

  // تغییر خودکار اسلاید
  useEffect(() => {
    if (showSplash) return // اگر صفحه خوشامدگویی نمایش داده می‌شود، اسلایدر را متوقف کن

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length, showSplash])

  // انیمیشن برای محصولات
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  // اگر صفحه خوشامدگویی نمایش داده می‌شود، محتوای اصلی را نشان نده
  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />
  }

  return (
    <div className="container mx-auto px-4 py-8 font-vazirmatn" dir="rtl">
      {/* اسلایدر */}
      <div className="relative rounded-lg overflow-hidden mb-8 h-[400px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-black/30 z-10"></div>
            <Image src={slide.image || "/placeholder.svg"} alt={slide.title} fill className="object-cover" />
            <div className="relative z-20 h-full flex flex-col justify-center p-8 text-white">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: index === currentSlide ? 1 : 0, x: index === currentSlide ? 0 : -50 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="text-xl mb-6 max-w-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: index === currentSlide ? 1 : 0, x: index === currentSlide ? 0 : -50 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {slide.description}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: index === currentSlide ? 1 : 0, y: index === currentSlide ? 0 : 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  <Link href="/menu">سفارش آنلاین</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        ))}

        {/* دکمه‌های اسلایدر */}
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* دکمه‌های قبلی و بعدی */}
        <button
          className="absolute top-1/2 right-4 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transform -translate-y-1/2"
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <button
          className="absolute top-1/2 left-4 z-20 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transform -translate-y-1/2"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </div>

      {/* دسته‌بندی‌های غذا */}
      <div className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800 border-r-4 border-orange-500 pr-3">منوی ما</h2>
          <Link href="/menu" className="text-orange-500 hover:text-orange-600 font-medium">
            مشاهده همه <ChevronLeft className="inline h-4 w-4" />
          </Link>
        </div>

        <Tabs defaultValue="غذای اصلی" className="mb-12">
          <TabsList className="mb-6 bg-orange-50 p-1">
            {categories.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category}>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {featuredItems
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <motion.div key={item.id} variants={itemVariants}>
                      <FoodCard item={item} />
                    </motion.div>
                  ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* بخش ویژگی‌ها */}
      <div className="mb-16 py-12 bg-orange-50 rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">چرا ما را انتخاب کنید؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md text-center"
            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">تحویل سریع</h3>
            <p className="text-gray-600">غذای شما در کمترین زمان ممکن به دست شما می‌رسد</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-md text-center"
            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">کیفیت عالی</h3>
            <p className="text-gray-600">استفاده از مواد اولیه تازه و با کیفیت در تهیه غذاها</p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-md text-center"
            whileHover={{ y: -10, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">پرداخت آسان</h3>
            <p className="text-gray-600">پرداخت آنلاین یا درب منزل به انتخاب شما</p>
          </motion.div>
        </div>
      </div>

      {/* بخش نحوه سفارش */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">چگونه سفارش دهیم؟</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center relative">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white relative z-10">
              <span className="text-2xl font-bold">۱</span>
            </div>
            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-orange-200 z-0"></div>
            <h3 className="text-xl font-semibold mb-2">انتخاب غذا</h3>
            <p className="text-gray-600">منوی ما را مرور کنید و غذای مورد علاقه خود را انتخاب کنید</p>
          </div>

          <div className="text-center relative">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white relative z-10">
              <span className="text-2xl font-bold">۲</span>
            </div>
            <div className="hidden md:block absolute top-8 left-0 right-0 h-1 bg-orange-200 z-0"></div>
            <h3 className="text-xl font-semibold mb-2">ثبت سفارش</h3>
            <p className="text-gray-600">غذاها را به سبد خرید اضافه کنید و سفارش خود را نهایی کنید</p>
          </div>

          <div className="text-center">
            <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
              <span className="text-2xl font-bold">۳</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">دریافت غذا</h3>
            <p className="text-gray-600">غذای شما در اسرع وقت به دست شما خواهد رسید</p>
          </div>
        </div>
      </div>

      {/* بخش تخفیف ویژه */}
      <motion.div
        className="mb-16 bg-gradient-to-l from-orange-600 to-red-600 rounded-2xl p-8 text-white relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className="absolute left-0 top-0 h-full w-full text-white/10"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
          >
            <path d="M0,0 L1000,0 L1000,1000 L0,1000 Z" fill="currentColor" />
            <path d="M0,0 C200,100 300,300 500,300 C700,300 800,100 1000,0 L1000,1000 L0,1000 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="relative z-10 md:w-2/3">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">تخفیف ویژه برای اولین سفارش!</h2>
          <p className="text-lg mb-6">
            با استفاده از کد تخفیف <span className="font-bold bg-white text-orange-600 px-2 py-1 rounded">FIRST20</span>{" "}
            از ۲۰٪ تخفیف در اولین سفارش خود بهره‌مند شوید.
          </p>
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
            <Link href="/menu">سفارش با تخفیف</Link>
          </Button>
        </div>
      </motion.div>

      {/* بخش نظرات مشتریان */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">نظرات مشتریان</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div className="bg-white p-6 rounded-xl shadow-md" whileHover={{ y: -5 }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">علی محمدی</h4>
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              کیفیت غذاهای زود کوک عالی بود و خیلی سریع به دستم رسید. حتما دوباره سفارش خواهم داد.
            </p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-xl shadow-md" whileHover={{ y: -5 }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">مریم حسینی</h4>
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              طعم غذاهای زود کوک فوق‌العاده بود. بسته‌بندی تمیز و مرتب. از خرید خودم راضی هستم.
            </p>
          </motion.div>

          <motion.div className="bg-white p-6 rounded-xl shadow-md" whileHover={{ y: -5 }}>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-orange-200 rounded-full mr-4"></div>
              <div>
                <h4 className="font-semibold">رضا کریمی</h4>
                <div className="flex text-yellow-400">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>☆</span>
                </div>
              </div>
            </div>
            <p className="text-gray-600">
              کیفیت غذاها خوب بود. فقط کمی در ارسال تاخیر داشت. در کل از زود کوک راضی بودم.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

function FoodCard({ item }: { item: any }) {
  return (
    <Card className="overflow-hidden group">
      <div className="relative h-48">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <Button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-500 hover:bg-orange-600">
          افزودن به سبد
        </Button>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <span className="font-bold text-orange-600">{item.price.toLocaleString()} تومان</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{item.description}</p>
      </CardContent>
    </Card>
  )
}

