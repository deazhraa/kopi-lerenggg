"use strict";
/* ========================================================
   Tiga teknik JavaScript yang dipakai:
   1. Event Handling    -> addEventListener (bereaksi saat diklik)
   2. DOM Manipulation  -> innerHTML, textContent (mengubah isi halaman)
   3. Style & Animation -> classList, dataset (mengubah tampilan)
   ======================================================== */

/* Nomor WhatsApp kedai (format 62..., tanpa + atau spasi). GANTI sesuai nomor Anda. */
const NOMOR_WA = "6281234567890";

/* Data menu */
const menu = [
  { id: 1, nama: "Kopi Tubruk Arabika", kategori: "kopi", harga: 18000, deskripsi: "Arabika lereng, seduh tradisional, pekat dan wangi." },
  { id: 2, nama: "V60 Single Origin", kategori: "kopi", harga: 25000, deskripsi: "Seduh manual, rasa buah dan floral yang bersih." },
  { id: 3, nama: "Es Kopi Gula Aren", kategori: "kopi", harga: 22000, deskripsi: "Espresso, susu segar, dan gula aren." },
  { id: 4, nama: "Teh Tarik Rempah", kategori: "non-kopi", harga: 16000, deskripsi: "Teh hitam, jahe, dan kayu manis." },
  { id: 5, nama: "Cokelat Panas", kategori: "non-kopi", harga: 20000, deskripsi: "Cokelat pekat dengan susu hangat." },
  { id: 6, nama: "Pisang Goreng Keju", kategori: "camilan", harga: 15000, deskripsi: "Pisang kepok goreng renyah, taburan keju." },
  { id: 7, nama: "Roti Bakar Cokelat", kategori: "camilan", harga: 17000, deskripsi: "Roti tebal, mentega, dan selai cokelat." }
];

/* ---------- Tombol tema: klik -> ganti tema ---------- */
document.getElementById("theme-toggle").addEventListener("click", function () {
  const html = document.documentElement;
  if (html.dataset.theme === "dark") {
    html.dataset.theme = "light";
  } else {
    html.dataset.theme = "dark";
  }
});

/* ---------- Tombol Menu (layar kecil): klik -> buka/tutup navigasi ---------- */
document.getElementById("menu-toggle").addEventListener("click", function () {
  const nav = document.getElementById("nav");
  nav.classList.toggle("open");
  this.setAttribute("aria-expanded", nav.classList.contains("open"));
});

/* ---------- Menu dan pesanan (hanya ada di Beranda) ---------- */
const menuGrid = document.getElementById("menu-grid");

if (menuGrid) {
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const orderList = document.getElementById("order-list");
  const orderEmpty = document.getElementById("order-empty");
  const orderBtn = document.getElementById("order-btn");

  let pesanan = [];            // isinya id menu yang dipilih
  let kategoriAktif = "semua"; // filter yang sedang dipakai

  function rupiah(angka) {
    return "Rp " + angka.toLocaleString("id-ID");
  }

  /* Menampilkan kartu menu sesuai kategori */
  function tampilkanMenu(kategori) {
    let html = "";
    for (const m of menu) {
      if (kategori !== "semua" && m.kategori !== kategori) {
        continue;
      }
      const dipilih = pesanan.includes(m.id);
      html += '<article class="item">' +
                '<h3>' + m.nama + '</h3>' +
                '<p>' + m.deskripsi + '</p>' +
                '<div class="row">' +
                  '<span class="price">' + rupiah(m.harga) + '</span>' +
                  '<button class="add" type="button" data-id="' + m.id + '" aria-pressed="' + dipilih + '">' +
                    (dipilih ? "Dipilih" : "Tambah") +
                  '</button>' +
                '</div>' +
              '</article>';
    }
    menuGrid.innerHTML = html;
  }

  /* Memperbarui jumlah, daftar, total, dan tombol pesan */
  function perbaruiPesanan() {
    let total = 0;
    let daftar = "";
    for (const m of menu) {
      if (pesanan.includes(m.id)) {
        total += m.harga;
        daftar += "<li><span>" + m.nama + "</span><span>" + rupiah(m.harga) + "</span></li>";
      }
    }
    cartCount.textContent = pesanan.length;
    cartTotal.textContent = rupiah(total);
    orderList.innerHTML = daftar;
    orderEmpty.hidden = pesanan.length > 0;
    orderBtn.disabled = pesanan.length === 0;

    /* Animasi kecil pada angka jumlah pesanan */
    cartCount.classList.add("pop");
    setTimeout(function () { cartCount.classList.remove("pop"); }, 300);
  }

  /* Klik tombol filter -> tampilkan menu sesuai kategori */
  const chips = document.querySelectorAll(".chip");
  for (const chip of chips) {
    chip.addEventListener("click", function () {
      kategoriAktif = chip.dataset.filter;
      for (const c of chips) {
        c.setAttribute("aria-pressed", c === chip);
      }
      tampilkanMenu(kategoriAktif);
    });
  }

  /* Klik tombol Tambah -> masukkan atau keluarkan menu dari pesanan */
  menuGrid.addEventListener("click", function (event) {
    if (!event.target.classList.contains("add")) {
      return;
    }
    const id = Number(event.target.dataset.id);
    if (pesanan.includes(id)) {
      pesanan = pesanan.filter(function (x) { return x !== id; });
    } else {
      pesanan.push(id);
    }
    tampilkanMenu(kategoriAktif);
    perbaruiPesanan();
  });

  /* Klik Pesan via WhatsApp -> susun teks lalu buka WhatsApp */
  orderBtn.addEventListener("click", function () {
    let teks = "Halo Kopi Lereng, saya mau pesan:\n";
    let total = 0;
    for (const m of menu) {
      if (pesanan.includes(m.id)) {
        teks += "- " + m.nama + " (" + rupiah(m.harga) + ")\n";
        total += m.harga;
      }
    }
    teks += "Total: " + rupiah(total);
    window.open("https://wa.me/" + NOMOR_WA + "?text=" + encodeURIComponent(teks), "_blank", "noopener");
  });

  tampilkanMenu("semua");
}
