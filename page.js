"use client";

import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  function save(next) {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  function changeQty(id, delta) {
    const next = cart
      .map((i) => (i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))
      .filter((i) => i.qty > 0);
    save(next);
  }

  function removeItem(id) {
    save(cart.filter((i) => i.id !== id));
  }

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl font-bold mb-5">Your cart</h1>
      {cart.length === 0 ? (
        <p className="text-sm text-ink/50 italic">
          Cart is empty.{" "}
          <a href="/" className="underline">
            Go back to the marketplace
          </a>{" "}
          to add some books.
        </p>
      ) : (
        <>
          <div className="space-y-3 mb-6">
            {cart.map((i) => (
              <div
                key={i.id}
                className="bg-[#F5EFE0] border border-ink/10 rounded-sm p-3 flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{i.title}</p>
                  <p className="text-xs text-ink/50">
                    UGX {i.price.toLocaleString()} each
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => changeQty(i.id, -1)}
                    className="w-6 h-6 flex items-center justify-center bg-white border rounded-sm"
                  >
                    −
                  </button>
                  <span className="text-sm w-4 text-center">{i.qty}</span>
                  <button
                    onClick={() => changeQty(i.id, 1)}
                    className="w-6 h-6 flex items-center justify-center bg-white border rounded-sm"
                  >
                    +
                  </button>
                </div>
                <button onClick={() => removeItem(i.id)} className="text-red text-sm">
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-ink/15 pt-4 mb-5">
            <span className="font-serif font-bold text-lg">Total</span>
            <span className="font-bold text-lg text-navy">
              UGX {total.toLocaleString()}
            </span>
          </div>
          <button
            onClick={() =>
              alert(
                "Mobile Money checkout isn't connected yet — this is where Flutterwave will plug in next."
              )
            }
            className="w-full bg-gold text-ink font-semibold py-3 rounded-sm hover:bg-[#c79430]"
          >
            Pay with Mobile Money
          </button>
        </>
      )}
    </div>
  );
}
