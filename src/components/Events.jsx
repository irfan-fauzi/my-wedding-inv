import Reveal from './Reveal';
import Button from './Button';
import Icon from './Icon';
import { Section, SectionTitle } from './ui';
import { CONFIG } from '../data/config';
import { calDate, fmtLong } from '../lib/format';

// Membuat link Google Maps & Google Calendar dari data acara
const mapsUrl = (e) =>
  'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(e.mapQuery || e.place);

const calendarUrl = (e) =>
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(`${e.title} ${CONFIG.groom.nick} & ${CONFIG.bride.nick}`)}` +
  `&dates=${calDate(e.start)}/${calDate(e.end)}` +
  `&location=${encodeURIComponent(`${e.place}, ${e.address}`)}` +
  `&details=${encodeURIComponent(`Undangan pernikahan ${CONFIG.groom.nick} & ${CONFIG.bride.nick}`)}`;

export default function Events() {
  return (
    <Section id="events">
      <SectionTitle label="Save the Date">Waktu &amp; Tempat</SectionTitle>

      <div className="mt-[34px] flex flex-col gap-[22px]">
        {CONFIG.events.map((e, i) => (
          <Reveal
            as="article"
            key={e.title}
            className="rounded-[22px] border border-line bg-surface px-[22px] py-[30px] shadow-card"
          >
            <div className="mx-auto mb-3 grid size-[54px] place-items-center rounded-full bg-alt text-accent">
              <Icon name={i === 0 ? 'star' : 'goblet'} className="size-[26px]" />
            </div>
            <h3 className="font-script text-[2.4rem] leading-[1.2] font-normal text-brass">{e.title}</h3>
            <p className="font-serif text-[1.3rem] font-semibold">{fmtLong.format(new Date(e.start))}</p>
            <p className="text-muted">{e.time}</p>
            <hr className="mx-auto my-4 h-px w-[70%] border-0 bg-line" />
            <p className="font-serif text-[1.3rem] leading-[1.3] font-semibold">{e.place}</p>
            <p className="mt-0.5 text-[.95rem] text-muted">{e.address}</p>

            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              <Button as="a" href={mapsUrl(e)} target="_blank" rel="noopener noreferrer">
                <Icon name="pin" className="size-[18px]" />
                Lihat peta
              </Button>
              <Button as="a" variant="ghost" href={calendarUrl(e)} target="_blank" rel="noopener noreferrer">
                <Icon name="calendar" className="size-[18px]" />
                Save the date
              </Button>
            </div>
          </Reveal>
        ))}
      </div>

      {CONFIG.livestream && (
        <div className="mt-5 flex justify-center">
          <Button as="a" variant="ghost" href={CONFIG.livestream} target="_blank" rel="noopener noreferrer">
            Tonton siaran langsung
          </Button>
        </div>
      )}

      <Reveal as="p" className="mx-auto mt-[26px] max-w-[34ch] text-[.95rem] text-muted">
        {CONFIG.dresscode}
      </Reveal>
    </Section>
  );
}
