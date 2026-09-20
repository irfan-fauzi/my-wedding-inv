import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Tailwind v4 dipasang sebagai plugin Vite: tidak perlu tailwind.config.js / postcss.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
