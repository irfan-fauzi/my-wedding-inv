/* =========================================================
   DATA UNDANGAN — ubah file ini saja untuk mengganti isi undangan.
   Foto: taruh file di folder /public lalu isi mis. photo: '/pria.jpg'
   Kosongkan untuk memakai ilustrasi placeholder.
   Nama tamu: tambahkan ?to=Nama+Tamu di akhir link.
   ========================================================= */
export const CONFIG = {
  groom: {
    nick: "Irfan",
    full: "Irfan Fauzi Rahmatullah, A.Md.T",
    child: "Putra kedua",
    father: "Bapak Wardja S.Pd.",
    mother: "Ibu Oom Komariah",
    ig: "irfan.fw",
    photo: "/img/pria.webp",
  },
  bride: {
    nick: "Karlina",
    full: "Karlina Sri Mulyati, S.T.",
    child: "Putri ketiga",
    father: "(Alm) Bapak Drs. Karso Saintar Alma",
    mother: "Ibu Iroh Rohmaniah",
    ig: "karlinaasm",
    photo: "/img/wanita.webp",
  },
  coverPhoto: "/img/cover.webp", // foto sampul; kosong = ilustrasi placeholder
  couplePhoto: "/img/couple-first-page.webp",
  music: "/music/music.mp3", // alamat file mp3 (mis. '/musik.mp3'); kosong = nada lembut bawaan

  events: [
    {
      title: "Akad Nikah",
      start: "2027-04-03T08:00:00+07:00",
      end: "2027-04-03T10:00:00+07:00",
      time: "08.00 – 10.00 WIB",
      place: "",
      address: "Kelurahan Tonjong RT 01 RW 03 Kec.Majalengka Kab. Majalengka",
      mapQuery: "Kelurahan Tonjong RT 01 RW 03 Kec.Majalengka Kab. Majalengka",
    },
    {
      title: "Resepsi",
      start: "2027-04-03T08:00:00+07:00",
      end: "2027-04-03T10:00:00+07:00",
      time: "09.00 – selesai",
      address: "Kelurahan Tonjong RT 01 RW 03 Kec.Majalengka Kab. Majalengka",
      mapQuery: "Kelurahan Tonjong RT 01 RW 03 Kec.Majalengka Kab. Majalengka",
    },
  ],
  livestream: "", // link YouTube/Instagram Live bila ada
  dresscode:
    "Mohon hadir tepat waktu. Dress code: pakaian sopan dan rapi, warna bebas.",

  verse: {
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },

  story: [
    {
      when: "2024",
      title: "Pertama bertemu",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      when: "2025",
      title: "Memulai hubungan",
      text: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      when: "2026",
      title: "Lamaran",
      text: "Di hadapan keluarga tercinta, Irfan meminang Karlina dengan penuh kesungguhan.",
    },
    {
      when: "2027",
      title: "Hari bahagia",
      text: "Dengan restu orang tua, kami siap memulai perjalanan baru sebagai suami dan istri.",
    },
  ],

  gallery: [
    "/img/galeri-1.webp",
    "/img/galeri-2.webp",
    "/img/galeri-3.webp",
    "/img/galeri-4.webp",
  ], // daftar alamat foto; kosong = 6 placeholder

  bank: [
    { bank: "BCA", number: "1234567890", name: "Irfan fauzi rahmatullah" },
    { bank: "Mandiri", number: "1400012345678", name: "Karlina Sri Mulyati" },
  ],
  giftAddress: "Kelurahan Tonjong RT 01 RW 03 Kec.Majalengka Kab. Majalengka",
};

// Waktu acara pertama (untuk hitung mundur), dalam milidetik
export const TARGET = new Date(CONFIG.events[0].start).getTime();
