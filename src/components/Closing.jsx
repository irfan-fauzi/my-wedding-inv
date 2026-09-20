import Sprig from './Sprig';
import Reveal from './Reveal';
import { Lead } from './ui';
import { CONFIG } from '../data/config';

export default function Closing() {
  return (
    <section data-nav="rsvp" className="relative overflow-hidden bg-closing px-6 pt-20 pb-[140px] text-center">
      <Sprig className="-bottom-2.5 -left-[18px] w-[110px] rotate-[15deg] text-accent opacity-[.28]" />
      <Sprig className="-right-[18px] -bottom-2.5 w-[110px] -rotate-[15deg] text-accent opacity-[.28]" />

      <p lang="ar" dir="rtl" className="mb-1.5 font-arabic text-[1.6rem] leading-[1.6] text-brass">
        إِنْ شَاءَ ٱللَّٰهُ
      </p>
      <Reveal>
        <Lead>
          Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
        </Lead>
      </Reveal>
      <Reveal as="p" className="mt-5 font-serif text-[1.25rem] italic">
        Wassalamu'alaikum Warahmatullahi Wabarakatuh
      </Reveal>

      <p className="mt-[22px] text-[.92rem] text-muted">Kami yang berbahagia,</p>
      <p className="mt-3 mb-1 font-script text-[3.6rem] leading-[1.1] text-brass">
        {CONFIG.groom.nick} &amp; {CONFIG.bride.nick}
      </p>
      <p className="text-[.92rem] text-muted">Beserta keluarga besar</p>
      <p className="mt-9 text-[.85rem] text-muted">Undangan digital dengan React &amp; Tailwind CSS</p>
    </section>
  );
}
