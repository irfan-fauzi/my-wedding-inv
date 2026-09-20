// Format tanggal Indonesia, mis. "Sabtu, 19 Desember 2026"
export const fmtLong = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Asia/Jakarta',
});

// Format tanggal untuk link Google Calendar: 20261219T010000Z
export const calDate = (d) => new Date(d).toISOString().replace(/[-:]|\.\d{3}/g, '');

// Waktu relatif: "5 menit lalu"
export function ago(t) {
  const m = Math.max(0, Math.floor((Date.now() - t) / 60000));
  if (m < 1) return 'Baru saja';
  if (m < 60) return `${m} menit lalu`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} jam lalu`;
  return `${Math.floor(h / 24)} hari lalu`;
}
