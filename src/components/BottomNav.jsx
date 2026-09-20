import FixedCol from './FixedCol';
import Icon from './Icon';
import useActiveSection from '../hooks/useActiveSection';

// [id section, label, nama ikon]
const ITEMS = [
  ['home', 'Beranda', 'home'],
  ['couple', 'Mempelai', 'heart'],
  ['events', 'Acara', 'calendar'],
  ['gallery', 'Galeri', 'image'],
  ['gift', 'Hadiah', 'gift'],
  ['rsvp', 'Ucapan', 'chat'],
];

// Menu melayang di bawah. Link #anchor menggulir halus karena <html> memakai class scroll-smooth.
export default function BottomNav({ opened }) {
  const active = useActiveSection();

  return (
    <FixedCol
      className={`bottom-0 px-3 pb-[calc(12px+env(safe-area-inset-bottom))] transition-transform delay-500 duration-[800ms] ease-[cubic-bezier(.2,.8,.2,1)] ${opened ? 'translate-y-0' : 'translate-y-[130%]'}`}
    >
      <nav
        aria-label="Navigasi undangan"
        className="pointer-events-auto mx-auto flex max-w-[420px] justify-between gap-0.5 rounded-[22px] border border-line bg-nav p-1.5 shadow-[0_12px_32px_-12px_rgba(0,0,0,.5)] backdrop-blur-[12px]"
      >
        {ITEMS.map(([id, label, icon]) => (
          <a
            key={id}
            href={`#${id}`}
            className={`flex min-h-12 flex-1 flex-col items-center gap-px rounded-2xl px-0.5 pt-[7px] pb-1.5 text-[.68rem] font-medium no-underline ${active === id ? 'bg-alt text-accent' : 'text-muted'}`}
          >
            <Icon name={icon} className="size-[21px]" />
            {label}
          </a>
        ))}
      </nav>
    </FixedCol>
  );
}
