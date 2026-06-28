import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: true, // listen on 0.0.0.0 (required on Railway)
    port: Number(process.env.PORT) || 4173,
    allowedHosts: true, // accept Railway's *.up.railway.app domain
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',
      // Critical module: the /recommend request-building + API-integration logic
      // shared by the Quiz and Quick questionnaire flows (not the visual screens).
      thresholds: {
        'src/pages/Quiz/quizConfig.js': { lines: 30, statements: 30 },
        'src/pages/Quiz/Loading.jsx': { lines: 30, statements: 30 },
      },
    },
  },
});
