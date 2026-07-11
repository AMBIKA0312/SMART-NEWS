"use client"
import { saveNote } from "@/lib/notebook"
import { useEffect, useState } from "react"

import Navbar from "@/components/Navbar"

export default function ArticlePage() {
  const [article, setArticle] = useState<any>(null)

  const [progress, setProgress] = useState(0)

  const [selectedText, setSelectedText] = useState("")

  const [showModal, setShowModal] = useState(false)

const [note, setNote] = useState("")

  const [popup, setPopup] = useState({
    visible: false,
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const data = sessionStorage.getItem("currentArticle")

    if (data) {
      setArticle(JSON.parse(data))
    }

    const handleScroll = () => {
      const scroll =
        window.scrollY /
        (document.body.scrollHeight - window.innerHeight)

      setProgress(scroll * 100)
    }

    window.addEventListener("scroll", handleScroll)

    return () =>
      window.removeEventListener("scroll", handleScroll)
  }, [])

  // Detect highlighted text
  useEffect(() => {
    function handleSelection() {
      const selection = window.getSelection()

      const text = selection?.toString().trim()

      if (!text) {
        setPopup({
          visible: false,
          x: 0,
          y: 0,
        })

        return
      }

      const range = selection!.getRangeAt(0)

      const rect = range.getBoundingClientRect()

      setSelectedText(text)

      setPopup({
        visible: true,
        x: rect.left + rect.width / 2,
        y: rect.top + window.scrollY - 55,
      })
    }

    document.addEventListener(
      "mouseup",
      handleSelection
    )

    return () =>
      document.removeEventListener(
        "mouseup",
        handleSelection
      )
  }, [])

    function handleSaveNote() {

      setPopup({
          visible:false,
          x:0,
          y:0
      })

      setNote(selectedText)

      setShowModal(true)

  }

  if (!article) {
    return (
      <main className="min-h-screen bg-black text-white">
        <Navbar />

        <div className="text-center p-20">
          No article selected.
        </div>
      </main>
    )
  }

  return (
    <main className="bg-black text-white min-h-screen">

      {/* Reading Progress */}

      <div
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
        style={{
          width: `${progress}%`,
        }}
      />

      <Navbar />

      {/* Floating Save Button */}

      {popup.visible && (
        <button
          onClick={handleSaveNote}
          style={{
            top: popup.y,
            left: popup.x,
            transform: "translateX(-50%)",
          }}
          className="
            absolute
            z-50
            bg-blue-600
            hover:bg-blue-500
            px-5
            py-3
            rounded-xl
            shadow-xl
            transition
          "
        >
          📌 Save Note
        </button>
      )}
      {
showModal && (

<div
className="
fixed
inset-0
bg-black/70
backdrop-blur-sm
z-[100]
flex
items-center
justify-center
"
>

<div
className="
bg-zinc-900
rounded-3xl
w-[700px]
max-w-[90%]
p-8
border
border-zinc-700
"
>

<h2
className="
text-3xl
font-bold
mb-6
"
>
Save Note
</h2>

<div
className="
text-gray-400
text-sm
mb-3
"
>
Selected Text
</div>

<div
className="
bg-zinc-800
rounded-xl
p-4
mb-8
max-h-40
overflow-auto
"
>
{selectedText}
</div>

<div
className="
text-gray-400
text-sm
mb-3
"
>
My Note
</div>

<textarea

value={note}

onChange={(e)=>
setNote(e.target.value)
}

className="
w-full
h-52
bg-zinc-800
rounded-xl
p-4
outline-none
resize-none
"
/>

<div
className="
flex
justify-end
gap-4
mt-8
"
>

<button

onClick={()=>setShowModal(false)}

className="
px-6
py-3
rounded-xl
bg-zinc-700
"
>

Cancel

</button>

<button
  onClick={() => {
  

 try {

  if (!note.trim()) return

  saveNote({
    articleTitle: article.title,
    articleUrl: article.url,
    source: article.source.name,
    note,
  })

  alert("Saved!")

} catch (err) {

  console.error("SAVE ERROR:", err)

}

setShowModal(false)
setSelectedText("")
setNote("")
window.getSelection()?.removeAllRanges()
}}


  className="
    px-6
    py-3
    rounded-xl
    bg-blue-600
    hover:bg-blue-500
  "
>
  Save Note
</button>

</div>

</div>

</div>

)
}

      {article.image && (
        <img
          src={article.image}
          className="w-full h-[450px] object-cover"
        />
      )}

      <article className="max-w-5xl mx-auto py-12 px-10">

        <div className="text-blue-400">
          {article.source.name}
        </div>

        <h1 className="text-6xl font-bold mt-4">
          {article.title}
        </h1>

        <div className="mt-4 text-gray-500">
          {new Date(
            article.publishedAt
          ).toLocaleString()}
        </div>

        <div
          className="
            mt-10
            text-xl
            leading-10
            whitespace-pre-line
            select-text
          "
        >
          {article.content ||
            article.description}
        </div>

        <a
          href={article.url}
          target="_blank"
          className="
            inline-block
            mt-12
            bg-blue-600
            px-8
            py-4
            rounded-2xl
            hover:bg-blue-500
          "
        >
          Read Original Source →
        </a>

      </article>

    </main>
  )
}