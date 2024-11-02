/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**', '!**/vendor/**'],
  coverageReporters: ['json-summary', 'text', 'lcov'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
