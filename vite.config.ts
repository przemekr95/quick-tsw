import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// This branch is dedicated to the GitHub Pages test deploy, which serves
// the project under /quick-tsw/, not the domain root.
export default defineConfig({
  base: '/quick-tsw/',
  plugins: [react()],
});
