// Tombol serbaguna. `as="a"` untuk tombol yang berupa link.
// Varian & ukuran dipisah supaya class Tailwind tidak saling bertabrakan.
const VARIANT = {
  solid: 'border-accent bg-accent text-accent-ink',
  ghost: 'border-accent bg-transparent text-accent',
  light: 'border-cream bg-cream text-[#22301f]',
};
const SIZE = {
  md: 'min-h-11 px-[22px] py-3 text-[.92rem]',
  sm: 'min-h-10 px-[18px] py-[9px] text-[.88rem]',
};

export default function Button({ as: Tag = 'button', variant = 'solid', size = 'md', className = '', ...props }) {
  const extra = Tag === 'button' ? { type: 'button' } : {};
  return (
    <Tag
      {...extra}
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-full border font-medium tracking-[.03em] no-underline transition-transform active:scale-[.97] ${VARIANT[variant]} ${SIZE[size]} ${className}`}
    />
  );
}
