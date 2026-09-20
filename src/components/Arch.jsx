// Bingkai foto berbentuk lengkung (arch). Lebar diatur lewat className.
export default function Arch({ src, alt, className = '' }) {
  return (
    <div
      className={`relative z-[1] mx-auto aspect-[3/4] overflow-hidden rounded-t-full rounded-b-lg border-[6px] border-surface shadow-card ${className} dark:border-brass`}
    >
      <img src={src} alt={alt} className="size-full object-cover" />
    </div>
  );
}
