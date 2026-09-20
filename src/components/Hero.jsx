import Sprig from './Sprig';
import Arch from './Arch';
import Petals from './Petals';
import useCountdown from '../hooks/useCountdown';
import { CONFIG, TARGET } from '../data/config';
import { fmtLong } from '../lib/format';
import { PH } from '../lib/placeholders';

const pad = (n) => String(n).padStart(2, '0');

export default function Hero({ opened }) {
  const time = useCountdown(TARGET);
  const dateLong = fmtLong.format(new Date(CONFIG.events[0].start));

  // Data hitung mundur sebagai array → di-render dengan .map()
  const units = [
    ['Hari', time.d],
    ['Jam', pad(time.h)],
    ['Menit', pad(time.m)],
    ['Detik', pad(time.s)],
  ];

  return (
    <section
      id="home"
      data-nav="home"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-hero px-6 pt-[60px] pb-[120px] text-center"
    >
      <Sprig className="-top-2 -left-[18px] w-[110px] rotate-[160deg] text-accent opacity-[.28]" />
      <Sprig className="-top-2 -right-[18px] w-[110px] rotate-[200deg] text-accent opacity-[.28]" />
      {opened && <Petals />}

      <p className="text-[.86rem] font-medium tracking-[.14em] text-accent">Kami menikah</p>
      <h2 className="my-1 font-script text-[clamp(3.4rem,15vw,4.6rem)] leading-[1.05] text-ink">
        {CONFIG.groom.nick} &amp; {CONFIG.bride.nick}
      </h2>

      <Arch
        src={CONFIG.couplePhoto || PH.couple}
        alt="Foto Rizky dan Anisa"
        className="mt-6 mb-[22px] w-[min(62%,232px)]"
      />

      <p className="font-serif text-2xl font-medium tracking-[.03em]">{dateLong}</p>

      <div className="relative z-[1] mx-auto mt-[22px] grid w-full max-w-[330px] grid-cols-4 gap-2">
        {time.done ? (
          <p className="col-span-full font-serif text-[1.3rem] text-brass">Hari bahagia telah tiba</p>
        ) : (
          units.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-line bg-surface px-0.5 pt-3 pb-[9px]">
              <b className="block font-serif text-[1.8rem] leading-[1.1] font-semibold text-brass tabular-nums">
                {value}
              </b>
              <span className="text-[.78rem] text-muted">{label}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
