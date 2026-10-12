"use strict";
/* ========================================================
   Tiga teknik JavaScript yang dipakai:
   1. Event Handling    -> addEventListener
   2. DOM Manipulation  -> createElement, append, textContent,
                           setAttribute, hidden
   3. Style & Animation -> dataset.theme, classList, CSS transition/@keyframes
   ======================================================== */

/* Nomor WhatsApp kedai */
const NOMOR_WA = "6281234567890";

/* Data menu (disimpan langsung di JavaScript) */
const menu = [
  { id: 1, nama: "Kopi Tubruk Arabika", kategori: "kopi", harga: 18000, deskripsi: "Arabika lereng, seduh tradisional, pekat dan wangi." },
  { id: 3, nama: "Es Kopi Gula Aren", kategori: "kopi", harga: 22000, deskripsi: "Espresso, susu segar, dan gula aren." },
  { id: 4, nama: "Teh Tarik Rempah", kategori: "non-kopi", harga: 16000, deskripsi: "Teh hitam, jahe, dan kayu manis." },
  { id: 5, nama: "Cokelat Panas", kategori: "non-kopi", harga: 20000, deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 6, nama: "Pisang Goreng Keju", kategori: "camilan", harga: 15000, deskripsi: "Pisang kepok goreng renyah, taburan keju." },
  { id: 7, nama: "Roti Bakar Cokelat", kategori: "camilan", harga: 17000, deskripsi: "Roti tebal, mentega, dan selai cokelat." }
];

/* ---------- Tema gelap/terang (Event + Style) ---------- */
const root = document.documentElement;
document.getElementById("theme-toggle").addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
});

/* ---------- Menu navigasi mobile (Event + DOM) ---------- */
const navBtn = document.getElementById("menu-toggle");
const nav = document.getElementById("nav");
navBtn.addEventListener("click", () => {
  const open = nav.getAttribute("data-open") !== "true";
  nav.setAttribute("data-open", String(open));
  navBtn.setAttribute("aria-expanded", String(open));
});

/* ---------- Menu: filter + daftar pesanan (DOM Manipulation) ---------- */
const grid = document.getElementById("menu-grid");
if (grid) {
  const status = document.getElementById("status");
  const countEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total");
  const orderList = document.getElementById("order-list");
  const orderEmpty = document.getElementById("order-empty");
  const orderBtn = document.getElementById("order-btn");
  const rupiah = n => "Rp " + n.toLocaleString("id-ID");
  const cart = new Set();

  const selected = () => menu.filter(m => cart.has(m.id));

  /* Perbarui badge, ringkasan pesanan, total, dan tombol pesan */
  const updateCart = () => {
    const items = selected();
    countEl.textContent = items.length;
    /* Animasi "pop" pada badge: hapus lalu pasang ulang kelas agar animasi diputar lagi */
    countEl.classList.remove("pop"); void countEl.offsetWidth; countEl.classList.add("pop");
    totalEl.textContent = rupiah(items.reduce((s, m) => s + m.harga, 0));
    orderList.textContent = "";
    items.forEach(m => {
      const li = document.createElement("li");
      const nama = document.createElement("span"); nama.textContent = m.nama;
      const harga = document.createElement("span"); harga.textContent = rupiah(m.harga);
      li.append(nama, harga);
      orderList.append(li);
    });
    orderEmpty.hidden = items.length > 0;
    orderBtn.disabled = items.length === 0;
  };

  /* Susun teks pesanan lalu buka WhatsApp */
  orderBtn.addEventListener("click", () => {
    const items = selected();
    if (!items.length) return;
    const total = items.reduce((s, m) => s + m.harga, 0);
    const teks = "Halo Kopi Lereng, saya mau pesan:\n" +
      items.map(m => "- " + m.nama + " (" + rupiah(m.harga) + ")").join("\n") +
      "\nTotal: " + rupiah(total);
    window.open("https://wa.me/" + NOMOR_WA + "?text=" + encodeURIComponent(teks), "_blank", "noopener");
  });

  const render = kategori => {
    grid.textContent = "";
    const list = kategori === "semua" ? menu : menu.filter(m => m.kategori === kategori);
    list.forEach(m => {
      const card = document.createElement("article");
      card.className = "item";
      const h = document.createElement("h3"); h.textContent = m.nama;
      const p = document.createElement("p"); p.textContent = m.deskripsi;
      const row = document.createElement("div"); row.className = "row";
      const price = document.createElement("span"); price.className = "price"; price.textContent = rupiah(m.harga);
      const btn = document.createElement("button");
      btn.type = "button"; btn.className = "add";
      const sync = () => { const on = cart.has(m.id); btn.textContent = on ? "Dipilih" : "Tambah"; btn.setAttribute("aria-pressed", String(on)); };
      sync();
      btn.addEventListener("click", () => {
        if (cart.has(m.id)) { cart.delete(m.id); } else { cart.add(m.id); }
        sync(); updateCart();
      });
      row.append(price, btn);
      card.append(h, p, row);
      grid.append(card);
    });
    status.textContent = list.length ? "" : "Belum ada menu di kategori ini.";
  };

  render("semua");
  document.querySelectorAll(".chip").forEach(chip => chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach(c => c.setAttribute("aria-pressed", String(c === chip)));
    render(chip.dataset.filter);
  }));
}
