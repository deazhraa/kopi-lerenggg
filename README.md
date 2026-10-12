# Kopi Lereng: Website Kedai Kopi

Tugas UTS Pemrograman Web, Sarjana Terapan Manajemen Informatika, Semester 3.

- **Nama / NIM:** Ella Dea Azahra / 25091397098
- **Alamat website:** https://github.com/deazhraa/kopi-lereng
- **Dokumen SRS:** [SRS.md](SRS.md)

## Cara melihat halaman

**Online:** buka alamat GitHub Pages di atas.

**Lokal:** unduh atau clone repositori, lalu klik dua kali `index.html`.

## Cara hosting di GitHub Pages

1. Buat repositori publik, upload semua file proyek ini.
2. Buka **Settings > Pages**.
3. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu **Save**.
4. Tunggu 1 sampai 2 menit, alamat situs muncul di halaman yang sama.

## Struktur berkas

```
index.html      Beranda: hero, statistik, menu interaktif, ringkasan pesanan
tentang.html    Tentang Kami: cerita, timeline, tabel nilai
css/style.css   Seluruh gaya
img/kopi.jpg    Foto untuk hero di Beranda
js/script.js    Seluruh interaksi
SRS.md          Software Requirements Specification
```

## Penjelasan struktur HTML

- Semua halaman memakai `<!DOCTYPE html>`, `lang="id"`, `meta charset`, dan `meta viewport`, serta `<title>` dan `meta description` unik per halaman.
- **Elemen semantik:** `<header>` (judul + deskripsi singkat halaman), `<nav>` (menu Beranda dan Tentang Kami), `<main>`, `<section>`, `<article>`, `<footer>`.
- **Navigasi:** daftar `<ul>` di dalam `<nav>`; halaman aktif ditandai `aria-current="page"`.
- **Heading** berurutan (satu `<h1>` per halaman, lalu `<h2>`, `<h3>`).
- **Gambar:** foto hero memakai `<img>` dengan teks `alt`, serta atribut `width` dan `height` agar tata letak tidak bergeser saat gambar dimuat; tombol interaktif memakai `<button>` dengan `aria-expanded` / `aria-pressed`; badge pesanan memakai `aria-live`.
- **Tabel** memakai `<caption>`, `<thead>`, `<tbody>`; **daftar bernomor** `<ol>` dipakai untuk timeline karena urutannya berarti.

## Penjelasan desain CSS

- **Design token** lewat CSS custom properties (`:root`): warna, radius, dan font, sehingga tema mudah diubah. Tema gelap menimpa token yang sama lewat `[data-theme="dark"]`.
- **Palet:** hijau hutan gelap (teks), abu-hijau muda (latar), kuning safron (aksen), biru slate (tautan).
- **Tipografi:** *Fraunces* (serif, judul) dan *Instrument Sans* (isi), dengan fallback font sistem.
- **Layout:** CSS Grid untuk hero, dua kolom, dan kartu menu (`repeat(auto-fill, minmax(250px, 1fr))`); Flexbox untuk navbar, filter, dan statistik.
- **Responsif:** satu *breakpoint* di 760px: menu menjadi tombol buka-tutup, grid menjadi satu kolom.
- **Animasi dan transisi:** gambar hero melayang (`@keyframes float`), kartu menu terangkat saat di-hover, transisi warna pada tombol dan tema, badge jumlah pesanan membesar sebentar (`@keyframes pop`).
- **Status tombol** digayakan lewat selektor atribut seperti `[aria-pressed="true"]`.
- **Aksesibilitas:** `:focus-visible` jelas, kontras warna memadai, dan `prefers-reduced-motion` mematikan animasi bagi pengguna yang memintanya.
- Header dibuat `position: sticky` agar navigasi selalu terjangkau.

## Penjelasan fungsionalitas JavaScript

Tiga teknik yang diterapkan (semuanya ada di `js/script.js`):

| No | Teknik | Penerapan | Kode kunci |
|----|--------|-----------|------------|
| 1 | **Event Handling** | Klik tombol tema, tombol menu mobile, filter kategori, tombol "Tambah" pada menu, dan tombol "Pesan via WhatsApp" | `addEventListener("click", ...)` |
| 2 | **DOM Manipulation** | Kartu menu dibuat dari array data; ringkasan pesanan (daftar item), badge jumlah, dan total harga diperbarui otomatis; tombol pesan dan teks kosong diatur lewat `disabled` dan `hidden` | `createElement`, `append`, `textContent`, `setAttribute`, `querySelectorAll` |
| 3 | **Style & Animation** | Tema gelap/terang diganti lewat `dataset.theme`; badge pesanan diberi kelas `pop` untuk memutar animasi CSS; tombol "Dipilih" dan filter aktif berubah gaya lewat atribut | `dataset.theme`, `classList.add/remove`, CSS `transition` dan `@keyframes` |

**Alur kerja fitur menu (contoh untuk presentasi):**
1. Data menu disimpan dalam array `menu`.
2. Fungsi `render(kategori)` menyaring array, lalu membuat kartu dengan `createElement`.
3. Tombol filter memanggil `render()` dengan kategori yang dipilih (event handling).
4. Tombol "Tambah" memasukkan id menu ke `cart` (sebuah `Set`), lalu `updateCart()` menghitung jumlah dan total harga, membuat ulang daftar "Ringkasan pesanan", dan memutar animasi `pop` pada badge.
5. Tombol "Pesan via WhatsApp" aktif saat ada menu dipilih. Saat diklik, JavaScript menyusun teks pesanan dan membuka `https://wa.me/NOMOR?text=...` sehingga pesan siap dikirim ke kedai.

> Nomor WhatsApp kedai diatur di konstanta `NOMOR_WA` pada bagian atas `js/script.js` (format `62812...`, tanpa `+`).

## Validasi standar

Kode ditulis mengikuti HTML5 dan CSS3. Validasi dapat dicek di:
- https://validator.w3.org/ (HTML)
- https://jigsaw.w3.org/css-validator/ (CSS)

## Sumber

Kode dan teks dibuat untuk tugas ini. Foto hero: (isi sumber dan fotografer, misalnya Unsplash/Pexels). Font memakai Google Fonts (lisensi terbuka).
