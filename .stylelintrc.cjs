module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-css-modules'],
  rules: {
    'no-descending-specificity': null,
    'selector-class-pattern': [
      '^[a-z][a-zA-Z0-9]*$',
      {
        message: 'Use camelCase for local CSS Modules class names.',
      },
    ],
  },
};
