module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    'react-testing-library/cleanup-after-each',
    'jest-dom/extend-expect',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', 'jest-setup.js'],
}
