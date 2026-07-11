# 📰 Smart News

An AI-powered modern news platform built with **Next.js**, **TypeScript**, and **Tailwind CSS** that transforms traditional news reading into a faster, more interactive experience through AI-generated Shorts, bookmarks, and a personal research notebook. Well-structured README files help explain a project's purpose, setup, architecture, and usage for contributors and users alike. :contentReference[oaicite:0]{index=0}

## 🌐 Live Demo

**Vercel:**  
👉 https://smart-news-ambika0312s-projects.vercel.app

---

# ✨ Features

### 📰 Home Feed
- Live news fetched using GNews API
- Clean modern UI
- Responsive article cards
- Category-based browsing
- Read full article

### ⚡ AI Smart Shorts
- Vertical swipe experience
- AI-generated quick bullet points
- Single AI request summarizes all articles
- Cached summaries for faster loading
- Keyboard (PgUp/PgDn & Arrow Keys) and mouse wheel navigation

### 📖 Article Reader
- Beautiful reading interface
- Reading progress bar
- Original source link
- Highlight important text
- Save notes while reading

### ⭐ Bookmarks
- Bookmark / Unbookmark articles
- Dynamic bookmark icon
- Dedicated bookmarks page
- Instant updates

### 📝 Research Notebook
- Save highlights as personal notes
- Multiple editable notes per article
- Search notes
- Delete notes
- Delete article notebook
- Automatically grouped by article

---

# 🏗️ Tech Stack

## Frontend
- Next.js 16
- React
- TypeScript
- Tailwind CSS

## APIs
- GNews API
- Groq API (AI Summarization)

## Storage
- Local Storage
- Session Storage

---

# 📂 Project Structure

```text
app/
│
├── api/
│   ├── news/
│   └── shorts/
│
├── article/
├── bookmarks/
├── notebook/
├── shorts/
│
├── layout.tsx
└── page.tsx

components/
│
├── Navbar.tsx
├── NewsCard.tsx
└── ShortCard.tsx

lib/
│
├── bookmarks.ts
└── notebook.ts
```

---

# 🔄 Workflow

```text
User Opens Website
        │
        ▼
Fetch News from GNews API
        │
        ▼
Display Home Feed
        │
        ├──────────────┐
        ▼              ▼
     Shorts        Full Article
        │              │
        ▼              ▼
AI Summaries      Read Article
        │              │
        ▼              ▼
 Bookmark      Highlight Text
        │              │
        ▼              ▼
 Bookmarks     Save Personal Notes
        │              │
        └──────► Notebook ◄──────┘
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/AMBIKA0312/signal.git
```

Move into the project

```bash
cd signal
```

Install dependencies

```bash
npm install
```

Create a `.env.local`

```env
GNEWS_API_KEY=YOUR_GNEWS_API_KEY
GROQ_API_KEY=YOUR_GROQ_API_KEY
```

Run locally

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 📌 Current Features

- ✅ Live News Feed
- ✅ AI Smart Shorts
- ✅ Article Reader
- ✅ Reading Progress
- ✅ Bookmarks
- ✅ Research Notebook
- ✅ Search Notes
- ✅ Responsive UI
- ✅ TypeScript

---

# 🚧 Future Improvements

- User Authentication
- MongoDB Integration
- Cloud Sync
- Full Article Extraction
- Export Notes (PDF / DOCX / Markdown)
- Reading History
- User Profiles
- Personalized Recommendations
- Push Notifications
- AI Chat Assistant

---

# 👨‍💻 Developer

**Ambika K**

B.Tech Computer Science Engineering

---

# 📄 License

This project is intended for educational and portfolio purposes.
