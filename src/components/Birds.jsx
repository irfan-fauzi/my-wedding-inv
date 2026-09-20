import { useEffect, useRef, useState } from 'react';
import { BODY_PATH, wingPath } from '../lib/birdShape';

/* =========================================================
   <Birds /> — burung kecil yang terbang melintasi layar.

   • Siluet & sayap: kurva Bézier (lib/birdShape.js). Bentuk sayap DIHITUNG ULANG tiap frame
     dari sudut "tulang" (lengan + tangan), jadi sayap benar-benar menekuk/melengkung (morphing).
   • Ritme: beberapa kepakan → meluncur (glide) sebentar → kepak lagi. Acak per burung.
   • Lintasan: kurva Bézier acak; kemiringan (pitch) tubuh mengikuti arah gerak.
   • Performa: SATU loop requestAnimationFrame untuk semua burung, tanpa re-render React.
     Posisi memakai CSS transform (dikomposit GPU). Loop berhenti saat komponen tidak terlihat
     di layar / tab tidak aktif, dan tidak dirender bila pengguna memilih "reduced motion".

   PROPS
     count      jumlah burung                                  (default 5)
     direction  'up' | 'ltr' | 'rtl' | 'random'                (default 'random')
                 up  = dari bawah menanjak ke atas
                 ltr = kiri-bawah → kanan-atas
                 rtl = kanan-bawah → kiri-atas
                 random = tiap penerbangan memilih salah satu
     speed      pengali kecepatan terbang, 1 = normal          (default 1)
     size       lebar burung dalam px: angka atau [min, max]   (default [34, 56])
     flapRate   pengali kecepatan kepak, 1 = normal            (default 1)
     glide      pengali lama meluncur; 0 = kepak terus         (default 1)
     wander     0–1, seberapa berkelok lintasannya             (default 0.6)
     loop       true = burung muncul lagi setelah keluar layar (default true)
     scatter    true = saat muncul burung sudah tersebar       (default true)
     className  kelas Tailwind; warna burung = warna teks      (default 'text-accent')
   ========================================================= */

const DIRECTIONS = ['up', 'ltr', 'rtl'];
const PHI_UP = 14;      // sudut lengan saat sayap di puncak (derajat dari arah atas)
const PHI_DOWN = 152;   // sudut lengan saat sayap paling bawah
const PHI_GLIDE = 50;   // sudut lengan saat meluncur
const BASE_SPEED = 55;  // px per detik pada speed = 1
const PITCH_LIMIT = 62; // batas kemiringan tubuh (derajat)

const rand = (a, b) => a + Math.random() * (b - a);
const randInt = (a, b) => Math.floor(rand(a, b + 1));
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const ease = (k, dt) => 1 - Math.exp(-k * dt); // faktor pelicinan yang tidak bergantung frame-rate

/* ---------- Lintasan (kurva Bézier kubik) ---------- */
function makePath(dir, W, H, m) {
  let x0, y0, x1, y1;
  if (dir === 'ltr') {
    x0 = -m; y0 = H * rand(0.55, 1.05); x1 = W + m; y1 = H * rand(-0.05, 0.4);
  } else if (dir === 'rtl') {
    x0 = W + m; y0 = H * rand(0.55, 1.05); x1 = -m; y1 = H * rand(-0.05, 0.4);
  } else {
    // 'up': naik dari bawah; dibelokkan ke samping agar tubuh tidak tegak lurus 90°
    x0 = W * rand(0.12, 0.88);
    const side = x0 > W * 0.55 ? -1 : x0 < W * 0.45 ? 1 : Math.random() < 0.5 ? -1 : 1;
    x1 = clamp(x0 + side * W * rand(0.3, 0.5), -m * 0.5, W + m * 0.5);
    y0 = H + m; y1 = -m;
  }
  const dx = x1 - x0, dy = y1 - y0;
  return {
    facing: dx >= 0 ? 1 : -1,
    pts: [
      { x: x0, y: y0 },
      { x: x0 + dx * rand(0.2, 0.4), y: y0 + dy * rand(0.15, 0.45) },
      { x: x0 + dx * rand(0.6, 0.8), y: y0 + dy * rand(0.55, 0.85) },
      { x: x1, y: y1 },
    ],
  };
}
function bez(p, u) {
  const a = (1 - u) ** 3, b = 3 * u * (1 - u) ** 2, c = 3 * u * u * (1 - u), d = u ** 3;
  return { x: a * p[0].x + b * p[1].x + c * p[2].x + d * p[3].x, y: a * p[0].y + b * p[1].y + c * p[2].y + d * p[3].y };
}
function pathLength(p) {
  let len = 0, prev = bez(p, 0);
  for (let i = 1; i <= 24; i++) { const q = bez(p, i / 24); len += Math.hypot(q.x - prev.x, q.y - prev.y); prev = q; }
  return len;
}

