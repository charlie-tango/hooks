module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    '@testing-library/react/cleanup-after-each',
    'jest-dom/extend-expect',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', 'jest-setup.js'],
}
