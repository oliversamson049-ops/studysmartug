import "./globals.css";

export const metadata = {
  title: "Study Smart UG — Affordable books for Ugandan students",
  description:
    "Buy and sell cheap study materials in PDF and DOC format across Uganda.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-navy text-[#F5EFE0] sticky top-0 z-20 shadow-md">
          <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between flex-wrap gap-2">
            <a href="/" className="font-serif text-xl font-bold tracking-tight">
              Study Smart <span className="text-gold">UG</span>
            </a>
            <nav className="flex items-center gap-1 text-sm">
              <a href="/" className="px-3 py-1.5 rounded-sm hover:bg-white/10">
                Marketplace
              </a>
              <a href="/sell" className="px-3 py-1.5 rounded-sm hover:bg-white/10">
                Sell a Book
              </a>
              <a href="/admin" className="px-3 py-1.5 rounded-sm hover:bg-white/10">
                Admin
              </a>
              <a
                href="/cart"
                className="ml-2 bg-gold text-ink px-3 py-1.5 rounded-sm font-semibold hover:bg-[#c79430]"
              >
                Cart
              </a>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-5 py-8 min-h-[70vh]">
          {children}
        </main>
        <footer className="text-center text-xs text-ink/50 py-8 border-t border-ink/10 mt-8">
          Study Smart UG — affordable books for Ugandan pupils & students.
        </footer>
      </body>
    </html>
  );
}