/* ---------- Kepakan: tau 0..1 = satu siklus (turun ±42%, naik ±58%) ---------- */
function flapAngle(tau) {
  const w = tau < 0.42 ? 0.5 * (tau / 0.42) : 0.5 + 0.5 * ((tau - 0.42) / 0.58);
  return PHI_UP + (PHI_DOWN - PHI_UP) * (0.5 - 0.5 * Math.cos(2 * Math.PI * w));
}

export default function Birds({
  count = 5,
  direction = 'random',
  speed = 1,
  size = [34, 56],
  flapRate = 1,
  glide = 1,
  wander = 0.6,
  loop = true,
  scatter = true,
  className = 'text-accent',
}) {
  const rootRef = useRef(null);
  const svgs = useRef([]);
  // Prop dibaca lewat ref agar bisa berubah tanpa memulai ulang animasi
  const opts = useRef({});
  opts.current = { direction, speed, size, flapRate, glide, wander, loop, scatter };

  // Hormati pengaturan sistem "kurangi gerakan"
  const [reduce] = useState(() => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (reduce) return;
    const root = rootRef.current;
    const box = { w: root.clientWidth, h: root.clientHeight };

    const birds = svgs.current.slice(0, count).filter(Boolean).map((svg) => {
      const g = svg.firstChild;
      return { svg, g, far: g.children[0], near: g.children[2], wait: scatter ? 0 : rand(0, 5), active: false };
    });

    /* Mulai satu penerbangan baru untuk burung b */
    function launch(b, first) {
      const o = opts.current;
      const [sMin, sMax] = Array.isArray(o.size) ? o.size : [o.size, o.size];
      b.size = rand(sMin, sMax);
      const dir = o.direction === 'random' ? DIRECTIONS[randInt(0, 2)] : o.direction;
      const path = makePath(dir, box.w, box.h, b.size + 30);
      b.path = path.pts; b.facing = path.facing; b.len = pathLength(b.path);
      b.dist = first && o.scatter ? b.len * rand(0.05, 0.65) : 0;
      const sizeN = sMax > sMin ? (b.size - sMin) / (sMax - sMin) : 0.5;
      b.speed = BASE_SPEED * o.speed * (0.8 + 0.45 * sizeN) * rand(0.92, 1.08); // burung besar = lebih dekat = lebih cepat
      b.wobPhase = rand(0, 6.28); b.wobAmp = 9 * o.wander * (b.size / 45);

      // Ritme sayap
      b.mode = 'flap'; b.tau = Math.random(); b.flaps = randInt(2, 5); b.hz = rand(2.6, 3.6) * o.flapRate;
      b.phi = flapAngle(b.tau); b.phiPrev = b.phi; b.bend = 0; b.bob = 0; b.wob = 0; b.lastPhi = -99; b.lastBend = -99;

      // Posisi & arah awal (dari garis singgung kurva, supaya tidak "melompat" di frame pertama)
      const a = bez(b.path, 0), c = bez(b.path, 0.02);
      const h = Math.hypot(c.x - a.x, c.y - a.y) || 1;
      b.vx = ((c.x - a.x) / h) * b.speed; b.vy = ((c.y - a.y) / h) * b.speed;
      b.px = null;

      const s = b.svg.style;
      s.width = `${b.size}px`; s.height = `${b.size * 0.75}px`;
      s.marginLeft = `${-b.size / 2}px`; s.marginTop = `${-b.size * 0.375}px`;
      s.visibility = 'visible';
      b.active = true;
    }

    /* Perbarui satu burung untuk selang waktu dt (detik) */
    function step(b, dt, now) {
      const o = opts.current;
      if (!b.active) {
        b.wait -= dt;
        if (b.wait <= 0) {
          launch(b, !b.everLaunched); // penerbangan pertama boleh mulai di tengah layar (scatter)
          b.everLaunched = true;
        }
        return;
      }

      // 1) Maju sepanjang lintasan (kecepatan konstan, sedikit melambat saat meluncur)
      const speedNow = b.speed * (b.mode === 'glide' ? 0.93 : 1);
      b.dist += speedNow * dt;
      const u = b.dist / b.len;
      if (u >= 1) {
        b.active = false; b.svg.style.visibility = 'hidden';
        b.wait = o.loop ? rand(0.4, 3.5) : Infinity;
        return;
      }
      const p = bez(b.path, u), p2 = bez(b.path, Math.min(1, u + 0.01));
      const tl = Math.hypot(p2.x - p.x, p2.y - p.y) || 1;
      // Berkelok halus tegak lurus arah gerak
      const wob = b.wobAmp * Math.sin(b.dist / 70 + b.wobPhase);
      const x = p.x + (-(p2.y - p.y) / tl) * wob, y = p.y + ((p2.x - p.x) / tl) * wob;

      // 2) Arah gerak (dihaluskan) → kemiringan tubuh
      if (b.px !== null) {
        const k = ease(5, dt);
        b.vx += ((x - b.px) / dt - b.vx) * k; b.vy += ((y - b.py) / dt - b.vy) * k;
      }
      b.px = x; b.py = y;
      let theta = Math.atan2(b.vy, Math.abs(b.vx)) * (180 / Math.PI);
      theta = clamp(theta, -PITCH_LIMIT, PITCH_LIMIT) * b.facing; // burung menghadap kiri = cermin

      // 3) Ritme sayap: kepak N kali → meluncur → kepak lagi
      let target;
      if (b.mode === 'flap') {
        b.tau += dt * b.hz;
        if (b.tau >= 1) {
          b.tau -= 1; b.flaps -= 1;
          if (b.flaps <= 0 && o.glide > 0) { b.mode = 'glide'; b.glideLeft = rand(0.7, 1.7) * o.glide; }
          else if (b.flaps <= 0) b.flaps = randInt(2, 5);
        }
        target = flapAngle(b.tau);
      } else {
        b.glideLeft -= dt;
        if (b.glideLeft <= 0) { b.mode = 'flap'; b.tau = 0; b.flaps = randInt(2, 5); b.hz = rand(2.6, 3.6) * o.flapRate; }
        target = PHI_GLIDE + 4 * Math.sin(now * 0.003 + b.wobPhase); // melayang sedikit
      }
      b.phiPrev = b.phi;
      b.phi += (target - b.phi) * ease(b.mode === 'flap' ? 30 : 9, dt);

      // Kecepatan sayap (derajat/detik) → ujung sayap tertinggal + badan naik-turun tipis
      const omega = (b.phi - b.phiPrev) / dt;
      const bendT = clamp(-omega * 0.016, -26, 26) + (b.mode === 'glide' ? 6 : 0);
      b.bend += (bendT - b.bend) * ease(28, dt);
      b.bob += (clamp(-omega * 0.0016, -2.2, 2.2) - b.bob) * ease(20, dt);
      b.wob += (clamp(-omega * 0.0009, -1.4, 1.4) - b.wob) * ease(20, dt);

      // 4) Tulis ke DOM (hanya bila bentuk berubah cukup berarti)
      if (Math.abs(b.phi - b.lastPhi) > 0.08 || Math.abs(b.bend - b.lastBend) > 0.08) {
        b.far.setAttribute('d', wingPath(b.phi - 7, b.bend * 0.85, 0.92, 5, -4.4)); // sayap jauh: lebih kecil, fase agak beda
        b.near.setAttribute('d', wingPath(b.phi, b.bend, 1, 3, -3.6));
        b.g.setAttribute('transform', `translate(0 ${b.bob.toFixed(2)}) rotate(${b.wob.toFixed(2)})`);
        b.lastPhi = b.phi; b.lastBend = b.bend;
      }
      b.svg.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) rotate(${theta.toFixed(1)}deg) scaleX(${b.facing})`;
    }

    /* Satu loop untuk semua burung */
    let raf = 0, last = 0, running = false;
    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05); // batasi saat tab baru aktif kembali
      last = now;
      if (dt > 0 && box.w > 0) birds.forEach((b) => step(b, dt, now));
    };
    const start = () => { if (!running) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };

    // Ukuran wadah & keterlihatan: jeda saat hero keluar dari layar
    const ro = new ResizeObserver(([e]) => { box.w = e.contentRect.width; box.h = e.contentRect.height; });
    ro.observe(root);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(root);

    return () => { stop(); ro.disconnect(); io.disconnect(); };
    // count & reduce sengaja menjadi pemicu; prop lain dibaca lewat ref
  }, [count, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  if (reduce) return null;

  return (
    <div ref={rootRef} aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => (
        <svg
          key={i}
          ref={(el) => { svgs.current[i] = el; }}
          viewBox="-40 -30 80 60"
          className="absolute top-0 left-0 overflow-visible will-change-transform"
          style={{ visibility: 'hidden' }}
        >
          <g>
            <path fill="currentColor" opacity=".5" />        {/* sayap jauh (di belakang badan) */}
            <path d={BODY_PATH} fill="currentColor" />       {/* badan, kepala, paruh, ekor */}
            <path fill="currentColor" />                     {/* sayap dekat (di depan badan) */}
          </g>
        </svg>
      ))}
    </div>
  );
}
