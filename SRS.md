# Software Requirements Specification (SRS)
## Website Kopi Lereng, versi 1.0

## 1. Pendahuluan
### 1.1 Tujuan
Dokumen ini menjelaskan kebutuhan website Kopi Lereng, situs statis kedai kopi yang menampilkan profil dan menu serta memungkinkan pengunjung menyusun dan mengirim pesanan.
### 1.2 Lingkup
Website statis (HTML, CSS, JavaScript) dengan dua halaman, di-hosting di GitHub Pages. Tidak ada basis data atau server aplikasi; pesanan dikirim lewat WhatsApp.
### 1.3 Definisi
| Istilah | Arti |
|---|---|
| SRS | Software Requirements Specification |
| DOM | Document Object Model, representasi halaman yang dapat diubah JavaScript |
| Pengunjung | Pengguna yang membuka website |

## 2. Deskripsi Umum
### 2.1 Perspektif produk
Produk mandiri, berjalan di peramban modern (Chrome, Firefox, Edge, Safari).
### 2.2 Pengguna
Pengunjung umum (calon pelanggan), tanpa perlu login.
### 2.3 Batasan
- Hanya teknologi sisi klien.
- Hosting GitHub Pages (konten statis); pesanan tidak disimpan di server, melainkan diteruskan lewat tautan WhatsApp.
- Data menu disimpan sebagai array di `js/script.js`.
### 2.4 Asumsi
Pengunjung memakai peramban dengan JavaScript aktif; WhatsApp tersedia di perangkat untuk mengirim pesanan.

## 3. Kebutuhan Fungsional
| ID | Kebutuhan |
|---|---|
| FR-01 | Sistem menampilkan dua halaman: Beranda dan Tentang Kami. |
| FR-02 | Setiap halaman memiliki header berisi judul dan deskripsi singkat. |
| FR-03 | Sistem menyediakan menu navigasi ke seluruh halaman dan menandai halaman aktif. |
| FR-04 | Sistem menampilkan daftar menu sebagai kartu yang dibuat dinamis lewat JavaScript. |
| FR-05 | Pengunjung dapat memfilter menu berdasarkan kategori (Semua, Kopi, Non-kopi, Camilan). |
| FR-06 | Pengunjung dapat menambah atau membatalkan menu dari daftar pesanan; jumlah dan total harga diperbarui otomatis. |
| FR-07 | Sistem menampilkan ringkasan pesanan (daftar menu terpilih dan total harga) dan menonaktifkan tombol pesan saat belum ada menu dipilih. |
| FR-08 | Pengunjung dapat mengirim pesanan lewat tombol "Pesan via WhatsApp"; sistem membuka WhatsApp dengan teks pesanan yang sudah tersusun. |
| FR-09 | Pengunjung dapat beralih tema terang/gelap. |
| FR-10 | Di layar sempit, navigasi dapat dibuka dan ditutup lewat tombol Menu. |
| FR-11 | Sistem memberi umpan balik visual berupa animasi: gambar hero bergerak, kartu menu terangkat saat di-hover, dan badge jumlah pesanan membesar saat jumlah berubah. |

## 4. Kebutuhan Non-Fungsional
| ID | Kategori | Kebutuhan |
|---|---|---|
| NFR-01 | Kegunaan | Teks mudah dibaca, panjang baris terkendali, kontras warna memadai. |
| NFR-02 | Responsif | Tampilan nyaman pada lebar 360px sampai desktop. |
| NFR-03 | Aksesibilitas | Navigasi keyboard, fokus terlihat, atribut ARIA pada tombol interaktif, dukung `prefers-reduced-motion`. |
| NFR-04 | Kinerja | Halaman memuat kurang dari 3 detik pada koneksi normal; tanpa framework berat. |
| NFR-05 | Kompatibilitas | Mendukung peramban modern dua versi terakhir. |
| NFR-06 | Standar | Kode lolos validator W3C HTML dan CSS. |
| NFR-07 | Keamanan | Teks dirender dengan `textContent` untuk mencegah injeksi HTML. |

## 5. Antarmuka
- **Antarmuka pengguna:** navbar tetap di atas, hero, kartu menu, ringkasan pesanan, footer.
- **Antarmuka data:** array `menu` berisi objek `{id, nama, kategori, harga, deskripsi}`.
- **Antarmuka perangkat lunak:** DOM API dan Event API bawaan peramban; tautan `wa.me` untuk membuka WhatsApp.

## 6. Use Case
| Use case | Aktor | Alur utama |
|---|---|---|
| UC-01 Lihat menu | Pengunjung | Buka Beranda, sistem menampilkan menu, pengunjung memilih filter. |
| UC-02 Susun pesanan | Pengunjung | Tekan "Tambah" pada menu, sistem memperbarui jumlah, ringkasan, dan total. |
| UC-03 Pesan lewat WhatsApp | Pengunjung | Pilih menu, periksa ringkasan, tekan "Pesan via WhatsApp"; WhatsApp terbuka dengan pesan siap kirim. |
| UC-04 Ganti tema | Pengunjung | Tekan "Tema", tampilan berganti terang/gelap. |

## 7. Pengujian (acceptance)
| Kasus | Langkah | Hasil diharapkan |
|---|---|---|
| T-01 | Buka Beranda | 7 kartu menu tampil |
| T-02 | Klik filter "Kopi" | Hanya 3 kartu kopi tampil |
| T-03 | Tambah 2 menu | Badge bernilai 2 dan membesar sebentar, ringkasan dan total sesuai |
| T-04 | Tekan "Pesan via WhatsApp" setelah memilih menu | WhatsApp terbuka, teks berisi daftar menu dan total |
| T-05 | Buka Beranda tanpa memilih menu | Tombol pesan nonaktif, teks "Belum ada menu dipilih" tampil |
| T-06 | Klik "Tema" | Warna halaman berganti gelap/terang |
| T-07 | Ubah lebar layar < 760px | Tombol Menu muncul, grid satu kolom |
