import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
)

export async function POST(req: Request) {
  try {
    const { text } = await req.json()

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    })

    const prompt = `
You are a professional note formatter.

Rules:

- Preserve the original meaning exactly.
- Do NOT add new information.
- Do NOT explain.
- Convert keywords into clean, readable notes.
- Keep it concise.
- Return ONLY the rewritten note.

Text:

${text}
`

    const result = await model.generateContent(prompt)

    let rewritten = result.response.text()

    // Remove markdown if Gemini adds it
    rewritten = rewritten
      .replace(/```/g, "")
      .trim()

    return Response.json({
      result: rewritten,
    })

  } catch (error) {
    console.error("REWRITE ERROR:", error)

    return Response.json(
      {
        error: "Rewrite failed",
      },
      {
        status: 500,
      }
    )
  }
}