import { useCallback, useEffect, useRef, useState } from 'react';

/* Musik latar tanpa file audio: arpeggio lembut dibuat dengan WebAudio.
   Jika `src` (mp3) diisi, hook memakai file tersebut. */
const CHORDS = [
  [261.63, 329.63, 392, 523.25],
  [220, 261.63, 329.63, 440],
  [174.61, 261.63, 349.23, 440],
  [196, 246.94, 293.66, 392],
];
const PATTERN = [0, 1, 2, 3, 2, 1, 2, 3];
const STEP = 0.42; // detik per nada

function note(s, freq, t, dur, vol) {
  const osc = s.ctx.createOscillator();
  const gain = s.ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.linearRampToValueAtTime(vol, t + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(gain);
  gain.connect(s.master);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

function playStep(s, t) {
  const chord = CHORDS[Math.floor(s.step / 8) % 4];
  const i = s.step % 8;
  if (i === 0) note(s, chord[0] / 2, t, 3.4, 0.1);
  note(s, chord[PATTERN[i]], t, 1.9, 0.07);
  s.step += 1;
}

function schedule(s) {
  while (s.nextT < s.ctx.currentTime + 0.6) {
    playStep(s, s.nextT);
    s.nextT += STEP;
  }
}

function createEngine(s) {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return false;
  s.ctx = new AC();
  s.master = s.ctx.createGain();
  s.master.gain.value = 0.85;
  const delay = s.ctx.createDelay();
  delay.delayTime.value = 0.38;
  const feedback = s.ctx.createGain();
  feedback.gain.value = 0.35;
  s.master.connect(s.ctx.destination);
  s.master.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(s.ctx.destination);
  return true;
}

export default function useMusic(src) {
  const [playing, setPlaying] = useState(false);
  // useRef menyimpan objek audio tanpa memicu render ulang
  const state = useRef({ ctx: null, master: null, timer: null, step: 0, nextT: 0, audio: null });

  const start = useCallback(async () => {
    const s = state.current;
    try {
      if (src) {
        if (!s.audio) s.audio = Object.assign(new Audio(src), { loop: true, volume: 0.6 });
        await s.audio.play();
      } else {
        if (!s.ctx && !createEngine(s)) return;
        if (s.ctx.state === 'suspended') await s.ctx.resume();
        if (!s.timer) {
          s.nextT = s.ctx.currentTime + 0.1;
          s.timer = setInterval(() => schedule(s), 150);
        }
      }
      setPlaying(true);
    } catch {
      setPlaying(false); // browser memblokir autoplay
    }
  }, [src]);

  const stop = useCallback(() => {
    const s = state.current;
    if (s.audio) s.audio.pause();
    if (s.timer) { clearInterval(s.timer); s.timer = null; }
    if (s.ctx && s.ctx.state === 'running') s.ctx.suspend();
    setPlaying(false);
  }, []);

  const toggle = () => (playing ? stop() : start());

  // Bersihkan saat komponen dilepas
  useEffect(() => () => {
    const s = state.current;
    if (s.timer) clearInterval(s.timer);
    if (s.audio) s.audio.pause();
    if (s.ctx) s.ctx.close();
    state.current = { ctx: null, master: null, timer: null, step: 0, nextT: 0, audio: null };
  }, []);

  return { playing, start, toggle };
}
