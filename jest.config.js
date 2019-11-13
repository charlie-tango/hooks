module.exports = {
  transform: {
    '^.+\\.[tj]sx?$': ['babel-jest', { rootMode: 'upward' }],
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  coveragePathIgnorePatterns: ['/node_modules/', 'jest-setup.js'],
}
