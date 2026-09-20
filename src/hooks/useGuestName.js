import { useMemo } from 'react';

// Membaca nama tamu dari URL, mis. https://situs.com/?to=Budi+Santoso
export default function useGuestName() {
  return useMemo(() => {
    try {
      return (new URLSearchParams(window.location.search).get('to') || '').trim().slice(0, 60);
    } catch {
      return '';
    }
  }, []);
}
