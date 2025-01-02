// generateEnvRules.js
const generateEnvRules = (type) => {
  return {
    '@typescript-eslint/no-unused-vars': [
      type,
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    quotes: [type, 'single'],
    'no-debugger': type,
    'no-console': type,
    'no-multi-spaces': type,
    'keyword-spacing': [
      type,
      {
        before: true,
        after: true,
      },
    ],
    'spaced-comment': type,
    'object-curly-spacing': [type, 'always'],
    'key-spacing': [type, { afterColon: true }],
    '@typescript-eslint/no-empty-function': [
      type,
      { allow: ['arrowFunctions', 'methods'] },
    ],
    'react/no-unstable-nested-components': type,
    'no-duplicate-imports': type,
    'simple-import-sort/imports': type,
    'simple-import-sort/exports': type,
  };
};

const isDevMode = process.env.NODE_ENV === 'development';

const envLintRules = isDevMode
  ? generateEnvRules('warn')
  : generateEnvRules('error');

export default {
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks',
    'simple-import-sort',
    'import',
    'prettier',
  ],
  ignorePatterns: ['dist/', 'node_modules/'],
  rules: {
    'import/no-unresolved': 'warn',
    'react/destructuring-assignment': [
      'error',
      'always',
      {
        ignoreClassFields: true,
        destructureInSignature: 'always',
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'react-hooks/exhaustive-deps': 'error',
    'react-hooks/rules-of-hooks': 'error',
    ...envLintRules,
    'import/no-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-nested-ternary': 'off',
    'import/no-named-as-default': 'off',
    camelcase: ['off', { ignoreImports: true }],
    'import/no-named-as-default-member': 'off',
    'react/no-array-index-key': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          isDevMode ? 'warn' : 'error',
          {
            groups: [
              // Packages react related packages come first.
              ['^react', 'path', '^@?\\w'],
              // Internal packages.
              ['^(@components)(/.*|$)', '^(@shared)(/.*|$)'],
              // Internal packages.
              ['^(@store)(/.*|$)'],
              ['^(@types)(/.*|$)'],
              ['^(@hooks)(/.*|$)'],
              ['^(@types)(/.*|$)'],
              ['^(@utils)(/.*|$)'],
              // Side effect imports.
              ['^\\u0000'],
              // Parent imports. Put .. last.
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Other relative imports. Put same-folder imports and . last.
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // config
              ['^(@config)(/.*|$)'],
              // constants
              ['^.+\\.constants\\.$'],
              // types
              ['^.+\\.types\\.$'],
              // Style imports.
              ['^.+\\.(css|scss)$'],
            ],
          },
        ],
      },
    },
  ],
};
