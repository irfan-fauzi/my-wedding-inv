import Arch from './Arch';
import Reveal from './Reveal';
import Icon from './Icon';
import { Section, Lead, Ornament } from './ui';
import { CONFIG } from '../data/config';
import { PH } from '../lib/placeholders';
import Birds from './Birds';

// Satu kartu mempelai. `person` = data dari config, `fallback` = foto placeholder
function Person({ person, fallback }) {
  return (
    <Reveal as="article" className="text-center">
      <Arch
        src={person.photo || fallback}
        alt={`Foto ${person.nick}`}
        className="mb-4 w-[min(64%,210px)]"
      />
      <h3 className="font-script text-[2.6rem] leading-[1.2] font-normal text-brass">{person.nick}</h3>
      <p className="font-serif text-[1.4rem] font-semibold">{person.full}</p>
      <p className="mx-auto mt-1.5 max-w-[30ch] text-[.95rem] text-muted">
        {person.child} dari 
      </p>
      <p className="mx-auto mt-1.5 max-w-[30ch] text-[.95rem] text-muted">
         {person.father} &amp; {person.mother}
      </p>
      <a
        href={`https://instagram.com/${encodeURIComponent(person.ig)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Instagram ${person.nick}`}
        className="mt-2.5 inline-flex min-h-11 items-center gap-1.5 text-[.92rem] font-medium text-accent no-underline"
      >
        <Icon name="instagram" className="size-[18px]" />@{person.ig}
      </a>
    </Reveal>
  );
}

export default function Couple() {
  const { groom, bride, verse } = CONFIG;
  return (
    <Section id="couple">
      <Birds speed={2} size={[20, 36]} className="text-brass" />
      <p lang="ar" dir="rtl" className="mb-1.5 font-arabic text-[1.9rem] leading-[1.6] text-brass">
        بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ
      </p>
      <p className="mb-2.5 font-serif text-[1.25rem] italic">Assalamu'alaikum Warahmatullahi Wabarakatuh</p>
      <Reveal>
        <Lead>
          Tanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam acara pernikahan kami.
        </Lead>
      </Reveal>

      <div className="mt-[38px] flex flex-col items-center gap-2">
        <Person person={groom} fallback={PH.groom} />
        <div aria-hidden="true" className="my-1.5 font-script text-[3.2rem] leading-none text-brass">&amp;</div>
        <Person person={bride} fallback={PH.bride} />
      </div>

      <Reveal as="figure" className="mt-[46px]">
        <Ornament />
        <blockquote className="font-serif text-[1.15rem] leading-[1.75] italic">{verse.text}</blockquote>
        <cite className="mt-3 block text-[.88rem] font-medium text-accent not-italic">{verse.source}</cite>
      </Reveal>
    </Section>
  );
}
