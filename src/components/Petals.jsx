import { useState } from 'react';

// Kelopak bunga berjatuhan. Posisi acak dibuat SEKALI (useState dengan fungsi awal),
// agar tidak berubah setiap render.
export default function Petals({ count = 12 }) {
  const [petals] = useState(() =>
    Array.from({ length: count }, () => ({
      left: Math.random() * 100,
      dx: Math.random() * 90 - 45,
      duration: 10 + Math.random() * 8,
      delay: -Math.random() * 14,
      scale: 0.7 + Math.random() * 0.8,
    }))
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute -top-6 h-[15px] w-[11px] animate-fall rounded-[70%_0_70%_0] bg-petal opacity-75"
          style={{
            left: `${p.left}%`,
            '--dx': `${p.dx}px`, // dibaca oleh @keyframes fall di index.css
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            scale: p.scale,
          }}
        />
      ))}
    </div>
  );
}
