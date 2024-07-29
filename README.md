# ⚡️ Notes  Application⚡️

NotesList adalah aplikasi berbasis web untuk mencatat dan mengelola catatan. Proyek ini menggunakan Next.js sebagai framework frontend, Prisma untuk ORM, dan Neon DB (PostgreSQL) sebagai database. UI dibuat dengan shadcnui dan Tailwind CSS. Data diambil dan dikirim menggunakan Axios, dan React Hook Form digunakan untuk manajemen form.


### 📃 Fitur


- CRUD Catatan: Buat, baca, perbarui, dan hapus catatan.
- Mencari catatan berdasarkan title
- UI Responsif: Desain antarmuka yang responsif dan ramah pengguna.



## 🧑🏻‍💻 Author

- [@Muhammad Rifqi Setiawan](https://github.com/rifqi142)


## 📚 Tech 

- Next.js: Framework React untuk pengembangan aplikasi web.
- Prisma: ORM untuk bekerja dengan database PostgreSQL.
- Neon DB (PostgreSQL): Database yang digunakan untuk menyimpan data.
- shadcnui: Komponen UI.
- Tailwind CSS: Framework CSS untuk styling.
- Axios: Library untuk melakukan permintaan HTTP.
- React Hook Form: Library untuk manajemen form di React.
- React Hot Toast: Library untuk menampilkan notifikasi toast yang stylish dan mudah digunakan.


## ⚙️ Installation

Clone Repository ini:

```bash
  https://github.com/rifqi142/notes-app-phincon.git
```
Install Dependencies:
```bash
  cd repo
  npm install
```
Setup environment variables:
```bash
  DATABASE_URL=your_neon_db_connection_string
```
Generate Prisma Client:
```bash
  npx prisma generate
```
Jalankan migration untuk membuat tabel di database:
```bash
  npx prisma migrate dev
```

##  💿 Menjalankan Project
Untuk menjalankan proyek secara lokal, gunakan perintah berikut:

```bash
  npm run dev

```
Aplikasi akan berjalan di http://localhost:3000.
Silahkan buka link tersebut di browser anda atau dapat menggunakan CTRL + Click.


##  📲API End Point

### POST/api/notes
#### Membuat Catatan Baru
 ##### Request Body: 
 - ncategory (string): Kategori catatan (wajib). 
 - ntitle (string): Judul catatan (wajib).
 - ndescription (string): Deskripsi catatan (wajib).
 ##### Response
- 201 Created: Catatan berhasil dibuat.
- 400 Bad Request: Jika ada data yang hilang atau tidak valid.

### GET /api/notes
#### Membuat Catatan Baru
 ##### Response
- 200 Created: Catatan berhasil dibuat.

### DELETE /api/notes/[id]
#### Membuat Catatan Baru
 ##### Response
- 200 OK: Catatan berhasil dihapus.
- 400 Bad Request: Jika ada data yang hilang atau tidak valid.

### PATCH /api/notes/[id]
#### Membuat Catatan Baru
 ##### Request Body: 
 - ncategory (string): Kategori catatan (wajib). 
 - ntitle (string): Judul catatan (wajib).
 - ndescription (string): Deskripsi catatan (wajib).
 ##### Response
- 200 OK: Catatan berhasil diperbarui.
- 400 Bad Request: Jika ada data yang hilang atau tidak valid.


## 🕹 Contoh Penggunaan

Berikut adalah contoh bagaimana aplikasi ini bekerja:
- Buat Catatan Baru: Pengguna dapat membuat catatan baru dengan memasukkan kategori, judul, dan deskripsi.
- Lihat Semua Catatan: Pengguna dapat melihat semua catatan yang telah dibuat dalam urutan waktu pembuatan.
- Perbarui Catatan: Pengguna dapat memperbarui informasi catatan yang ada.
- Hapus Catatan: Pengguna dapat menghapus catatan yang tidak diperlukan lagi.
