import { useEffect, useState } from 'react';

// Tema terang/gelap. Nilai awal: pilihan tersimpan, atau pengaturan sistem.
// Class "dark" dipasang di <html> sehingga token warna di index.css berganti.
export default function useTheme() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('undangan-tema');
      if (saved) return saved === 'dark';
    } catch { /* abaikan */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try { localStorage.setItem('undangan-tema', dark ? 'dark' : 'light'); } catch { /* abaikan */ }
  }, [dark]);

  return { dark, toggle: () => setDark((d) => !d) };
}
