/** Local stylelint settings to align Super-Linter with our BEM-style selectors. */
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    // BEM naming is intentional throughout the site.
    'selector-class-pattern': null,
    'font-family-name-quotes': null,
    'media-feature-range-notation': null,
    'no-descending-specificity': null,
    'property-no-deprecated': null,
    'shorthand-property-no-redundant-values': null,
    'property-no-vendor-prefix': null,
    'value-keyword-case': [
      'lower', {
        ignoreKeywords: ['currentColor', 'currentcolor']
      }
    ]
  }
};
