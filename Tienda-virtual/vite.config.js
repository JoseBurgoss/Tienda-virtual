import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// Backend: por defecto la demo sin backend (src/services/firebase.demo.js, datos en localStorage).
// Con VITE_BACKEND=firebase se usa el adaptador original con Firebase (requiere las VITE_FIREBASE_*).
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };
  const useFirebase = env.VITE_BACKEND === 'firebase';

  return {
    plugins: [
      react(),
    ],
    resolve: {
      alias: [
        ...(useFirebase ? [] : [{
          find: /^@\/services\/firebase$/,
          replacement: path.resolve(__dirname, 'src/services/firebase.demo.js')
        }]),
        { find: '@', replacement: path.resolve(__dirname, 'src') }
      ]
    },
    server: {
      port: 3000
    }
  };
});
