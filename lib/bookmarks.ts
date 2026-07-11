export type BookmarkArticle = {
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

const STORAGE_KEY = "bookmarks"

export function getBookmarks(): BookmarkArticle[] {
  if (typeof window === "undefined") return []

  return JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
  )
}

export function isBookmarked(url: string) {
  return getBookmarks().some(
    article => article.url === url
  )
}

export function toggleBookmark(article: BookmarkArticle) {
  const bookmarks = getBookmarks()

  const exists = bookmarks.find(
    b => b.url === article.url
  )

  let updated

  if (exists) {
    updated = bookmarks.filter(
      b => b.url !== article.url
    )
  } else {
    updated = [...bookmarks, article]
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )

  window.dispatchEvent(
    new Event("bookmarkChanged")
  )

  return updated
}

export function removeBookmark(url: string) {
  const updated = getBookmarks().filter(
    article => article.url !== url
  )

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updated)
  )

  window.dispatchEvent(
    new Event("bookmarkChanged")
  )

  return updated
}