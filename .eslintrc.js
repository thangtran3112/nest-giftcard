module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
      project: [ "./tsconfig.json" ],
  },
  plugins: [ "@typescript-eslint", "jest" ],
  extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
  ],
  env: {
      browser: true,
      node: true,
  },
  rules: {
      "max-len": [ "error", {
          "code": 150,
          "ignoreStrings": true,
          "ignoreTemplateLiterals": true,
          "ignoreRegExpLiterals": true,
          "ignoreComments": true,
      } ],
      "object-curly-spacing": [ "error", "always" ],
      "array-bracket-spacing": [ "error", "always" ],
      "@typescript-eslint/explicit-function-return-type": [ "error" ],
      "@typescript-eslint/no-unused-vars": [ "error" ],
      "@typescript-eslint/no-var-requires": 0,
      "@typescript-eslint/no-explicit-any": "off"
  }
};