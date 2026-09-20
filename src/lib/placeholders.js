// Ilustrasi SVG bawaan (data URI) supaya undangan tetap cantik tanpa foto asli.
const svgURI = (c1, c2, inner) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient></defs><rect width="400" height="500" fill="url(#g)"/>${inner}</svg>`
  );

const one = '<g fill="rgba(255,255,255,.7)"><circle cx="200" cy="200" r="58"/><path d="M70 500c0-150 260-150 260 0z"/></g>';
const two = '<g fill="rgba(255,255,255,.7)"><circle cx="150" cy="200" r="44"/><path d="M52 500c0-125 196-125 196 0z"/><circle cx="256" cy="212" r="40"/><path d="M168 500c0-115 176-115 176 0z"/></g>';
const heart = '<path transform="translate(150 190) scale(4.2)" fill="rgba(255,255,255,.7)" d="M12 21s-7-4.4-9.3-9A5.2 5.2 0 0 1 12 6.5 5.2 5.2 0 0 1 21.3 12C19 16.6 12 21 12 21z"/>';

const GALLERY_COLORS = [
  ['#cddcc0', '#efe3cf'], ['#efd6cb', '#f4ecd9'], ['#c3d2bd', '#dfe8d2'],
  ['#e9dcc3', '#f4e7dc'], ['#d6e0c8', '#f0d9d0'], ['#c8d5c0', '#ede1c9'],
];

export const PH = {
  couple: svgURI('#c9d8bd', '#efdcc9', two),
  groom: svgURI('#c3d2bd', '#e3e8d3', one),
  bride: svgURI('#efd6cb', '#f5ebd9', one),
  gallery: (i) => {
    const [c1, c2] = GALLERY_COLORS[i % GALLERY_COLORS.length];
    return svgURI(c1, c2, heart);
  },
};
