import './globals.css'

export const metadata = {
  title: 'StudySmart UG',
  description: 'Study Smart Uganda',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
