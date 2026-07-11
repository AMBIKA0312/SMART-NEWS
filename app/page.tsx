"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

import Navbar from "@/components/Navbar"
import NewsCard from "@/components/NewsCard"

type NewsArticle = {
  title: string
  description: string
  content: string
  url: string
  image: string
  publishedAt: string
  source: {
    name: string
    url: string
  }
}

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadNews() {
      try {
        const res = await fetch("/api/news")

        const data = await res.json()

        setNews(data.articles || [])
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}

      <section className="max-w-7xl mx-auto px-10 py-12">
        <div className="rounded-3xl bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 p-12">

          <p className="uppercase tracking-[0.3em] text-blue-100">
            Smart News
          </p>

          <h1 className="text-6xl font-bold mt-4">
            Stay Ahead with Smart News
          </h1>

          <p className="text-blue-100 mt-6 text-xl max-w-3xl">
            Read the latest trusted news,
            highlight important points,
            organize notes,
            and stay updated.
          </p>

          <div className="flex gap-5 mt-10">

            <button
                onClick={() =>
                  window.scrollTo({
                    top: 550,
                    behavior: "smooth",
                  })
                }
                className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition"
              >
                Explore News
              </button>

            <Link
              href="/shorts"
              className="border border-white px-8 py-4 rounded-2xl"
            >
              Open Shorts
            </Link>

          </div>

        </div>
      </section>

      {/* Trending */}

      <section className="max-w-7xl mx-auto px-10 pb-20">

        <div className="mb-10">

          <h2 className="text-4xl font-bold">
            🔥 Trending Today
          </h2>

          <p className="text-gray-400 mt-2">
            Latest headlines from trusted sources
          </p>

        </div>

        {loading ? (

          <div className="text-gray-400">
                  <div className="grid gap-8">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-72 rounded-3xl bg-zinc-900 animate-pulse"
          />
        ))}
      </div>
          </div>

        ) : (

          <div className="space-y-8">

            {news.map((item) => (

              <NewsCard
                key={item.url}
                item={item}
              />

            ))}

          </div>

        )}

      </section>

    </main>
  )
}