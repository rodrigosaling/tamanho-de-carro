import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslintConfigPrettier from 'eslint-config-prettier';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  eslintConfigPrettier,
});
