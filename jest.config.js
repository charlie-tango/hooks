module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  coveragePathIgnorePatterns: ['/node_modules/', 'jest-setup.js'],
}
