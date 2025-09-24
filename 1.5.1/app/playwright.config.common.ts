import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: process.env.TEST_ROOT_DIR,
  outputDir: './tests/test-results',
  // testIgnore: '*test-assets',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: process.env.TEST_ROOT_DIR + '/tests/test-reports' }],
    ['json', { outputFile: process.env.TEST_ROOT_DIR + '/tests/test-reports/results.json' }],
    ['junit', { outputFile: process.env.TEST_ROOT_DIR + '/tests/test-reports/results.xml' }],
  ],
  use: {
    baseURL: process.env.TEST_BASE_URL,
    trace: 'on-first-retry',
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'chromium-xs',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 320, height: 700 },
      },
    },
    {
      name: 'chromium-md',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 500, height: 1000 },
      },
    },
    {
      name: 'chromium-lg',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1024, height: 768 },
      },
    },
    {
      name: 'chromium-xl',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    //
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
