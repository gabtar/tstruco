/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**', '!**/vendor/**'],
  coverageReporters: ['json-summary', 'text'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
