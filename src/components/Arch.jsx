// Bingkai foto berbentuk lengkung (arch). Lebar diatur lewat className.
export default function Arch({ src, alt, className = '', decor = true }) {
  return (
    // Pembungkus luar: tempat ornamen menempel. Tidak boleh overflow-hidden,
    // supaya bunga/daun bisa keluar sedikit dari bingkai.
    <div className={`relative z-[1] mx-auto aspect-[3/4] ${className}`}>
      {/* Bingkai foto: overflow-hidden hanya di sini agar foto terpotong mengikuti lengkungan */}
      <div className="size-full overflow-hidden rounded-t-full rounded-b-lg border-[6px] border-surface shadow-card dark:border-brass">
        <img src={src} alt={alt} className="size-full object-cover" />
      </div>

      {decor && (
        <>
          {/* Kiri-atas: mengikuti bahu lengkungan */}
          <svg
            viewBox="0 0 120 120"
            aria-hidden="true"
            className="pointer-events-none absolute -top-[2%] -left-[2%] h-auto w-[42%] overflow-visible text-accent"
          >
            <use href="#floral" />
          </svg>

          {/* Kanan-bawah: ornamen yang sama, diputar 180° */}
          <svg
            viewBox="0 0 120 120"
            aria-hidden="true"
            className="pointer-events-none absolute -right-[10%] -bottom-[4%] h-auto w-[42%] rotate-180 overflow-visible text-accent"
          >
            <use href="#floral" />
          </svg>
        </>
      )}
    </div>
  );
}
