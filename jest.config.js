export default {
  testEnvironment: 'node',
  collectCoverage: true,
  moduleFileExtensions: ['js', 'mjs'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest'
  },

  testRegex: '((\\.|/*.)(test))\\.js?$',
  testTimeout: 600000
};
