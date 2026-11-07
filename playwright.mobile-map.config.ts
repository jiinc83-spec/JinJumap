import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/static',
  testMatch: 'mobile-map-zoom.spec.ts',
  webServer: {
    command: 'node fresh-static-preview/server.mjs',
    url: 'http://127.0.0.1:5173/mobile.html',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://127.0.0.1:5173',
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined },
  },
});
