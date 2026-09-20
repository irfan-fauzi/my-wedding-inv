/* =========================================================
   Bentuk burung (siluet) — koordinat lokal, menghadap ke KANAN.
   Titik (0,0) = pusat badan. Satuan bebas; dipetakan lewat viewBox.
   ========================================================= */

// Badan + kepala + paruh + ekor bercabang (satu path kurva Bézier tertutup)
export const BODY_PATH =
  'M27.5 -2.4' +
  'C24.5 -3.6 22.5 -4.3 20.6 -4.9' +          // paruh atas → dahi
  'C18.6 -9.2 12.6 -10.6 9.6 -7.2' +          // kepala
  'C7.6 -5 4.6 -4.6 0.5 -5.1' +               // tengkuk → punggung
  'C-6 -5.7 -12.5 -4.3 -18 -1.6' +            // punggung → pangkal ekor
  'C-21 -0.4 -24 -0.2 -27 0.6' +              // sisi atas ekor
  'C-25.6 1.4 -24.4 2.1 -23.6 2.5' +          // belahan ekor
  'C-24.6 3.4 -26 4.6 -27.6 5.6' +            // ujung ekor bawah
  'C-24 5 -21 4.2 -17.8 3.6' +                // sisi bawah ekor
  'C-11.5 5.8 -4.6 7 2.4 7' +                 // perut
  'C8.8 7 13.8 4.8 16.8 1.2' +                // dada
  'C18.4 -0.6 20.8 -1.4 23.4 -1.6' +          // tenggorokan → dagu
  'C24.8 -1.7 26.2 -2 27.5 -2.4Z';            // paruh bawah

/* =========================================================
   SAYAP — dibangun dari "tulang" dua ruas (lengan + tangan):
     φ1 = sudut lengan  (derajat dari arah ATAS, berputar ke belakang)
     φ2 = sudut tangan  (φ1 + tekukan pergelangan)
   Tepi depan mengikuti tulang; tepi belakang berupa bulu (bergelombang).
   Semua titik dihaluskan dengan Catmull-Rom → kurva Bézier kubik,
   jadi jumlah perintah path selalu tetap (aman untuk animasi tiap frame).
   ========================================================= */
const ARM = 13.5;   // panjang lengan
const HAND = 20;    // panjang tangan (bulu primer)
const TA = ARM / (ARM + HAND); // proporsi lengan terhadap seluruh sayap

// [posisi sepanjang tulang 0..1, lebar sayap]. Selang-seling = ujung bulu & lekukan halus di antaranya.
const TRAILING = [
  [0.985, 1.4],
  [0.95, 4.2], [0.91, 6.6],     // bulu primer terluar
  [0.865, 5.8], [0.82, 8.2],
  [0.77, 7.2],  [0.71, 9.6],
  [0.65, 8.8],  [0.58, 10.8],   // bulu sekunder
  [0.47, 11.4], [0.34, 12.2],
  [0.17, 12.8], [0.0, 12.0],
];
const LEADING = [0.2, 0.42, 0.66, 0.87, 1.0];

// Arah lebar sayap: ke belakang-bawah saat sayap di atas, ke belakang-atas saat sayap di bawah
const chordDir = (phi) => {
  const k = Math.min(1, Math.max(0, (phi - 14) / (152 - 14)));
  const a = rad(160 + 36 * k);
  return [Math.cos(a), Math.sin(a)];
};

const rad = (d) => (d * Math.PI) / 180;
const dir = (phiDeg) => [-Math.sin(rad(phiDeg)), -Math.cos(rad(phiDeg))]; // 0° = atas, 90° = belakang, 180° = bawah

const f = (n) => (Math.round(n * 10) / 10).toString();

// Titik pada tulang (t=0 pangkal bahu, t=1 ujung sayap)
function bone(t, u1, u2, wrist) {
  if (t <= TA) {
    const k = (t / TA) * ARM;
    return [u1[0] * k, u1[1] * k];
  }
  const k = ((t - TA) / (1 - TA)) * HAND;
  return [wrist[0] + u2[0] * k, wrist[1] + u2[1] * k];
}

/** Path sayap.  phi: sudut lengan, bend: tekukan tangan (derajat), s: skala, ox/oy: posisi bahu. */
export function wingPath(phi, bend, s = 1, ox = 0, oy = 0) {
  const u1 = dir(phi);
  const u2 = dir(phi + bend + 8);
  const wrist = [u1[0] * ARM, u1[1] * ARM];
  const D = chordDir(phi);

  const pts = [[0, 0]];
  for (const t of LEADING) {
    const p = bone(t, u1, u2, wrist);
    pts.push([p[0] + 0.9 * (1 - t * 0.6), p[1] - 0.6]);   // tepi depan sedikit menggembung
  }
  for (const [t, c] of TRAILING) {
    const p = bone(t, u1, u2, wrist);
    pts.push([p[0] + D[0] * c, p[1] + D[1] * c]);
  }

  // Catmull-Rom tertutup → Bézier kubik
  const n = pts.length;
  const P = (i) => pts[(i + n) % n];
  const X = (p) => f(p[0] * s + ox);
  const Y = (p) => f(p[1] * s + oy);
  let d = `M${X(P(0))} ${Y(P(0))}`;
  for (let i = 0; i < n; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${X(c1)} ${Y(c1)} ${X(c2)} ${Y(c2)} ${X(p2)} ${Y(p2)}`;
  }
  return d + 'Z';
}
