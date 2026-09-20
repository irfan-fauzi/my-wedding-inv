import Reveal from './Reveal';
import Button from './Button';
import Icon from './Icon';
import { Section, SectionTitle, Lead } from './ui';
import { useToast } from './Toast';
import { CONFIG } from '../data/config';
import { copyText } from '../lib/clipboard';

export default function Gift() {
  const toast = useToast();

  const copy = async (text, okMessage) => {
    const ok = await copyText(text);
    toast(ok ? okMessage : 'Gagal menyalin, salin secara manual');
  };

  return (
    <Section id="gift">
      <SectionTitle label="Tanda kasih">Hadiah Pernikahan</SectionTitle>
      <Reveal>
        <Lead>
          Doa restu Anda adalah hadiah terbaik bagi kami. Bila ingin berbagi tanda kasih, Anda dapat mengirimkannya melalui:
        </Lead>
      </Reveal>

      <div className="mt-[30px] flex flex-col gap-4">
        {CONFIG.bank.map((b) => (
          <Reveal key={b.bank + b.number} className="rounded-[20px] bg-bank p-[22px] text-left text-[#f5f0e3] shadow-card">
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-semibold">{b.bank}</span>
              <span aria-hidden="true" className="h-[26px] w-9 rounded-md bg-chip" />
            </div>
            <div className="mt-[18px] mb-0.5 font-serif text-[1.7rem] font-semibold tracking-[.06em] tabular-nums [overflow-wrap:anywhere]">
              {b.number}
            </div>
            <div className="mb-4 text-[.95rem] opacity-85">a.n. {b.name}</div>
            <Button variant="light" size="sm" onClick={() => copy(b.number, 'Nomor rekening disalin')}>
              <Icon name="copy" className="size-[18px]" />
              Salin nomor
            </Button>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4 rounded-[22px] border border-line bg-surface px-[22px] py-[30px] text-left shadow-card">
        <h3 className="font-serif text-[1.4rem] font-semibold">Kirim hadiah ke alamat</h3>
        <p className="mt-1 text-muted">{CONFIG.giftAddress}</p>
        <Button variant="ghost" className="mt-5" onClick={() => copy(CONFIG.giftAddress, 'Alamat disalin')}>
          <Icon name="copy" className="size-[18px]" />
          Salin alamat
        </Button>
      </Reveal>
    </Section>
  );
}
