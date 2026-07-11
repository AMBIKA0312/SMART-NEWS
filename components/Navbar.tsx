"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Search } from "lucide-react"

export default function Navbar() {
  const pathname = usePathname()

  const navItems = [
    
  {
    name: "Feed",
    href: "/",
    icon: "📰",
  },
  {
    name: "Shorts",
    href: "/shorts",
    icon: "⚡",
  },
  {
    name: "Notebook",
    href: "/notebook",
    icon: "📖",
  },
  {
    name: "Bookmarks",
    href: "/bookmarks",
    icon: "⭐",
  },

  ]

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-zinc-800">
  <div className="max-w-7xl mx-auto flex items-center gap-6 px-8 py-4">

    <Link href="/" className="shrink-0">
      <h1 className="text-3xl font-bold text-blue-400">
        Smart News
      </h1>
    </Link>

    <div className="flex-1 relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
      />

      <input
        type="text"
        placeholder="Search news..."
        className="w-full bg-[#18181d] rounded-2xl pl-12 pr-4 py-3 border border-zinc-800 focus:border-blue-500 outline-none"
      />
    </div>

    <nav className="flex items-center gap-2 shrink-0">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-medium transition ${
            pathname === item.href
              ? "bg-blue-600 text-white"
              : "bg-[#18181d] hover:bg-zinc-800 text-gray-300"
          }`}
        >
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>

  </div>
</header>
  )
}