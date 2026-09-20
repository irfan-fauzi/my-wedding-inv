import FixedCol from './FixedCol';
import Icon from './Icon';

// Dua tombol bulat di kanan bawah: ganti tema & putar/jeda musik
export default function Dock({ opened, onToggleTheme, playing, onToggleMusic }) {
  const btn =
    'pointer-events-auto grid size-11 place-items-center rounded-full border border-line bg-nav text-accent shadow-[0_8px_20px_-8px_rgba(0,0,0,.5)] backdrop-blur-[10px]';

  return (
    <FixedCol
      className={`bottom-[calc(84px+env(safe-area-inset-bottom))] flex flex-col items-end gap-2.5 px-3.5 transition-opacity delay-1000 duration-[600ms] ${opened ? 'opacity-100' : 'opacity-0'}`}
    >
      <button type="button" className={btn} onClick={onToggleTheme} aria-label="Ganti tema terang/gelap">
        <Icon name="contrast" className="size-[22px]" />
      </button>

      <button type="button" className={btn} onClick={onToggleMusic} aria-label="Putar atau jeda musik" aria-pressed={playing}>
        <Icon name="music" className={`size-[22px] ${playing ? 'animate-spin-slow' : ''}`}>
          {/* coretan diagonal saat musik mati */}
          {!playing && <path d="M3 3l18 18" />}
        </Icon>
      </button>
    </FixedCol>
  );
}
