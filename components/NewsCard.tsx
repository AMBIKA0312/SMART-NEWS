"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import {
  isBookmarked,
  toggleBookmark,
} from "@/lib/bookmarks"

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

export default function NewsCard({
  item,
}: {
  item: NewsArticle
}) {
  const router = useRouter()

  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isBookmarked(item.url))

    const update = () => {
      setSaved(isBookmarked(item.url))
    }

    window.addEventListener(
      "bookmarkChanged",
      update
    )

    return () =>
      window.removeEventListener(
        "bookmarkChanged",
        update
      )
  }, [item.url])

  function openArticle() {
    sessionStorage.setItem(
      "currentArticle",
      JSON.stringify(item)
    )

    router.push("/article")
  }

  function bookmark(
    e: React.MouseEvent
  ) {
    e.stopPropagation()

    toggleBookmark(item)

    setSaved(isBookmarked(item.url))
  }

  return (
    <div
      onClick={openArticle}
      className="
        cursor-pointer
        bg-[#111114]
        border
        border-zinc-800
        rounded-3xl
        overflow-hidden
        hover:border-blue-500
        transition
      "
    >
      {item.image && (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-72 object-cover"
        />
      )}

      <div className="p-8">

        <div className="flex justify-between items-start">

          <div>

            <span className="bg-blue-600 px-4 py-2 rounded-full text-sm">
              {item.source.name}
            </span>

            <h2 className="text-3xl font-bold mt-5">
              {item.title}
            </h2>

          </div>

          <button
            onClick={bookmark}
            className="
              text-3xl
              transition
              hover:scale-110
            "
          >
            {saved ? "⭐" : "☆"}
          </button>

        </div>

        <p className="text-gray-400 mt-6 text-lg">
          {item.description}
        </p>

        <div className="mt-8 flex justify-between text-gray-500">

          <span>
            {new Date(
              item.publishedAt
            ).toLocaleDateString()}
          </span>

          <span>
            Read →
          </span>

        </div>

      </div>
    </div>
  )
}