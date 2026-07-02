import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'StudySmart UG',
  description: 'Study resources for Ugandan students',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="p-4 border-b flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        {children}
      </body>
    </html>
  )
}
