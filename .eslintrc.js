module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "react-native/react-native": true,
  },
  extends: [
    "expo",
    "prettier",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
  ],
  plugins: [
    "prettier",
    "react",
    "react-native",
    "@typescript-eslint",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {
    "prettier/prettier": "error",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "react/prop-types": "off", // Disable prop-types as we're using TypeScript for type checking
    "@typescript-eslint/no-unused-vars": ["error"],
    "react-native/no-unused-styles": "warn",
    "react-native/no-inline-styles": "warn",
    "react-native/no-color-literals": "warn",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
