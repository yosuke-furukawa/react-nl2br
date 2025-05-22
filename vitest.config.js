// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/test.js', '**/*.ui.test.js'], // Updated to include .ui.test.js files
    setupFiles: ['./vitest.setup.js'],
  },
});
