module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Scopes are case insensitive (rather than lower case), most notably to support React components, e.g. fix(Button):
    'scope-case': [0],
  },
}
