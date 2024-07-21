import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: './FixJSDOMEnvironment.ts',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/sources/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  // FIXME https://mswjs.io/docs/migrations/1.x-to-2.x#cannot-find-module-mswnode-jsdom
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
};

export default createJestConfig(config);
