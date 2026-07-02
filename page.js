"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [pending, setPending] = useState([]);
  const [live, setLive] = useState([]);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);

  const ADMIN_PASSWORD = "studysmart2026";

  function login(e) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      loadBooks();
    } else {
      alert("Wrong password.");
    }
  }

  async function loadBooks() {
    setLoading(true);
    const { data: pendingData } = await supabase
      .from("books")
      .select("*")
      .eq("approved", false)
      .order("created_at", { ascending: false });

    const { data: liveData } = await supabase
      .from("books")
      .select("*")
      .eq("approved", true)
      .order("created_at", { ascending: false });

    setPending(pendingData || []);
    setLive(liveData || []);
    setLoading(false);
  }

  async function approve(id) {
    await supabase.from("books").update({ approved: true }).eq("id", id);
    loadBooks();
  }

  async function reject(id) {
    await supabase.from("books").delete().eq("id", id);
    loadBooks();
  }

  async function removeLive(id) {
    if (!confirm("Remove this book from the marketplace?")) return;
    await supabase.from("books").delete().eq("id", id);
    loadBooks();
  }

  if (!authed) {
    return (
      <div className="max-w-sm mx-auto mt-20">
        <h1 className="font-serif text-2xl font-bold mb-5">Admin login</h1>
        <form onSubmit={login} className="space-y-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="input w-full"
          />
          <button
            type="submit"
            className="w-full bg-navy text-white font-semibold py-3 rounded-sm hover:bg-[#162c47]"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold mb-1">Admin panel</h1>
      <p className="text-sm text-ink/60 mb-6">
        {live.length} books live · {pending.length} awaiting review
      </p>

      {loading ? (
        <p className="text-sm text-ink/50">Loading...</p>
      ) : (
        <>
          {pending.length > 0 && (
            <section className="mb-8">
              <h2 className="font-serif text-lg font-bold mb-3 text-red">
                Pending approval ({pending.length})
              </h2>
              <div className="space-y-3">
                {pending.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#F5EFE0] border border-ink/10 rounded-sm p-4 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{b.title}</p>
                      <p className="text-xs text-ink/60">
                        {b.subject} · {b.format} · UGX {b.price?.toLocaleString()} · by{" "}
                        {b.seller_name}
                      </p>
                      {b.file_url && (
                        <a
                          href={b.file_url}
                          target="_blank"
                          className="text-xs text-navy underline"
                        >
                          Preview file
                        </a>
                      )}
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => approve(b.id)}
                        className="bg-green text-white px-3 py-1.5 text-xs rounded-sm hover:opacity-90"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => reject(b.id)}
                        className="bg-red text-white px-3 py-1.5 text-xs rounded-sm hover:opacity-90"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {pending.length === 0 && (
            <p className="text-sm text-ink/50 italic mb-6">
              No pending submissions right now.
            </p>
          )}

          <section>
            <h2 className="font-serif text-lg font-bold mb-3">
              Live books ({live.length})
            </h2>
            {live.length === 0 ? (
              <p className="text-sm text-ink/50 italic">No live books yet.</p>
            ) : (
              <div className="space-y-2">
                {live.map((b) => (
                  <div
                    key={b.id}
                    className="bg-[#F5EFE0] border border-ink/10 rounded-sm p-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{b.title}</p>
                      <p className="text-xs text-ink/60">
                        {b.subject} · {b.format} · UGX {b.price?.toLocaleString()} · by{" "}
                        {b.seller_name}
                      </p>
                    </div>
                    <button
                      onClick={() => removeLive(b.id)}
                      className="text-red text-xs underline shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
