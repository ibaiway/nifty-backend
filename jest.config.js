export default {
  testEnvironment: 'node',
  collectCoverage: true,
  collectCoverageFrom: ['./src/**'],
  coverageThreshold: {
    global: {
      lines: 20
    }
  },
  verbose: true,
  moduleFileExtensions: ['js', 'mjs'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest'
  },

  testRegex: '((\\.|/*.)(test))\\.js?$',
  testTimeout: 600000
};
