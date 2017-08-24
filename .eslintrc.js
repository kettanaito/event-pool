const isDevelopment = (process.env.NODE_ENV === 'development');

module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true
  },
  parserOptions: {
    ecmaVersion: 8,
    ecmaFeatures: {
      modules: true
    },
  },
  extends: ['airbnb-base', 'airbnb-base/legacy'],
  rules: {
    /* General */
    'indent': [0, 2],
    'no-trailing-spaces': 1,
    'no-console': Number(!isDevelopment),
    'no-const-assign': 2, // forbid reassigning const
    'no-var': 2, // forbid using var
    'no-unused-vars': 1,
    'no-tabs': 0, // forbid using Tabs in indenting
    'prefer-const': 1, // enforce usage of const over var
    'no-mixed-operators': 0,
    'no-debugger': 0,
    'no-else-return': 0,
    'no-plusplus': 0,
    'global-require': 0,

    /* Blocks */
    'array-bracket-spacing': 2,
    'brace-style': 2,
    'eol-last': 2,
    'keyword-spacing': 2,
    'max-len': 0,
    'newline-per-chained-call': 2,
    'no-whitespace-before-property': 2,
    'padded-blocks': 1,
    'space-in-parens': 2,
    'space-infix-ops': 2,

    /* Semicolons, commas, etc. */
    'comma-dangle': 1,
    'comma-style': 2,
    'semi': 1,
    'object-curly-spacing': 1,

    /* Type Casting & Coercion */
    'radix': 2,

    /* Naming Conventions */
    'camelcase': 1,
    'id-length': 2,
    'new-cap': 2,
    'no-underscore-dangle': 0,

    /* Variables */
    'no-undef': isDevelopment ? 1 : 2,
    'one-var': 2,
    'no-shadow': 0,

    /* Object */
    'no-new-object': 2,
    'object-shorthand': 2,
    'quote-props': 2,

    /* Properties */
    'dot-notation': 2,

    /* Array */
    'array-callback-return': 0,
    'no-array-constructor': 2,

    /* String */
    'no-useless-escape': 2,
    'prefer-template': 1,
    'quotes': [1, 'single'],
    'template-curly-spacing': 2,

    /* Function */
    'func-names': 0,
    'class-methods-use-this': 0,
    'no-unused-expressions': 0,
    'consistent-return': 0,
    'no-loop-func': 2,
    'no-new-func': 2,
    'no-param-reassign': 1,
    'no-return-assign': 0,
    'prefer-rest-params': 1,
    'prefer-spread': 1,
    'space-before-blocks': 2,
    'space-before-function-paren': 2,
    'wrap-iife': 2,

    /* Arrow function */
    'arrow-body-style': 0,
    'arrow-parens': 2,
    'arrow-spacing': 2,
    'no-confusing-arrow': 0,
    'prefer-arrow-callback': 1,

    /* Constructor */
    'no-dupe-class-members': 2,
    'no-useless-constructor': 2,

    /* Modules */
    'no-duplicate-imports': 2,
    'import/no-mutable-exports': 2,
    'import/prefer-default-export': 0,
    'import/first': 0,
    'import/no-extraneous-dependencies': 0,

    /* Iterators & Generators */
    'no-iterator': 2,
    'no-restricted-syntax': 2,

    /* Comparison Operators & Equality */
    'no-nested-ternary': 2,
    'no-unneeded-ternary': 2,
    'no-case-declarations': 0,
  }
};
