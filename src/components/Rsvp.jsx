import { useRef, useState } from 'react';
import Reveal from './Reveal';
import Button from './Button';
import Icon from './Icon';
import { Section, SectionTitle, Lead } from './ui';
import { useToast } from './Toast';
import useWishes from '../hooks/useWishes';
import { ago } from '../lib/format';

const LABEL = { hadir: 'Hadir', ragu: 'Masih ragu', tidak: 'Tidak hadir' };
// Warna avatar: class lengkap ditulis utuh agar terdeteksi Tailwind
const AVATAR = ['bg-[#5f7352]', 'bg-[#8f6f3f]', 'bg-[#7a6a8a]', 'bg-[#4f7a80]', 'bg-[#a0625a]', 'bg-[#66784f]'];

const inputCls = 'w-full rounded-xl border border-line bg-page px-3.5 py-3 text-base text-ink';

// Pembungkus label + input
function Field({ id, label, children }) {
  return (
    <div className="mb-3.5">
      <label htmlFor={id} className="mb-1.5 block text-[.9rem] font-medium text-muted">{label}</label>
      {children}
    </div>
  );
}

function Wish({ wish }) {
  const initial = (wish.name.trim()[0] || '?').toUpperCase();
  const color = AVATAR[(wish.name.length + initial.charCodeAt(0)) % AVATAR.length];
  return (
    <div className="grid grid-cols-[40px_1fr] gap-3 rounded-2xl border border-line bg-surface px-4 py-3.5">
      <div aria-hidden="true" className={`grid size-10 place-items-center rounded-full font-serif text-[1.2rem] font-semibold text-white ${color}`}>
        {initial}
      </div>
      <div>
        <h4 className="leading-[1.3] font-semibold [overflow-wrap:anywhere]">
          {wish.name}
          <span className="ml-1.5 inline-block rounded-full bg-alt px-[9px] py-px align-[1px] text-[.74rem] font-medium text-accent">
            {LABEL[wish.attend]}
          </span>
        </h4>
        <time className="block text-[.8rem] text-muted">{ago(wish.t)}</time>
        {/* React otomatis meng-escape teks, jadi aman dari injeksi HTML */}
        <p className="mt-1.5 text-[.98rem] whitespace-pre-line [overflow-wrap:anywhere]">{wish.msg}</p>
      </div>
    </div>
  );
}

export default function Rsvp({ guest }) {
  const toast = useToast();
  const { wishes, counts, add } = useWishes();
  const listRef = useRef(null);

  // "Controlled form": nilai input disimpan di state
  const [form, setForm] = useState({ name: guest, attend: 'hadir', count: '1', msg: '' });
  const [error, setError] = useState('');
  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const name = form.name.trim();
    const msg = form.msg.trim();
    if (!name) return setError('Nama wajib diisi.');
    if (!msg) return setError('Tulis ucapan singkat untuk mempelai.');

    setError('');
    add({ name, attend: form.attend, count: Number(form.count), msg, t: Date.now() });
    setForm((f) => ({ ...f, msg: '' }));
    if (listRef.current) listRef.current.scrollTop = 0;
    toast('Terima kasih, ucapan Anda terkirim');
  };

  return (
    <Section id="rsvp" alt>
      <SectionTitle label="Konfirmasi kehadiran">Ucapan &amp; Doa</SectionTitle>
      <Reveal>
        <Lead>Kehadiran dan doa Anda sangat berarti. Mohon konfirmasi agar kami dapat menyiapkan segalanya.</Lead>
      </Reveal>

      <Reveal
        as="form"
        onSubmit={submit}
        noValidate
        className="mt-[30px] rounded-[22px] border border-line bg-surface px-[22px] py-[30px] text-left shadow-card"
      >
        <Field id="fName" label="Nama">
          <input id="fName" type="text" maxLength={60} autoComplete="name" required value={form.name} onChange={update('name')} className={inputCls} />
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field id="fAttend" label="Kehadiran">
            <select id="fAttend" value={form.attend} onChange={update('attend')} className={inputCls}>
              <option value="hadir">Hadir</option>
              <option value="ragu">Masih ragu</option>
              <option value="tidak">Tidak hadir</option>
            </select>
          </Field>
          <Field id="fCount" label="Jumlah tamu">
            <select id="fCount" value={form.count} onChange={update('count')} className={inputCls}>
              {[1, 2, 3, 4, 5].map((n) => <option key={n}>{n}</option>)}
            </select>
          </Field>
        </div>

        <Field id="fMsg" label="Ucapan & doa">
          <textarea id="fMsg" maxLength={300} placeholder="Tulis ucapan untuk kedua mempelai" value={form.msg} onChange={update('msg')} className={`${inputCls} min-h-[110px] resize-y`} />
          <p role="alert" className="mt-1.5 min-h-[1.2em] text-[.88rem] text-danger">{error}</p>
        </Field>

        <Button type="submit" className="mt-1.5 w-full">
          <Icon name="send" className="size-[18px]" />
          Kirim ucapan
        </Button>
      </Reveal>

      <div className="mt-[34px] mb-3.5 grid grid-cols-3 gap-2">
        {Object.keys(LABEL).map((k) => (
          <div key={k} className="rounded-[14px] border border-line bg-surface px-1 py-2.5">
            <b className="block font-serif text-[1.7rem] leading-[1.1] text-brass">{counts[k]}</b>
            <span className="text-[.8rem] text-muted">{LABEL[k]}</span>
          </div>
        ))}
      </div>

      <div ref={listRef} aria-live="polite" className="flex max-h-[440px] flex-col gap-3 overflow-auto pr-0.5 text-left overscroll-contain">
        {wishes.map((w, i) => <Wish key={`${w.t}-${i}`} wish={w} />)}
      </div>
    </Section>
  );
}
