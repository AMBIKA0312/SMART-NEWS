"use client"

import { useState } from "react"

import Navbar from "@/components/Navbar"
import NewsCard from "@/components/NewsCard"

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

export default function BookmarksPage() {

  const [bookmarks] = useState<NewsArticle[]>(() => {

    if (typeof window === "undefined") return []

    return JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    )

  })

  return (
    <main className="min-h-screen bg-[#050505] text-white">

      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12">

        <h1 className="text-5xl font-bold mb-3">
          ⭐ Bookmarks
        </h1>

        <p className="text-gray-400 mb-10">
          Your saved articles.
        </p>

        {bookmarks.length === 0 ? (

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-12 text-center">

            <h2 className="text-2xl font-semibold mb-3">
              No bookmarks yet
            </h2>

            <p className="text-gray-500">
              Bookmark an article from Home or Shorts and it will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-8">

            {bookmarks.map((article) => (

              <NewsCard
                key={article.url}
                item={article}
              />

            ))}

          </div>

        )}

      </div>

    </main>
  )
}