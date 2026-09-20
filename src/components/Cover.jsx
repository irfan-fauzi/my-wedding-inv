import Sprig from './Sprig';
import Button from './Button';
import Icon from './Icon';
import { CONFIG } from '../data/config';
import { PH } from '../lib/placeholders';

// Sampul: menutupi layar sampai tombol "Buka Undangan" ditekan.
// Saat `opened` bernilai true, sampul bergeser ke atas lalu disembunyikan.
export default function Cover({ opened, guest, onOpen }) {
  const { groom, bride } = CONFIG;
  return (
    <section
      aria-label="Sampul undangan"
      className={`fixed inset-0 z-[90] flex flex-col items-center justify-center overflow-hidden bg-forest px-7 py-9 text-center text-cream transition-[transform,visibility] duration-[1100ms] ease-[cubic-bezier(.77,0,.18,1)] desk:left-auto desk:w-[var(--col)] ${opened ? 'invisible -translate-y-full' : ''}`}
    >
      <Sprig className="-top-2.5 -left-3.5 w-[120px] rotate-[160deg] text-cream opacity-20" />
      <Sprig className="-top-2.5 -right-3.5 w-[120px] rotate-[200deg] text-cream opacity-20" />
      <Sprig className="-bottom-[30px] -left-6 w-[150px] rotate-[18deg] text-cream opacity-20" />
      <Sprig className="-right-6 -bottom-[30px] w-[150px] -rotate-[18deg] text-cream opacity-20" />

      <p className="text-[.86rem] font-medium tracking-[.14em] text-[#cfe0c0]">Undangan Pernikahan</p>

      <div className="mx-auto mt-[18px] mb-5 aspect-square w-[168px] overflow-hidden rounded-full border-4 border-cream/85 shadow-[0_20px_40px_-20px_#000]">
        <img src={CONFIG.couplePhoto || PH.couple} alt="Foto mempelai" className="size-full object-cover" />
      </div>

      <h1 className="font-script text-[clamp(3.2rem,15vw,4.4rem)] leading-[1.05]">
        {groom.nick} &amp; {bride.nick}
      </h1>

      <p className="mt-[26px] text-[.95rem] opacity-85">Kepada Yth. Bapak/Ibu/Saudara/i</p>
      {/* Nama tamu dari ?to=... ; jika kosong tampil teks bawaan */}
      <p className="mt-1 mb-1.5 font-serif text-[1.6rem] font-semibold [overflow-wrap:anywhere]">
        {guest || 'Tamu Undangan'}
      </p>
      <p className="text-[.92rem] text-[#d9dfcd]">Maaf bila ada kesalahan penulisan nama atau gelar.</p>

      <Button variant="light" className="mt-[22px]" onClick={onOpen}>
        <Icon name="mail" className="size-[18px]" />
        Buka Undangan
      </Button>
    </section>
  );
}
