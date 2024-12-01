module.exports = {
    preset: 'jest-preset-angular',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
    testMatch: ['<rootDir>/src/**/*.spec.ts'],
    collectCoverage: true, 
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/*.spec.ts', 
      '!src/main*',
      '!src/environments/**',
      '!src/app/app.config*',
      '!src/app/app.component*',
      '!src/app/app.routes*',
      '!src/app/pages/home/home*',
    ],
  };
  