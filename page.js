"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
  "English",
  "History",
  "Geography",
];

export default function SellPage() {
  const [form, setForm] = useState({
    title: "",
    subject: "Mathematics",
    format: "PDF",
    level: "",
    pages: "",
    price: "",
    seller_name: "",
    file_url: "",
  });
  const [status, setStatus] = useState("idle"); // idle | saving | done | error

  function update(k, v) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.price || !form.seller_name) return;
    setStatus("saving");
    const { error } = await supabase.from("books").insert([
      {
        title: form.title,
        subject: form.subject,
        format: form.format,
        level: form.level,
        pages: Number(form.pages) || 0,
        price: Number(form.price),
        seller_name: form.seller_name,
        file_url: form.file_url,
        approved: false,
      },
    ]);
    if (error) {
      console.error(error);
      setStatus("error");
      return;
    }
    setStatus("done");
    setForm({
      title: "",
      subject: "Mathematics",
      format: "PDF",
      level: "",
      pages: "",
      price: "",
      seller_name: "",
      file_url: "",
    });
  }

  return (
    <div className="max-w-lg">
      <h1 className="font-serif text-2xl font-bold mb-1">Sell a book</h1>
      <p className="text-sm text-ink/60 mb-5">
        Submissions are reviewed by an admin before they go live in the
        marketplace.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Title">
          <input
            value={form.title}
            onChange={(e) => update("title", e.target.value)}
            required
            className="input"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Subject">
            <select
              value={form.subject}
              onChange={(e) => update("subject", e.target.value)}
              className="input"
            >
              {SUBJECTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </Field>
          <Field label="Format">
            <select
              value={form.format}
              onChange={(e) => update("format", e.target.value)}
              className="input"
            >
              <option>PDF</option>
              <option>DOC</option>
              <option>PPT</option>
            </select>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Level">
            <input
              value={form.level}
              onChange={(e) => update("level", e.target.value)}
              placeholder="e.g. Senior 5"
              className="input"
            />
          </Field>
          <Field label="Pages">
            <input
              value={form.pages}
              onChange={(e) => update("pages", e.target.value)}
              type="number"
              className="input"
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Price (UGX)">
            <input
              value={form.price}
              onChange={(e) => update("price", e.target.value)}
              type="number"
              required
              className="input"
            />
          </Field>
          <Field label="Your name">
            <input
              value={form.seller_name}
              onChange={(e) => update("seller_name", e.target.value)}
              required
              className="input"
            />
          </Field>
        </div>
        <Field label="Link to your file (Google Drive link, shared publicly)">
          <input
            value={form.file_url}
            onChange={(e) => update("file_url", e.target.value)}
            placeholder="https://drive.google.com/..."
            className="input"
          />
        </Field>
        <button
          type="submit"
          disabled={status === "saving"}
          className="w-full bg-navy text-white font-semibold py-3 rounded-sm hover:bg-[#162c47] disabled:opacity-60"
        >
          {status === "saving" ? "Submitting..." : "Submit for approval"}
        </button>
        {status === "done" && (
          <p className="text-green text-sm font-semibold">
            Submitted! It'll appear once an admin approves it.
          </p>
        )}
        {status === "error" && (
          <p className="text-red text-sm font-semibold">
            Something went wrong — please try again.
          </p>
        )}
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block text-xs font-semibold text-ink/70 mb-1">
      {label}
      <div className="mt-1 font-normal">{children}</div>
    </label>
  );
}
