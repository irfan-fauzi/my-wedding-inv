// Ornamen daun & hati didefinisikan SEKALI di sini, lalu dipakai berulang
// lewat <use href="#sprig" /> (lihat Sprig.jsx dan ui.jsx).
export default function SvgSprites() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
      <defs>
        <symbol id="sprig" viewBox="0 0 120 220">
          <path d="M60 218C56 160 66 100 60 8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <g fill="currentColor">
            <ellipse cx="38" cy="172" rx="22" ry="8" transform="rotate(-38 38 172)" />
            <ellipse cx="82" cy="150" rx="22" ry="8" transform="rotate(38 82 150)" />
            <ellipse cx="36" cy="120" rx="20" ry="7" transform="rotate(-40 36 120)" />
            <ellipse cx="84" cy="98" rx="20" ry="7" transform="rotate(40 84 98)" />
            <ellipse cx="42" cy="70" rx="16" ry="6" transform="rotate(-40 42 70)" />
            <ellipse cx="78" cy="48" rx="16" ry="6" transform="rotate(40 78 48)" />
            <ellipse cx="60" cy="16" rx="8" ry="14" />
          </g>
        </symbol>
        <symbol id="heart" viewBox="0 0 24 24">
          <path d="M12 21s-7-4.4-9.3-9A5.2 5.2 0 0 1 12 6.5 5.2 5.2 0 0 1 21.3 12C19 16.6 12 21 12 21z" />
        </symbol>
      </defs>
    </svg>
  );
}
