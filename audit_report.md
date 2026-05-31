# LAPORAN AUDIT FRONTEND - DIGITALANCE

**Auditor:** Jules (Senior Frontend Engineer)
**Tanggal:** {{ date('Y-m-d') }}
**Status:** Audit Tahap 1 Selesai

---

## RINGKASAN TEMUAN

| Severity | Jumlah | Status |
| :--- | :---: | :--- |
| 🔴 Critical | 1 | Perlu Segera Dipindahkan |
| 🟠 High | 4 | Masalah Aksesibilitas & Redundansi |
| 🟡 Medium | 3 | Konsistensi UI/UX |
| 🔵 Low | 2 | Perapian Kode |

---

## TEMUAN AUDIT DETAIL

### 1. Pelanggaran Arsitektur: Database Query di View
*   **File:** `resources/views/layouts/dashboard.blade.php`
*   **Lokasi:** Baris 60-80 (Blok `@php` notifikasi)
*   **Severity:** 🔴 **Critical**
*   **Penyebab:** Query `Notification::where(...)->delete()` dan `Notification::get()` dijalankan langsung di dalam layout Blade.
*   **Dampak:** Melanggar prinsip Separation of Concerns (SoC). Setiap render halaman memicu write/read ke DB. Memperlambat TTFB dan menyulitkan pengujian.
*   **Solusi:** Pindahkan logika pengambilan dan pembersihan notifikasi ke **View Composer** atau **Middleware**.

### 2. Inkonsistensi Interaksi: Duplikasi Logika JS Admin
*   **File:** `resources/views/dashboard/admin/dashboard.blade.php` & `public/js/dashboard/admin/dashboard.js`
*   **Lokasi:** Script block di bawah Blade vs File JS Eksternal.
*   **Severity:** 🟠 **High**
*   **Penyebab:** Fungsi `processVerification` dan `openVerificationDetail` didefinisikan ulang di dalam Blade, menimpa/mendahului logika di file JS eksternal.
*   **Dampak:** Perubahan pada file JS tidak akan berefek karena tertutup oleh inline script. Bug yang diperbaiki di satu tempat mungkin tetap muncul di tempat lain.
*   **Solusi:** Hapus seluruh inline script JS di Blade dashboard admin dan konsolidasikan ke `public/js/dashboard/admin/dashboard.js`. Gunakan `data-attributes` untuk passing URL/Data dari Blade ke JS.

### 3. Masalah Aksesibilitas: Focus Trap pada Drawer
*   **File:** `resources/views/components/notification-drawer.blade.php`
*   **Lokasi:** Aside element `id="notif-panel"`
*   **Severity:** 🟠 **High**
*   **Penyebab:** Drawer hanya disembunyikan dengan `translate-x-full`. Elemen di dalamnya tetap dapat di-tab oleh keyboard meskipun tidak terlihat.
*   **Dampak:** Pengguna keyboard/screen reader akan masuk ke "ghost menu" saat menavigasi halaman utama.
*   **Solusi:** Tambahkan atribut `x-show` (AlpineJS) atau manipulasi `visibility: hidden` dan `aria-hidden="true"` saat drawer tertutup.

### 4. Konflik Layering: Inkonsistensi Z-index
*   **File:** `resources/views/components/sidebar.blade.php` & `resources/views/layouts/dashboard.blade.php`
*   **Lokasi:** CSS class `z-[60]` (Sidebar) vs `z-30` (Overlay).
*   **Severity:** 🟠 **High**
*   **Penyebab:** Nilai z-index ditentukan secara manual dan tidak sinkron antar komponen (Sidebar, Notification Drawer, Modals, Toast).
*   **Dampak:** Elemen seperti Header atau Dashboard Card bisa muncul "di atas" overlay sidebar atau di bawah modal tertentu.
*   **Solusi:** Terapkan standar z-index sistem. Contoh:
    - Overlay: 40
    - Sidebar/Drawer: 50
    - Modal: 60
    - Toast: 100

### 5. Redundansi Styling: Duplikasi CSS Button
*   **File:** `public/css/dashboard/dashboard.css` & `public/css/dashboard/_shared.css`
*   **Lokasi:** Definisi `.btn-primary` dan `.btn-secondary`
*   **Severity:** 🟡 **Medium**
*   **Penyebab:** Pendefinisian ulang class utility di beberapa file CSS manual sementara Tailwind juga sudah dikonfigurasi dengan warna yang sama.
*   **Dampak:** "Specificity war" (CSS rebutan) dan ukuran file yang membengkak.
*   **Solusi:** Hapus definisi CSS manual untuk tombol. Gunakan Tailwind `@apply` di satu file CSS utama atau gunakan Laravel Blade Component `x-ui.button`.

---

## RENCANA IMPLEMENTASI PERBAIKAN

### Tahap 1: Pembersihan Arsitektur (Back-to-Front)
1.  **Notification Refactor:**
    - Buat `App\View\Composers\NotificationComposer`.
    - Daftarkan di `AppServiceProvider` untuk view `layouts.dashboard`.
    - Pindahkan logic `@php` dari layout ke Composer tersebut.
2.  **JS Consolidation:**
    - Pindahkan semua fungsi `window.*` dari `admin/dashboard.blade.php` ke `public/js/dashboard/admin/dashboard.js`.
    - Bersihkan inline script di Blade.

### Tahap 2: Standardisasi Layout & UI
1.  **Z-index Alignment:**
    - Update `sidebar.blade.php`, `notification-drawer.blade.php`, dan `dashboard.blade.php` untuk mengikuti urutan z-index yang seragam.
2.  **A11y Fixes:**
    - Integrasikan `window.DigitalanceUtils.focusTrap` ke Notification Drawer.
    - Sinkronkan status `aria-expanded` pada tombol hamburger.
3.  **Tailwind Theme Polish:**
    - Ganti kode warna hardcoded `#0f766e` dengan utility class `text-primary` atau `bg-primary` sesuai `tailwind.config.js`.

### Tahap 3: Optimasi Responsivitas
1.  **Header Search:**
    - Tambahkan `hidden md:flex` pada search bar di mobile atau buat mobile-only search trigger.
    - Berikan `min-w-0` pada kontainer nama user di header untuk mencegah overflow pada layar < 360px.
2.  **Table Handling:**
    - Pastikan semua `overflow-x-auto` pada tabel memiliki padding bottom yang cukup agar scrollbar tidak menutupi data terakhir.

---
*Laporan ini dibuat berdasarkan hasil audit statis dan analisis kode sumber.*
