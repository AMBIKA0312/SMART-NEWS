export type ArticleNotebook = {
  id: string
  articleTitle: string
  articleUrl: string
  source: string
  createdAt: string
  notes: string[]
}

const STORAGE_KEY = "notebook"

export function getNotes(): ArticleNotebook[] {
  if (typeof window === "undefined") return []

  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  )
}

export function saveNote(data: {
  articleTitle: string
  articleUrl: string
  source: string
  note: string
}) {
  const notebook = getNotes()

  const existing = notebook.find(
    (article) => article.articleUrl === data.articleUrl
  )

  if (existing) {
    existing.notes.push(data.note)
  } else {
    notebook.unshift({
      id: crypto.randomUUID(),
      articleTitle: data.articleTitle,
      articleUrl: data.articleUrl,
      source: data.source,
      createdAt: new Date().toISOString(),
      notes: [data.note],
    })
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(notebook)
  )

  window.dispatchEvent(
    new Event("notesChanged")
  )
}

export function deleteArticle(id: string) {
  const updated = getNotes().filter(
    (article) => article.id !== id
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )

  window.dispatchEvent(
    new Event("notesChanged")
  )
}

export function updateArticleNote(
  articleId: string,
  noteIndex: number,
  value: string
) {
  const notebook = getNotes()

  const updated = notebook.map((article) => {
    if (article.id !== articleId) return article

    const notes = [...article.notes]
    notes[noteIndex] = value

    return {
      ...article,
      notes,
    }
  })

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )

  window.dispatchEvent(
    new Event("notesChanged")
  )
}

export function addEmptyNote(articleId: string) {
  const notebook = getNotes()

  const updated = notebook.map((article) => {
    if (article.id !== articleId) return article

    return {
      ...article,
      notes: [...article.notes, ""],
    }
  })

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )

  window.dispatchEvent(
    new Event("notesChanged")
  )
}

export function deleteSingleNote(
  articleId: string,
  noteIndex: number
) {
  const notebook = getNotes()

  const updated = notebook.map((article) => {
    if (article.id !== articleId) return article

    return {
      ...article,
      notes: article.notes.filter(
        (_, i) => i !== noteIndex
      ),
    }
  })

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )

  window.dispatchEvent(
    new Event("notesChanged")
  )
}