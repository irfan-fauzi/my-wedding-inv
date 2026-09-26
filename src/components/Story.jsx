import Reveal from './Reveal';
import { Section, SectionTitle } from './ui';
import { CONFIG } from '../data/config';

// Timeline: garis vertikal & titik dibuat dengan pseudo-element (before:)
export default function Story() {
  return (
    <Section id="story" nav="couple" alt>
      <SectionTitle label="Perjalanan kami">Cerita Kami</SectionTitle>

      <div className="relative mt-[34px] pl-[30px] text-left before:absolute before:top-2 before:bottom-2 before:left-[7px] before:w-0.5 before:bg-line before:content-['']">
        {CONFIG.story.map((s, index) => (
          <Reveal
            key={s.when}
            className="relative pb-7 last:pb-0 before:absolute before:top-[5px] before:-left-[30px] before:size-4 before:rounded-full before:border-[3px] before:border-alt before:bg-accent before:content-['']"
          >
            <time className="font-serif text-[1.1rem] font-semibold text-brass">{s.when}</time>
            {s.image && (
              <Reveal
                from={index % 2 === 0 ? 'left' : 'right'}
                className="mt-3 aspect-video overflow-hidden rounded-xl"
              >
                <img
                  src={s.image}
                  alt={`Momen ${s.title.toLowerCase()}`}
                  decoding="async"
                  className="size-full object-cover"
                />
              </Reveal>
            )}
            <h3 className="font-serif text-[1.4rem] leading-tight font-semibold mt-3">{s.title}</h3>
            <p className="mt-1 text-[.98rem] text-muted">{s.text}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
