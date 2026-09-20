import useInView from '../hooks/useInView';

// Membungkus elemen apa pun agar muncul halus (fade + naik sedikit) saat di-scroll.
// Contoh: <Reveal as="article" className="...">isi</Reveal>
export default function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const [ref, seen] = useInView();
  const state = seen
    ? 'translate-y-0 opacity-100'
    : 'translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100';

  return (
    <Tag
      ref={ref}
      {...props}
      className={`transition-[opacity,translate] duration-[900ms] ease-out motion-reduce:transition-none ${state} ${className}`}
    >
      {children}
    </Tag>
  );
}
