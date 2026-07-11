import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { articles } = await req.json()

    if (!articles || articles.length === 0) {
      return Response.json({
        summaries: [],
      })
    }

    const prompt = `
You are Smart News AI.

For EVERY news article below, generate exactly 3 to 5 concise important points.

Rules:

- Return ONLY valid JSON.
- No markdown.
- No explanations.
- No extra text.
- Maximum 12 words per point.
- Preserve factual meaning.
- Keep each point short.

Return EXACTLY this format:

{
  "summaries": [
    {
      "points": [
        "...",
        "...",
        "..."
      ]
    }
  ]
}

News Articles:

${articles
  .map(
    (article: any, index: number) => `
Article ${index + 1}

Title:
${article.title}

Description:
${article.description ?? ""}

Content:
${article.content ?? ""}
`
  )
  .join("\n-----------------------------------\n")}
`

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      temperature: 0.3,

      messages: [
        {
          role: "system",
          content:
            "Return ONLY valid JSON. Never use markdown.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    })

    let text =
      completion.choices[0].message.content || ""

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()

    let parsed

    try {
      parsed = JSON.parse(text)
    } catch {
      console.log("AI returned invalid JSON")
      console.log(text)

      return Response.json({
        summaries: [],
      })
    }

    return Response.json(parsed)
  } catch (err: any) {
    console.error("SHORTS API ERROR")
    console.error(err)

    return Response.json(
      {
        summaries: [],
        error:
          err?.message ??
          "Unknown server error",
      },
      {
        status: 500,
      }
    )
  }
}