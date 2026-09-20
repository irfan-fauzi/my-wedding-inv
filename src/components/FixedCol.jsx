// Wadah "fixed" yang selebar layar di ponsel, dan selebar kolom undangan di desktop.
// Dipakai oleh Dock (tombol musik/tema) dan BottomNav.
export default function FixedCol({ className = '', children }) {
  return (
    <div
      className={`pointer-events-none fixed inset-x-0 z-[60] desk:left-auto desk:w-[var(--col)] ${className}`}
    >
      {children}
    </div>
  );
}
