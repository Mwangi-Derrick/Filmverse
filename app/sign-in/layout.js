export default async function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className="h-screen bg-zinc-950">
        {children}
      </body>
    </html>
  )
}