module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
      'plugin:react/recommended',
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended",
  ],
  plugins: [
      "react-hooks"
  ],
  parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      ecmaFeatures: {
          jsx: true
      }
  },
  rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
  },
  settings: {
      react: {
          version: "detect",
      }
  }
};
