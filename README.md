# Undangan Pernikahan Digital (React + Tailwind CSS)

Versi React dari undangan HTML/CSS/JS. Tampilan dan fitur sama; kodenya dipecah
menjadi komponen kecil dan gaya ditulis dengan class Tailwind.

## Menjalankan

```bash
npm install
npm run dev      # buka alamat yang muncul (mis. http://localhost:5173)
npm run build    # hasil produksi ada di folder dist/
```

Butuh Node.js 20 atau lebih baru. Coba juga `http://localhost:5173/?to=Budi+Santoso`.

## Mengganti isi undangan

Edit **`src/data/config.js`**: nama, tanggal, lokasi, cerita, rekening, ayat.
Foto & musik: taruh di folder `public/`, lalu isi `photo: '/pria.jpg'` atau `music: '/musik.mp3'`.
Warna tema: ubah token di **`src/index.css`** (bagian `:root` dan `.dark`).

## Struktur folder

```
src/
├─ main.jsx            titik masuk React
├─ App.jsx             menyusun semua komponen + state "sudah dibuka?"
├─ index.css           Tailwind, token warna, font, animasi kustom
├─ data/config.js      SEMUA isi undangan
├─ components/
│  ├─ Cover, Hero, Couple, Story, Events, Gallery, Gift, Rsvp, Closing   (per bagian)
│  ├─ Dock, BottomNav, StagePanel                                        (navigasi & panel)
│  └─ Button, Icon, Reveal, Arch, Sprig, Petals, Toast, ui               (bagian reusable)
├─ hooks/              logika yang dipisah dari tampilan
│  ├─ useGuestName     baca ?to= dari URL
│  ├─ useCountdown     hitung mundur
│  ├─ useInView        animasi muncul saat di-scroll
│  ├─ useActiveSection menu bawah yang aktif
│  ├─ useTheme         terang/gelap
│  ├─ useMusic         musik latar (WebAudio / mp3)
│  └─ useWishes        ucapan tamu (localStorage)
└─ lib/                fungsi bantu (format tanggal, clipboard, placeholder foto)
```

## Urutan belajar yang disarankan

1. `src/data/config.js`  : data biasa (objek & array JavaScript).
2. `components/Hero.jsx` : komponen, props, `.map()` untuk daftar, class Tailwind.
3. `components/ui.jsx` dan `Button.jsx` : komponen kecil yang dipakai berulang.
4. `hooks/useCountdown.js` : `useState` + `useEffect` (dengan cleanup).
5. `components/Rsvp.jsx` : form terkontrol (controlled form) dan state.
6. `components/Toast.jsx` : Context API (berbagi fungsi tanpa lempar props).
7. `App.jsx` : menyatukan semuanya.

## Peta konsep: HTML/JS biasa → React

| Versi lama                                   | Versi React                              |
|----------------------------------------------|------------------------------------------|
| `document.querySelector(...).textContent = x`| `{x}` di dalam JSX                        |
| `innerHTML = list.map(...).join('')`         | `{list.map(item => <Card key=... />)}`    |
| `element.classList.add('hide')`              | class kondisional: `` `${opened ? 'hide' : ''}` `` |
| `addEventListener('click', ...)`             | `onClick={...}`                           |
| variabel global penyimpan status             | `useState`                                |
| `setInterval` / `IntersectionObserver` manual| `useEffect` di dalam custom hook          |
| CSS di `<style>` + class buatan sendiri      | class utilitas Tailwind langsung di JSX   |

## Catatan Tailwind v4

- Tidak ada `tailwind.config.js`. Pengaturan tema ada di `index.css` (`@theme`).
- Warna mode gelap memakai variabel CSS (`bg-page`, `text-ink`, `border-line`),
  jadi tidak perlu menulis `dark:` di setiap elemen. Tombol tema hanya
  menambah/menghapus class `dark` di `<html>`.
- `desk:` adalah breakpoint kustom 900px (layout dua kolom di desktop).
- Ucapan RSVP tersimpan di localStorage perangkat pengunjung. Untuk mengumpulkan
  ucapan semua tamu, sambungkan `hooks/useWishes.js` ke backend (Google Apps Script, Supabase, dll).
