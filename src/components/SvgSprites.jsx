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
        {/* Bunga & cabang daun untuk pojok bingkai foto (dipakai Arch.jsx).
            overflow="visible" mencegah ujung daun terpotong oleh batas <symbol>. */}
        <symbol id="bloom" viewBox="-50 -50 100 100">
          <g fill="var(--surface)" stroke="currentColor" strokeWidth="1.6">
            <ellipse cx="0" cy="-22" rx="13" ry="22" />
            <ellipse cx="0" cy="-22" rx="13" ry="22" transform="rotate(72)" />
            <ellipse cx="0" cy="-22" rx="13" ry="22" transform="rotate(144)" />
            <ellipse cx="0" cy="-22" rx="13" ry="22" transform="rotate(216)" />
            <ellipse cx="0" cy="-22" rx="13" ry="22" transform="rotate(288)" />
          </g>
          <circle r="8" fill="#e6d8a6" />
        </symbol>
        <symbol id="floral" viewBox="0 0 120 120" overflow="visible">
          <path d="M10 110 Q14 14 110 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          <g fill="currentColor" opacity=".55">
            <ellipse cx="-0.2" cy="87.9" rx="13" ry="4.6" transform="rotate(-125 -0.2 87.9)"/>
            <ellipse cx="24.1" cy="91.0" rx="13" ry="4.6" transform="rotate(-41 24.1 91.0)"/>
            <ellipse cx="4.6" cy="65.2" rx="15" ry="5" transform="rotate(-116 4.6 65.2)"/>
            <ellipse cx="29.6" cy="72.5" rx="15" ry="5" transform="rotate(-32 29.6 72.5)"/>
            <ellipse cx="14.2" cy="44.7" rx="15" ry="5" transform="rotate(-104 14.2 44.7)"/>
            <ellipse cx="37.3" cy="56.8" rx="15" ry="5" transform="rotate(-20 37.3 56.8)"/>
            <ellipse cx="55.0" cy="8.7" rx="15" ry="5" transform="rotate(-71 55.0 8.7)"/>
            <ellipse cx="67.5" cy="31.6" rx="15" ry="5" transform="rotate(13 67.5 31.6)"/>
            <ellipse cx="77.8" cy="1.4" rx="14" ry="4.8" transform="rotate(-58 77.8 1.4)"/>
            <ellipse cx="84.8" cy="25.7" rx="14" ry="4.8" transform="rotate(26 84.8 25.7)"/>
            <ellipse cx="100.6" cy="-0.9" rx="11" ry="4" transform="rotate(-49 100.6 -0.9)"/>
            <ellipse cx="103.2" cy="21.8" rx="11" ry="4" transform="rotate(35 103.2 21.8)"/>
          </g>
          <use href="#bloom" x="18.0" y="18.0" width="38" height="38"/>
          <use href="#bloom" x="1.6" y="69.6" width="24" height="24"/>
          <use href="#bloom" x="72.9" y="0.9" width="24" height="24"/>
        </symbol>
      </defs>
    </svg>
  );
}
 