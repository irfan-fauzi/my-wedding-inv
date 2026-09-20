import { useEffect, useMemo, useState } from 'react';

const KEY = 'undangan-ucapan-react-v1';
const hour = 3600e3;

// Ucapan contoh (hapus bila tidak diperlukan)
const SEED = [
  { name: 'Mr Smith & Mrs Smith', attend: 'hadir', msg: 'Selamat menempuh hidup baru! Semoga sakinah, mawaddah, warahmah. Barakallahu lakuma.', t: Date.now() - hour * 5 },
  { name: 'Keluarga Besar Batman', attend: 'hadir', msg: 'Bahagia sekali mendengar kabar ini. Sampai bertemu di hari H ya!', t: Date.now() - hour * 26 },
  { name: 'Rania', attend: 'tidak', msg: 'Maaf belum bisa hadir. Doa terbaik untuk kalian berdua, semoga lancar sampai hari H.', t: Date.now() - hour * 50 },
];

function load() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

// Menyimpan ucapan di localStorage perangkat pengunjung.
// Untuk mengumpulkan ucapan semua tamu, ganti bagian ini dengan fetch() ke backend Anda
// (mis. Google Apps Script, Supabase, atau Firebase).
export default function useWishes() {
  const [mine, setMine] = useState(load);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(mine)); } catch { /* abaikan */ }
  }, [mine]);

  const wishes = useMemo(() => [...mine, ...SEED].sort((a, b) => b.t - a.t), [mine]);

  const counts = useMemo(() => {
    const c = { hadir: 0, ragu: 0, tidak: 0 };
    wishes.forEach((w) => { if (c[w.attend] != null) c[w.attend] += 1; });
    return c;
  }, [wishes]);

  const add = (entry) => setMine((prev) => [entry, ...prev]);

  return { wishes, counts, add };
}
