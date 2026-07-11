"use client"

import { useEffect, useRef, useState } from "react"

import Navbar from "@/components/Navbar"
import ShortCard from "@/components/ShortCard"

type NewsArticle = {
  title: string
  description: string
  content?: string
  url: string
  image?: string
  publishedAt: string
  source: {
    name: string
    url: string
  }
}

export default function ShortsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [summaries, setSummaries] = useState<string[][]>([])
  const [loading, setLoading] = useState(true)

  const containerRef = useRef<HTMLDivElement>(null)
  const scrolling = useRef(false)

  useEffect(() => {
    async function loadNews() {
      try {
        const newsRes = await fetch("/api/news")

        if (!newsRes.ok) {
          throw new Error("Failed to fetch news")
        }

        const newsData = await newsRes.json()
        const fetchedArticles = newsData.articles || []

        setArticles(fetchedArticles)

        const cached = sessionStorage.getItem("shortSummaries")

        if (cached) {
          const parsed = JSON.parse(cached)

          if (
            Array.isArray(parsed) &&
            parsed.length === fetchedArticles.length
          ) {
            setSummaries(parsed)
            setLoading(false)
            return
          }
        }

        const aiRes = await fetch("/api/shorts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            articles: fetchedArticles.map((article: NewsArticle) => ({
              title: article.title,
              description: article.description,
              content: article.content?.slice(0, 300),
            })),
          }),
        })

        const aiData = await aiRes.json()

        if (
          aiData.summaries &&
          Array.isArray(aiData.summaries)
        ) {
          const allPoints = aiData.summaries.map(
            (summary: any) =>
              Array.isArray(summary.points)
                ? summary.points
                : []
          )

          setSummaries(allPoints)

          sessionStorage.setItem(
            "shortSummaries",
            JSON.stringify(allPoints)
          )
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  useEffect(() => {
    const container = containerRef.current

    if (!container) return

    function scrollOne(direction: number) {
      if (scrolling.current) return

      scrolling.current = true

      container.scrollBy({
        top: direction * container.clientHeight,
        behavior: "smooth",
      })

      setTimeout(() => {
        scrolling.current = false
      }, 500)
    }

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault()

      if (Math.abs(e.deltaY) < 10) return

      scrollOne(e.deltaY > 0 ? 1 : -1)
    }

    const keyHandler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
          e.preventDefault()
          scrollOne(1)
          break

        case "ArrowUp":
        case "PageUp":
          e.preventDefault()
          scrollOne(-1)
          break

        case " ":
          e.preventDefault()

          if (e.shiftKey) {
            scrollOne(-1)
          } else {
            scrollOne(1)
          }
          break
      }
    }

    container.addEventListener("wheel", wheelHandler, {
      passive: false,
    })

    window.addEventListener("keydown", keyHandler)

    return () => {
      container.removeEventListener(
        "wheel",
        wheelHandler
      )

      window.removeEventListener(
        "keydown",
        keyHandler
      )
    }
  }, [])

  if (loading) {
    return (
      <main className="bg-black text-white h-screen overflow-hidden">
        <Navbar />

        <div className="h-[calc(100vh-72px)] flex items-center justify-center">
          <div className="text-3xl font-bold animate-pulse">
            Loading Smart Shorts...
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-black text-white h-screen overflow-hidden">

      <Navbar />

      <div
        ref={containerRef}
        id="shorts-container"
        className="
          fixed
          top-[72px]
          left-0
          right-0
          bottom-0
          overflow-y-scroll
          overflow-x-hidden
          snap-y
          snap-mandatory
          scroll-smooth
          overscroll-none
        "
      >
        {articles.map((article, index) => (
          <ShortCard
            key={article.url}
            article={article}
            index={index}
            total={articles.length}
            points={summaries[index] || []}
          />
        ))}
      </div>

    </main>
  )
}