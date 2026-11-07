import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { products } from "../data.js";
import { Icon } from "./ui.jsx";

/* Cart (persisted to localStorage when available) + toast + drawer state */
const KEY = "tobc-cart-v1";
const load = () => { try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; } };
const save = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage blocked */ } };
export const product = (id) => products.find((p) => p.id === id);

const Ctx = createContext(null);
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }) {
  const [items, setItems] = useState(load);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const timer = useRef();

  useEffect(() => { save(items); }, [items]);
  useEffect(() => {
    const onStorage = () => setItems(load());
    addEventListener("storage", onStorage); return () => removeEventListener("storage", onStorage);
  }, []);

  const notify = useCallback((msg, icon = "check") => {
    setToast({ msg, icon }); clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const add = (id, qty = 1, opt = "", { open = false } = {}) => {
    const key = id + (opt ? "|" + opt : "");
    setItems((prev) => {
      const ex = prev.find((i) => i.key === key);
      return ex ? prev.map((i) => (i.key === key ? { ...i, qty: Math.min(99, i.qty + qty) } : i)) : [...prev, { key, id, qty, opt }];
    });
    notify(`Added to cart — ${product(id).name}${qty > 1 ? " × " + qty : ""}`);
    if (open) setCartOpen(true);
  };
  const setQty = (key, qty) => setItems((prev) => (qty <= 0 ? prev.filter((i) => i.key !== key) : prev.map((i) => (i.key === key ? { ...i, qty: Math.min(99, qty) } : i))));
  const remove = (key) => setItems((prev) => prev.filter((i) => i.key !== key));
  const clear = () => setItems([]);
  const subtotal = items.reduce((s, i) => s + product(i.id).price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <Ctx.Provider value={{ items, add, setQty, remove, clear, subtotal, count, cartOpen, setCartOpen, notify }}>
      {children}
      <div className={"toast" + (toast ? " show" : "")} role="status" aria-live="polite">
        {toast && <><Icon name={toast.icon} />{toast.msg}</>}
      </div>
    </Ctx.Provider>
  );
}
