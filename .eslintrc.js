module.exports = {
  "env": {
    node: true
  },
  "parser": "@typescript-eslint/parser",
  "extends": [
    "airbnb-typescript/base"
  ],
  "parserOptions": {
    "ecmaVersion": 9,
    "project": "./tsconfig.json"
  },
  "plugins": [
    "@typescript-eslint",
    "import"
  ]
}