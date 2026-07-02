"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const SUBJECTS = [
  "All",
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
  "English",
  "History",
  "Geography",
];

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("All");

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    setLoading(true);
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });
    if (!error) setBooks(data || []);
    setLoading(false);
  }

  function addToCart(book) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((i) => i.id === book.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...book, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Added "${book.title}" to cart`);
  }

  const filtered = books.filter(
    (b) =>
      (subject === "All" || b.subject === subject) &&
      b.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-1">
        Find your next set of notes
      </h1>
      <p className="text-ink/60 text-sm mb-6">
        Cheap, exam-ready materials from approved sellers across Uganda.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title..."
          className="input flex-1"
        />
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="input sm:w-48"
        >
          {SUBJECTS.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-ink/50">Loading books...</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-ink/50 italic">
          No books yet. Once sellers submit and you approve them, they'll show up here.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((b) => (
            <div
              key={b.id}
              className="bg-[#F5EFE0] border border-ink/10 rounded-sm p-4 flex flex-col hover:shadow-md transition"
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] uppercase tracking-wide bg-navy/10 text-navy px-2 py-0.5 rounded-sm font-semibold">
                  {b.format}
                </span>
              </div>
              <h3 className="font-serif font-bold text-base leading-snug mb-1">
                {b.title}
              </h3>
              <p className="text-xs text-ink/60 mb-3">
                {b.subject} · {b.level} · {b.pages}pg · by {b.seller_name}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-bold text-navy">
                  UGX {b.price.toLocaleString()}
                </span>
                <button
                  onClick={() => addToCart(b)}
                  className="text-xs bg-green text-white px-3 py-1.5 rounded-sm hover:opacity-90"
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
