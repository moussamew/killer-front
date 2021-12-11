const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'airbnb', // -> [eslint-config-airbnb]
    'airbnb/hooks', // -> [eslint-config-airbnb/hooks]
    'prettier', // -> [eslint-config-prettier]
    'eslint:recommended', // -> [eslint]
    'plugin:json/recommended', // -> [eslint-plugin-json]
    'plugin:react/recommended', // [eslint-plugin-react, eslint-plugin-react-hooks, eslint-config-react-app ...]
    'plugin:@typescript-eslint/recommended', // [typescript eslint rules..]
    'plugin:prettier/recommended', // [typescript eslint rules..]
  ],
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to eslint
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['@typescript-eslint', 'react', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  rules: {
    camelcase: 'off', // TODO: remove it when GroundPlacesMaster will be moved to the external package
    'prettier/prettier': ['error', prettierOptions], // Enhance prettier with custom options
    '@typescript-eslint/explicit-function-return-type': ['error'], // Explicit types for function return
    '@typescript-eslint/no-empty-function': 'off', // Disable this rule to make empty function for testing case or default props
    '@typescript-eslint/no-var-requires': 'off', // Disable this rule to enable ES5 imports (const something = require('something');)
    'react/jsx-fragments': [2, 'element'], // Enforce the use of Fragment|React.Fragment instead of <></>
    'react/prop-types': 'off', // Disable prop-types as we use TypeScript for type checking
    'react/require-default-props': 'off', // Disable default props forcing when props is optional
    'react/jsx-filename-extension': [2, { extensions: ['.tsx'] }], // Only use react inside .tsx files
    'react/jsx-props-no-spreading': 'off', // Disable this rule to make props spreading inside .spec files
    'import/prefer-default-export': 'off', // Disable this rule to make named exports
    'react/jsx-uses-react': 'off', // React in v17 can now be use without importing React from 'react'
    'react/react-in-jsx-scope': 'off', // React in v17 can now be use without importing React from 'react'
    '@typescript-eslint/no-use-before-define': ['error', { typedefs: false }],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    /* Use import/extensions workaround to import files with .ts/.tsx extensions
    Issue here: https://github.com/benmosher/eslint-plugin-import/issues/1615 */
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      2,
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        'newlines-between': 'always',
        alphabetize: {
          order:
            'asc' /* sort in ascending order. Options: ['ignore', 'asc', 'desc'] */,
          caseInsensitive: true /* ignore case. Options: [true, false] */,
        },
      },
    ],
  },
};
