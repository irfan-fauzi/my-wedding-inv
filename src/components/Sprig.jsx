// Ornamen daun dekoratif. Atur posisi, ukuran, putaran, dan warna lewat className:
// <Sprig className="-left-4 top-0 w-[110px] rotate-[160deg] text-accent opacity-30" />
export default function Sprig({ className = '' }) {
  return (
    <svg
      viewBox="0 0 120 220"
      aria-hidden="true"
      className={`pointer-events-none absolute h-auto ${className}`}
    >
      <use href="#sprig" />
    </svg>
  );
}
