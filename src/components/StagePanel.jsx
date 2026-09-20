import Sprig from './Sprig';
import { CONFIG } from '../data/config';
import { fmtLong } from '../lib/format';

// Panel dekoratif di sisi kiri. Hanya tampil di desktop (hidden → desk:flex).
export default function StagePanel() {
  const dateLong = fmtLong.format(new Date(CONFIG.events[0].start));
  return (
    <aside
      aria-hidden="true"
      className="fixed inset-y-0 left-0 right-[var(--col)] hidden items-center justify-center overflow-hidden bg-stage p-10 text-center text-cream desk:flex"
    >
      <Sprig className="-bottom-5 left-[8%] w-[150px] rotate-[12deg] text-cream opacity-[.16]" />
      <Sprig className="-top-[30px] right-[6%] w-[190px] rotate-[190deg] text-cream opacity-[.16]" />
      <div className="relative max-w-[520px]">
        <p className="text-[.86rem] font-medium tracking-[.14em] text-[#cfe0c0]">Undangan Pernikahan</p>
        <h2 className="mt-2.5 mb-1.5 font-script text-[clamp(4rem,7vw,6.4rem)] leading-[1.05]">
          {CONFIG.groom.nick} &amp; {CONFIG.bride.nick}
        </h2>
        <p className="font-serif text-2xl tracking-[.04em]">{dateLong}</p>
        <p className="mt-[26px] text-[.95rem] opacity-75">
          Buka undangan ini dari ponsel untuk pengalaman terbaik.
        </p>
      </div>
    </aside>
  );
}
