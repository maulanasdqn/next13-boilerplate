# Boilerplate Next.js 13

Selamat datang di Boilerplate Next.js 13! Boilerplate ini menyediakan pengaturan yang terstruktur untuk membangun aplikasi web menggunakan Next.js 13. Ini mencakup berbagai direktori untuk meningkatkan pengorganisasian kode dan pemeliharaan.

## Package yang Digunakan

- NextJs 13 (latest)
- Next-Auth
- Axios
- clsx
- ts-patterns
- Zod
- Tanstack React Query

## Struktur Direktori

Projek ini diorganisir dengan direktori-direktori berikut:

- `app`: Direktori ini berisi file inti aplikasi dan konfigurasi. Ini berfungsi sebagai titik masuk untuk aplikasi Next.js Anda.

- `components`: Di dalam direktori `components`, Anda akan menemukan struktur direktori yang mengikuti metodologi Atomic Design. Di sini Anda mengorganisasi komponen UI Anda, termasuk atom, molekul, organisme, template, dan komponen tingkat lebih tinggi lainnya.

- `entities`: Direktori `entities` dimaksudkan untuk tipe data atau interface yang bersifat domain-specific.

- `libs`: Di direktori `libs`, Anda dapat menempatkan fungsi utilitas, modul pembantu, dan kode lain yang dapat digunakan ulang di seluruh aplikasi.

- `modules`: Direktori `modules` adalah tempat Anda mengenkapsulasi logika, proses bisnis dan komponen berbasis fitur. Setiap modul bisa memiliki subdirektori sendiri, termasuk component, style, dan file lain yang relevan.

- `styles`: Direktori ini dimaksudkan untuk style global, seperti file CSS atau SCSS yang berlaku untuk seluruh aplikasi.

## Getting Started

Ikuti langkah-langkah berikut untuk memulai menggunakan Next.js 13 boilerplate:

1. **Clone repository:**

   ```
   git clone https://github.com/maulanasdqn/next13-boilerplate.git
   ```

2. **Akses direktori repository:**

   ```
   cd next3-boilerplate
   ```

3. **Install Package:**

   ```
   npm install
   ```
   
   ```
   yarn install
   ```
   
   ```
   bun install
   ```

5. **Jalankan pada server dev local:**

   ```
   npm run dev
   ```
   
   ```
   yarn dev
   ```
   
   ```
   bun dev
   ```

   Aplikasi akan berjalan di http://localhost:3000.

## Command lain yang tersedia

**Menjalankan test:**

  ```  
  npm run test
  ```
  
  ```
  yarn test
  ```
  
  ```
  bun test
  ```
  
  ```
  bun test:run
  ````
**Menjalankan storybook:**

   ```
  npm run storybook
  ```
  
  ```
  yarn storybook
  ```
  
  ```
  bun storybook
  ```
  
