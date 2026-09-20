import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';
import { Section, SectionTitle } from './ui';
import { CONFIG } from '../data/config';
import { PH } from '../lib/placeholders';

// Pola ukuran grid: foto ke-1 tinggi, ke-4 lebar, sisanya normal (diulang tiap 6 foto)
const SPANS = ['row-span-2', '', '', 'col-span-2', '', ''];

function Lightbox({ images, index, onClose, onChange }) {
  const touchX = useRef(0);
  const total = images.length;
  const go = (i) => onChange((i + total) % total);

  // Tombol keyboard: Esc, ←, →
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') go(index - 1);
      if (e.key === 'ArrowRight') go(index + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const arrow =
    'absolute grid size-12 place-items-center rounded-full bg-white/15 text-[1.7rem] leading-none text-white';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Pratinjau foto"
      className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(10,14,10,.94)] p-5"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => { touchX.current = e.changedTouches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
      }}
    >
      <button type="button" aria-label="Tutup" onClick={onClose} className={`${arrow} top-4 right-4`}>&times;</button>
      <button type="button" aria-label="Foto sebelumnya" onClick={() => go(index - 1)} className={`${arrow} top-1/2 left-3 -translate-y-1/2`}>&#8249;</button>
      <img src={images[index]} alt={`Foto galeri ${index + 1}`} className="max-h-[80svh] max-w-[92vw] rounded-xl object-contain" />
      <button type="button" aria-label="Foto berikutnya" onClick={() => go(index + 1)} className={`${arrow} top-1/2 right-3 -translate-y-1/2`}>&#8250;</button>
    </div>
  );
}

export default function Gallery() {
  const images = CONFIG.gallery.length ? CONFIG.gallery : [0, 1, 2, 3, 4, 5].map(PH.gallery);
  const [open, setOpen] = useState(null); // null = tertutup, angka = indeks foto

  return (
    <Section id="gallery" alt>
      <SectionTitle label="Momen bahagia">Galeri</SectionTitle>

      <div className="mt-[30px] grid auto-rows-[128px] grid-cols-2 gap-2.5">
        {images.map((src, i) => (
          <Reveal
            as="button"
            type="button"
            key={i}
            aria-label={`Buka foto ${i + 1}`}
            onClick={() => setOpen(i)}
            className={`relative overflow-hidden rounded-2xl bg-page ${SPANS[i % SPANS.length]}`}
          >
            <img src={src} alt={`Foto galeri ${i + 1}`} loading="lazy" className="size-full object-cover" />
          </Reveal>
        ))}
      </div>

      {open !== null && (
        <Lightbox images={images} index={open} onClose={() => setOpen(null)} onChange={setOpen} />
      )}
    </Section>
  );
}
