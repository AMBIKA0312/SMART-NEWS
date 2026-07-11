import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(
      `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=in&max=10&apikey=${process.env.GNEWS_API_KEY}`,
      {
        next: { revalidate: 300 },
      }
    )

    const data = await response.json()

    return NextResponse.json(data)

  } catch {
    return NextResponse.json(
      { error: "Unable to fetch news" },
      { status: 500 }
    )
  }
}