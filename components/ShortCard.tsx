"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

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

type Props = {
  article: NewsArticle
  index: number
  total: number
  points: string[]
}

export default function ShortCard({
  article,
  index,
  total,
  points,
}: Props) {
  const router = useRouter()

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    )

    setSaved(
      bookmarks.some(
        (b: NewsArticle) => b.url === article.url
      )
    )
  }, [article.url])

  function bookmark() {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarks") || "[]"
    )

    if (saved) {
      const updated = bookmarks.filter(
        (b: NewsArticle) => b.url !== article.url
      )

      localStorage.setItem(
        "bookmarks",
        JSON.stringify(updated)
      )

      setSaved(false)
    } else {
      bookmarks.push(article)

      localStorage.setItem(
        "bookmarks",
        JSON.stringify(bookmarks)
      )

      setSaved(true)
    }
  }

  function openArticle() {
    sessionStorage.setItem(
      "currentArticle",
      JSON.stringify(article)
    )

    router.push("/article")
  }

  return (
    <section
      className="
      relative
      h-full
      w-full
      snap-start
      overflow-hidden
      flex
      justify-center
      items-end
    "
    >
      {/* Background */}

      {article.image ? (
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-black" />
      )}

      {/* Dark overlay */}

      <div
        className="
        absolute
        inset-0
        bg-gradient-to-t
        from-black
        via-black/75
        to-black/20
      "
      />

      {/* Progress Dots */}

      <div
        className="
        absolute
        right-5
        top-1/2
        -translate-y-1/2
        z-30
        flex
        flex-col
        gap-2
      "
      >
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all ${
              i === index
                ? "w-2 h-8 bg-blue-500"
                : "w-2 h-2 bg-white/40"
            }`}
          />
        ))}
      </div>

      {/* Bottom Content */}

      <div
        className="
        relative
        z-20
        w-full
        max-w-3xl
        h-full
        flex
        flex-col
        justify-end
        px-8
        pb-8
      "
      >
        <div className="inline-flex w-fit bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
          📰 {article.source.name}
        </div>

        <h1
          onClick={openArticle}
          className="
          mt-4
          text-3xl
          md:text-4xl
          font-bold
          leading-tight
          line-clamp-2
          cursor-pointer
          hover:text-blue-400
          transition
        "
        >
          {article.title}
        </h1>

        <p className="mt-3 text-gray-300 text-base line-clamp-2">
          {article.description}
        </p>

        <div className="mt-5">

          <h2 className="text-blue-400 font-semibold mb-3">
            ⚡ Quick Points
          </h2>

          {points.length === 0 ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 rounded-lg bg-white/10 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-2">
              {points.slice(0, 4).map((point, i) => (
                <div
                  key={i}
                  className="
                  bg-black/45
                  backdrop-blur-md
                  rounded-xl
                  px-4
                  py-3
                  text-sm
                  border
                  border-white/10
                "
                >
                  • {point}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-4">

          <button
            onClick={openArticle}
            className="
            bg-blue-600
            hover:bg-blue-500
            px-6
            py-3
            rounded-xl
            font-semibold
            transition
          "
          >
            📖 Read
          </button>

          <button
            onClick={bookmark}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              saved
                ? "bg-yellow-500 text-black"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            {saved ? "⭐ Saved" : "☆ Save"}
          </button>

        </div>

        <div className="mt-5 flex justify-between items-center text-sm text-gray-400">

          <span>
            {new Date(article.publishedAt).toLocaleDateString()}
          </span>

          <span className="animate-bounce">
            ↑ Swipe
          </span>

        </div>
      </div>
    </section>
  )
}