import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 15000,
  retries: 1,
  use: {
    baseURL: 'http://localhost:4322',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run dev',
    port: 4322,
    reuseExistingServer: true,
    timeout: 15000,
  },
  projects: [
    {
      name: 'desktop',
      use: { viewport: { width: 1280, height: 720 } },
    },
    {
      name: 'mobile',
      use: { viewport: { width: 375, height: 812 } },
    },
  ],
});
