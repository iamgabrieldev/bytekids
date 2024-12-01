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
      '!src/main.ts',
      '!src/environments/**',
    ],
  };
  