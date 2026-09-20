import { useEffect, useState } from 'react';

// Hitung mundur menuju waktu `target` (ms). Diperbarui tiap detik.
export default function useCountdown(target) {
  const calc = () => {
    const diff = target - Date.now();
    if (diff <= 0) return { done: true, d: 0, h: 0, m: 0, s: 0 };
    const s = Math.floor(diff / 1000);
    return {
      done: false,
      d: Math.floor(s / 86400),
      h: Math.floor((s % 86400) / 3600),
      m: Math.floor((s % 3600) / 60),
      s: s % 60,
    };
  };

  const [time, setTime] = useState(calc);

  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id); // bersihkan saat komponen dilepas
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return time;
}
