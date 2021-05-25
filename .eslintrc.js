module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:jest/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    L: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'jest',
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'warn',
    'jsx-a11y/anchor-is-valid': 'off',
    'max-len': 'warn',
    'import/no-extraneous-dependencies': ['error', { devDependencies: ['**/*.test.js', 'mocks/**/*.js'] }],
  },
};
