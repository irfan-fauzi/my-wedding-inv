/* =========================================================
   DATA UNDANGAN — ubah file ini saja untuk mengganti isi undangan.
   Foto: taruh file di folder /public lalu isi mis. photo: '/pria.jpg'
   Kosongkan untuk memakai ilustrasi placeholder.
   Nama tamu: tambahkan ?to=Nama+Tamu di akhir link.
   ========================================================= */
export const CONFIG = {
  groom: {
    nick: "Irfan",
    full: "Irfan Fauzi, A.md.T",
    child: "Putra kedua",
    father: "Bapak Wardja S.pd.",
    mother: "Ibu Oom Komariah",
    ig: "irfan.fw",
    photo: "",
  },
  bride: {
    nick: "Karlina",
    full: "Karlina Sri Mulyati, S.Kom.",
    child: "Putri ketiga",
    father: "(Alm) Bapak Karso S.pd.",
    mother: "Iroh Rohmaniah",
    ig: "karlinaasm",
    photo: "",
  },
  coverPhoto: "/img/cover.webp", // foto sampul; kosong = ilustrasi placeholder
  couplePhoto: "/img/couple-first-page.webp",
  music: "", // alamat file mp3 (mis. '/musik.mp3'); kosong = nada lembut bawaan

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
    "Mohon hadir tepat waktu. Dress code: warna earth tone (hijau sage, krem, dan cokelat muda).",

  verse: {
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
    source: "QS. Ar-Rum: 21",
  },

  story: [
    {
      when: "2019",
      title: "Pertama bertemu",
      text: "Kami dipertemukan di sebuah kegiatan kampus. Awalnya hanya saling menyapa, lalu berubah jadi obrolan yang tak pernah habis.",
    },
    {
      when: "2022",
      title: "Memulai hubungan",
      text: "Setelah tiga tahun berteman, kami sepakat melangkah lebih jauh dan saling menjaga.",
    },
    {
      when: "2025",
      title: "Lamaran",
      text: "Di hadapan keluarga tercinta, Rizky meminang Anisa dengan penuh kesungguhan.",
    },
    {
      when: "2026",
      title: "Hari bahagia",
      text: "Dengan restu orang tua, kami siap memulai perjalanan baru sebagai suami dan istri.",
    },
  ],

  gallery: [], // daftar alamat foto; kosong = 6 placeholder

  bank: [
    { bank: "BCA", number: "1234567890", name: "Rizky Pratama" },
    { bank: "Mandiri", number: "1400012345678", name: "Anisa Putri Maharani" },
    { bank: "DANA", number: "081234567890", name: "Anisa Putri Maharani" },
  ],
  giftAddress:
    "Anisa Putri Maharani, Jl. Kenanga No. 7, RT 03/RW 05, Jakarta Selatan 12345. Telp. 0812-3456-7890",
};

// Waktu acara pertama (untuk hitung mundur), dalam milidetik
export const TARGET = new Date(CONFIG.events[0].start).getTime();
