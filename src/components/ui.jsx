// Potongan UI kecil yang dipakai di banyak section.

// Pembungkus <section>. `nav` = id menu bawah yang aktif saat section ini terlihat.
export function Section({ id, nav, alt = false, className = '', children }) {
  return (
    <section
      id={id}
      data-nav={nav ?? id}
      className={`relative px-6 py-[76px] text-center ${alt ? 'bg-alt' : ''} ${className}`}
    >
      {children}
    </section>
  );
}

// Label kecil + judul bertulisan sambung
export function SectionTitle({ label, children }) {
  return (
    <>
      <p className="text-[.86rem] font-medium tracking-[.14em] text-accent">{label}</p>
      <h2 className="mt-1.5 mb-1 font-script text-[clamp(2.6rem,11vw,3.3rem)] leading-[1.15] font-normal text-brass">
        {children}
      </h2>
    </>
  );
}

// Paragraf pembuka bergaya serif
export function Lead({ className = '', children }) {
  return (
    <p className={`mx-auto mt-3 max-w-[36ch] font-serif text-[1.2rem] leading-[1.7] text-ink ${className}`}>
      {children}
    </p>
  );
}

// Garis pemisah dengan ikon hati di tengah (pakai pseudo-element before:/after:)
export function Ornament() {
  return (
    <div
      className="mx-auto mt-[18px] mb-1.5 flex max-w-[220px] items-center justify-center gap-3.5 text-brass before:h-px before:flex-1 before:bg-current before:opacity-50 before:content-[''] after:h-px after:flex-1 after:bg-current after:opacity-50 after:content-['']"
    >
      <svg className="size-4 fill-current" aria-hidden="true">
        <use href="#heart" />
      </svg>
    </div>
  );
}
