import { useEffect, useState } from 'react';

import SvgSprites from './components/SvgSprites';
import StagePanel from './components/StagePanel';
import Cover from './components/Cover';
import Hero from './components/Hero';
import Couple from './components/Couple';
import Story from './components/Story';
import Events from './components/Events';
import Gallery from './components/Gallery';
import Gift from './components/Gift';
import Rsvp from './components/Rsvp';
import Closing from './components/Closing';
import Dock from './components/Dock';
import BottomNav from './components/BottomNav';
import { ToastProvider } from './components/Toast';

import useGuestName from './hooks/useGuestName';
import useMusic from './hooks/useMusic';
import useTheme from './hooks/useTheme';
import { CONFIG } from './data/config';

export default function App() {
  const [opened, setOpened] = useState(false); // sudah menekan "Buka Undangan"?
  const guest = useGuestName();
  const music = useMusic(CONFIG.music);
  const theme = useTheme();

  // Kunci scroll selama sampul masih menutupi layar
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', !opened);
    document.body.classList.toggle('h-svh', !opened);
  }, [opened]);

  const handleOpen = () => {
    setOpened(true);
    window.scrollTo(0, 0);
    music.start(); // harus dipanggil dari klik pengguna agar browser mengizinkan audio
  };

  return (
    <ToastProvider>
      <SvgSprites />
      <StagePanel />
      <Cover opened={opened} guest={guest} onOpen={handleOpen} />

      {/* Kolom undangan: penuh di ponsel, 460px di kanan pada desktop */}
      <main className="relative min-h-svh bg-page desk:ml-auto desk:w-[var(--col)] desk:shadow-[0_0_60px_rgba(0,0,0,.25)]">
        <Hero opened={opened} />
        <Couple />
        <Story />
        <Events />
        <Gallery />
        <Gift />
        <Rsvp guest={guest} />
        <Closing />
      </main>

      <Dock opened={opened} onToggleTheme={theme.toggle} playing={music.playing} onToggleMusic={music.toggle} />
      <BottomNav opened={opened} />
    </ToastProvider>
  );
}
