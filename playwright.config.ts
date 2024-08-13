import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.e2e-spec\.ts$/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:50789',
  },
  webServer: {
    command: 'npm run dev:test',
    url: 'http://localhost:50789',
    reuseExistingServer: !process.env.CI,
  },
});
