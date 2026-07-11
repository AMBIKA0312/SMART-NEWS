import "./globals.css"

export const metadata = {
  title: "Smart News",
  description:
    "Important world events without noise",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}