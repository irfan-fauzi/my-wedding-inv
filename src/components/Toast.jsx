import { createContext, useCallback, useContext, useRef, useState } from 'react';

// Notifikasi kecil di atas layar. Pakai di komponen mana pun:
//   const toast = useToast();  toast('Nomor rekening disalin');
const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const timer = useRef(null);

  const toast = useCallback((msg) => {
    setMessage(msg);
    setShow(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2400);
  }, []);

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <div
        role="status"
        className={`pointer-events-none fixed top-[18px] left-1/2 z-[200] max-w-[90vw] -translate-x-1/2 rounded-full bg-[#22301f] px-5 py-[11px] text-center text-[.92rem] text-cream shadow-[0_10px_30px_-10px_#000] transition-transform duration-[400ms] ${show ? 'translate-y-0' : '-translate-y-[140%]'}`}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
