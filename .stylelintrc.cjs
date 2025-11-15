/** Local stylelint settings to align Super-Linter with our BEM-style selectors. */
module.exports = {
  extends: ['stylelint-config-standard'],
  rules: {
    // Allow kebab-case plus BEM-style double underscores/modifiers.
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)(?:[-]{1,2}[a-z0-9]+|_{1,2}[a-z0-9]+)*$', {
        message: 'Use kebab-case or BEM-style class names.'
      }
    ],
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
