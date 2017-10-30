module.exports = {
  root: true,
  extends: 'airbnb',
  parser: 'babel-eslint',
  plugins: [
    'babel',
  ],
  env: {
    browser: true,
  },
  rules: {
    'react/prefer-stateless-function': 'off',
    'no-invalid-this': 'off',
    semi: 'off',
    'babel/no-invalid-this': 'error',
    'babel/semi': 'error',
    'jsx-a11y/label-has-for': 'off',
  },
};
