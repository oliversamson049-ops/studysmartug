import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'StudySmart UG',
  description: 'Study resources for Ugandan students',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white shadow-sm sticky top-0">
          <nav className="max-w-4xl mx-auto px-6 py-4 flex gap-6 font-medium">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/about" className="hover:text-blue-600">About</Link>
            <Link href="/courses" className="hover:text-blue-600">Courses</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact</Link>
          </nav>
        </header>
        <main className="max-w-4xl mx-auto p-6">
          {children}
        </main>
      </body>
    </html>
  )
    }
