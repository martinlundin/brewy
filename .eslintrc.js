module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "no-use-before-define": 0,
    "no-param-reassign": ["error", { "props": true, "ignorePropertyModificationsFor": ["registration"] }],
    "no-unused-vars": "warn",
    "max-len": ["error", { "code": 120,  "ignoreStrings": true  } ],
    "react/jsx-filename-extension": 0,
    "react/jsx-props-no-spreading": 0,
    "react/prop-types": 0,
    "import/no-named-as-default": 0,
    "react/destructuring-assignment": 0,
  },
};
