/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**', '!**/vendor/**'],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}],
  },
};
