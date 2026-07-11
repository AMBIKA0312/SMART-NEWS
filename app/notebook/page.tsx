"use client"

import { useEffect, useState } from "react"

import Navbar from "@/components/Navbar"

import {
  getNotes,
  deleteArticle,
  updateArticleNote,
  addEmptyNote,
  deleteSingleNote,
  ArticleNotebook,
} from "@/lib/notebook"

export default function NotebookPage() {
  const [search, setSearch] = useState("")

  const [articles, setArticles] = useState<ArticleNotebook[]>([])

  function loadNotes() {
    setArticles(getNotes())
  }

  useEffect(() => {
    loadNotes()

    window.addEventListener(
      "notesChanged",
      loadNotes
    )

    return () =>
      window.removeEventListener(
        "notesChanged",
        loadNotes
      )
  }, [])

  const filtered = articles.filter(
    (article) =>
      article.articleTitle
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      article.source
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      article.notes.some((note) =>
        note
          .toLowerCase()
          .includes(search.toLowerCase())
      )
  )

  return (
    <main className="min-h-screen bg-black text-white">

      <Navbar />

      <section className="max-w-6xl mx-auto p-10">

        <h1 className="text-5xl font-bold">
          Research Notebook
        </h1>

        <p className="text-gray-500 mt-2">
          One notebook per article
        </p>

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            mt-8
            w-full
            p-4
            rounded-xl
            bg-zinc-900
            border
            border-zinc-700
          "
        />

        <div className="space-y-10 mt-10">

          {filtered.length === 0 && (
            <div className="text-center text-gray-500 py-20">
              No notes yet.
            </div>
          )}

          {filtered.map((article) => (

            <div
              key={article.id}
              className="
                bg-zinc-900
                border
                border-zinc-700
                rounded-3xl
                p-8
              "
            >

              <div className="flex justify-between items-start">

                <div>

                  <div className="text-blue-400">
                    {article.source}
                  </div>

                  <h2 className="text-3xl font-bold mt-2">
                    {article.articleTitle}
                  </h2>

                  <div className="text-gray-500 text-sm mt-2">
                    {article.notes.length} Notes
                  </div>

                </div>

                <button
                  onClick={() =>
                    deleteArticle(article.id)
                  }
                  className="
                    bg-red-600
                    hover:bg-red-500
                    px-5
                    py-3
                    rounded-xl
                  "
                >
                  Delete Article
                </button>

              </div>

              <div className="space-y-5 mt-8">

                {article.notes.map(
                  (note, index) => (

                    <div
                      key={index}
                      className="relative"
                    >

                      <textarea
                        value={note}
                        onChange={(e) =>
                          updateArticleNote(
                            article.id,
                            index,
                            e.target.value
                          )
                        }
                        className="
                          w-full
                          min-h-[120px]
                          bg-black
                          border
                          border-zinc-700
                          rounded-xl
                          p-5
                          resize-none
                          outline-none
                          focus:border-blue-500
                        "
                      />

                      <button
                        onClick={() =>
                          deleteSingleNote(
                            article.id,
                            index
                          )
                        }
                        className="
                          absolute
                          top-4
                          right-4
                          text-red-400
                        "
                      >
                        ✕
                      </button>

                    </div>

                  )
                )}

              </div>

              <button
                onClick={() =>
                  addEmptyNote(article.id)
                }
                className="
                  mt-8
                  bg-blue-600
                  hover:bg-blue-500
                  px-6
                  py-3
                  rounded-xl
                "
              >
                + Add Note
              </button>

            </div>

          ))}

        </div>

      </section>

    </main>
  )
}