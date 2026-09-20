import { useEffect, useState } from 'react';

// Menandai bagian yang sedang tampil di tengah layar (untuk menu bawah).
// Setiap <section> memiliki atribut data-nav="id-menu".
export default function useActiveSection() {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.nav); }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    document.querySelectorAll('[data-nav]').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return active;
}
