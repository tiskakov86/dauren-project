/*
// Отключение проверок
const errorOrWarn = process.env.NODE_ENV === 'production' ? 'warn' : 'warn';
const tempWarn = 'warn';
*/
const errorOrWarn = process.env.NODE_ENV === 'production' ? 'off' : 'off';
const tempWarn = 'off';

module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: false
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/essential',
        //'@vue/standard',
        '@vue/typescript'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    rules: {
        // ???
        'comma-dangle': tempWarn,
        'spaced-comment': tempWarn,
        'padded-blocks': tempWarn,
        'block-spacing': 'off',
        'space-before-blocks': 'off',
        'object-curly-spacing': 'off',
        'space-infix-ops': 'off',

        // Possible Errors
        'for-direction': tempWarn,
        'getter-return': [tempWarn, {
            allowImplicit: true
        }],
        'no-async-promise-executor': tempWarn,
        'no-await-in-loop': tempWarn,
        'no-compare-neg-zero': 'off',
        'no-cond-assign': [tempWarn, 'except-parens'],
        'no-console': [errorOrWarn, {
            allow: ['off', 'error']
        }],
        'no-constant-condition': ['off', {
            checkLoops: true
        }],
        'no-control-regex': tempWarn,
        'no-debugger': errorOrWarn,
        'no-dupe-args': tempWarn,
        'no-dupe-keys': tempWarn,
        'no-duplicate-case': tempWarn,
        'no-empty': ['off', {
            allowEmptyCatch: false
        }],
        'no-empty-character-class': 'off',
        'no-ex-assign': tempWarn,
        'no-extra-boolean-cast': 'off',
        'no-extra-semi': 'off',
        'no-func-assign': tempWarn,
        // 'no-import-assign': tempWarn, // Definition for rule 'no-import-assign' was not found
        'no-inner-declarations': [tempWarn, 'both'],
        'no-invalid-regexp': [tempWarn, {
            allowConstructorFlags: ['u', 'y']
        }],
        'no-irregular-whitespace': [tempWarn, {
            skipComments: true
        }],
        'no-misleading-character-class': tempWarn,
        'no-obj-calls': tempWarn,
        'no-prototype-builtins': 'off',
        'no-regex-spaces': 'off',
        'no-sparse-arrays': tempWarn,
        'no-template-curly-in-string': 'off',
        'no-unexpected-multiline': tempWarn,
        'no-unreachable': 'off',
        'no-unsafe-finally': tempWarn,
        'no-unsafe-negation': tempWarn,
        'require-atomic-updates': tempWarn,
        'use-isnan': tempWarn,
        'valid-typeof': [tempWarn, {
            requireStringLiterals: true
        }],
        'standard/computed-property-even-spacing': 'off',

        // Best Practices
        'accessor-pairs': [tempWarn, {
            getWithoutSet: false, setWithoutGet: true
        }],
        'array-callback-return': [tempWarn, {
            allowImplicit: true
        }],
        'block-scoped-var': tempWarn,
        'class-methods-use-this': 'off', // пример - геттер, вызывающий внешний сервис или vuex
        'complexity': ['off', 20],
        'consistent-return': [tempWarn, {
            treatUndefinedAsUnspecified: false
        }],
        'curly': [tempWarn, 'all'],
        'default-case': [tempWarn, {
            commentPattern: '^skip\\sdefault'
        }],
        // 'default-param-last': tempWarn, // Definition for rule 'default-param-last' was not found
        'dot-location': [tempWarn, 'property'],
        'dot-notation': [tempWarn, {
            allowKeywords: true
        }],
        'eqeqeq': tempWarn,
        'guard-for-in': tempWarn,
        'max-classes-per-file': [tempWarn, 1],
        'no-alert': tempWarn,
        'no-caller': tempWarn,
        'no-case-declarations': tempWarn,
        'no-div-regex': 'off',
        'no-else-return': [tempWarn, {
            allowElseIf: false
        }],
        'no-empty-pattern': tempWarn,
        'no-eq-null': tempWarn,
        'no-eval': tempWarn,
        'no-extend-native': tempWarn,
        'no-extra-bind': 'off',
        'no-extra-label': 'off',
        'no-fallthrough': ['off', {
            commentPattern: 'break[\\s\\w]*omitted'
        }],
        'no-floating-decimal': tempWarn,
        'no-global-assign': tempWarn,
        'no-implicit-coercion': tempWarn,
        'no-implicit-globals': tempWarn,
        'no-implied-eval': tempWarn,
        'no-invalid-this': tempWarn,
        'no-iterator': tempWarn,
        'no-labels': tempWarn,
        'no-lone-blocks': 'off',
        'no-loop-func': tempWarn,
        'no-multi-spaces': ['off', {
            ignoreEOLComments: true,
            exceptions: {
                Property: false
            }
        }],
        'no-multi-str': tempWarn,
        'no-new': tempWarn,
        'no-new-func': tempWarn,
        'no-new-wrappers': tempWarn,
        'no-octal': tempWarn,
        'no-octal-escape': tempWarn,
        'no-param-reassign': [tempWarn, {
            props: false
        }],
        'no-proto': tempWarn,
        'no-redeclare': [tempWarn, {
            builtinGlobals: true
        }],
        'no-restricted-properties': [0, {}], // https://eslint.org/docs/rules/no-restricted-properties
        'no-return-assign': tempWarn,
        'no-return-await': tempWarn,
        'no-script-url': 'off',
        'no-self-assign': ['off', {
            props: true
        }],
        'no-self-compare': 'off',
        'no-sequences': tempWarn,
        'no-throw-literal': tempWarn,
        'no-unmodified-loop-condition': tempWarn,
        'no-unused-expressions': 'off',
        'no-unused-labels': 'off',
        'no-useless-call': 'off',
        'no-useless-catch': 'off',
        'no-useless-concat': 'off',
        'no-useless-escape': 'off',
        'no-useless-return': 'off',
        'no-void': tempWarn,
        'no-warning-comments': ['off', {
            terms: ['todo', 'fixme', 'xxx'],
            location: 'anywhere'
        }],
        'no-with': tempWarn,
        'prefer-named-capture-group': tempWarn,
        'prefer-promise-reject-errors': [tempWarn, {
            allowEmptyReject: false
        }],
        // 'prefer-regex-literals': tempWarn, // Definition for rule 'prefer-regex-literals' was not found
        'radix': ['off', 'as-needed'],
        'require-await': tempWarn,
        'require-unicode-regexp': tempWarn,
        'vars-on-top': tempWarn,
        'wrap-iife': [tempWarn, 'outside', {
            functionPrototypeMethods: true
        }],
        'yoda': [tempWarn, 'never', {
            exceptRange: true
        }],

        // Strict Mode
        'strict': 'off',

        // Variables
        'init-declarations': 'off',
        'no-delete-var': 'off',
        'no-label-var': 'off',
        'no-restricted-globals': 'off', // https://eslint.org/docs/rules/no-restricted-globals
        'no-shadow': [errorOrWarn, { // https://eslint.org/docs/rules/no-shadow
            builtinGlobals: true,
            hoist: 'all',
            allow: []
        }],
        'no-shadow-restricted-names': 'off',
        'no-undef': [errorOrWarn, {
            typeof: true
        }],
        'no-undef-init': 'off',
        'no-undefined': 'off',

        // Node.js and CommonJS
        'callback-return': [errorOrWarn, ['callback', 'cb', 'next']],
        'global-require': errorOrWarn,
        'handle-callback-err': errorOrWarn,
        'no-buffer-constructor': 'off',
        'no-mixed-requires': 'off',
        'no-new-require': 'off',
        'no-path-concat': 'off',
        'no-process-env': 'off',
        'no-process-exit': 'off',
        'no-restricted-modules': ['off'], // https://eslint.org/docs/rules/no-restricted-modules
        'no-sync': 'off',

        // Stylistic Issues

        'eol-last': ['off', 'never'],
        'space-before-function-paren': ['off', {
            anonymous: 'always',
            named: 'never',
            asyncArrow: 'always'
        }],
        'no-multiple-empty-lines': ['off', {
            max: 10,
            maxEOF: 0,
            maxBOF: 0
        }],
        'no-trailing-spaces': 'off',
        'operator-linebreak': ['off', 'before'],

        // overridden by @typescript-eslint
        'brace-style': 'off',
        'camelcase': 'off',
        'func-call-spacing': 'off',
        'indent': 'off',
        'no-empty-function': 'off',
        'no-extra-parens': 'off',
        'no-magic-numbers': 'off',
        'no-unused-vars': 'off',
        'no-use-before-define': 'off',
        'no-useless-constructor': 'off',
        'quotes': 'off',
        'semi': 'off',

        // @typescript-eslint
        '@typescript-eslint/adjacent-overload-signatures': tempWarn,
        '@typescript-eslint/array-type': [tempWarn, {
            default: 'array-simple'
        }],
        // '@typescript-eslint/await-thenable': 'off', // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser.
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/ban-types': tempWarn,
        '@typescript-eslint/brace-style': [tempWarn, '1tbs', {
            allowSingleLine: true
        }],
        '@typescript-eslint/camelcase': [tempWarn, {
            properties: 'always', ignoreDestructuring: false
        }],
        '@typescript-eslint/class-name-casing': ['off', {
            allowUnderscorePrefix: false
        }],
        '@typescript-eslint/consistent-type-assertions': [tempWarn, {
            assertionStyle: 'as', objectLiteralTypeAssertions: 'allow'
        }],
        '@typescript-eslint/consistent-type-definitions': [tempWarn, 'interface'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-member-accessibility': [tempWarn, {
            accessibility: 'explicit'
        }],
        '@typescript-eslint/func-call-spacing': [tempWarn, 'never'],
        '@typescript-eslint/generic-type-naming': 'off',
        '@typescript-eslint/indent': [tempWarn, 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            MemberExpression: 1,
            FunctionDeclaration: {
                parameters: 1,
                body: 1
            },
            CallExpression: 1,
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            ignoreComments: false
        }],
        '@typescript-eslint/interface-name-prefix': [tempWarn, {
            prefixWithI: 'always',
            allowUnderscorePrefix: true
        }],
        '@typescript-eslint/member-delimiter-style': [tempWarn, {
            multiline: {
                delimiter: 'semi',
                requireLast: true
            },
            singleline: {
                delimiter: 'semi',
                requireLast: false
            }
        }],
        '@typescript-eslint/member-naming': 'off', // properties starting with "$" or "_" are not proxied in the Vue instance
        '@typescript-eslint/member-ordering': 'off',
        '@typescript-eslint/no-array-constructor': ['off'],
        '@typescript-eslint/no-empty-function': [tempWarn],
        '@typescript-eslint/no-empty-interface': [tempWarn],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-extra-parens': 'off', // TypeError: rules.ForStatement > *.init:exit is not a function
        '@typescript-eslint/no-extraneous-class': [tempWarn],
        // '@typescript-eslint/no-floating-promises': ['error'], // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        '@typescript-eslint/no-for-in-array': tempWarn,
        '@typescript-eslint/no-inferrable-types': [tempWarn, {
            ignoreParameters: false,
            ignoreProperties: false
        }],
        '@typescript-eslint/no-magic-numbers': 'off',
        '@typescript-eslint/no-misused-new': tempWarn,
        // '@typescript-eslint/no-misused-promises': tempWarn, //You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        '@typescript-eslint/no-namespace': ['off', {
            allowDeclarations: false,
            allowDefinitionFiles: true
        }],
        '@typescript-eslint/no-non-null-assertion': 'off', // иначе свойства (@Prop) в компонентах придется инициализировать
        '@typescript-eslint/no-parameter-properties': tempWarn,
        '@typescript-eslint/no-require-imports': tempWarn,
        '@typescript-eslint/no-this-alias': tempWarn,
        '@typescript-eslint/no-type-alias': ['off', {
            allowAliases: 'in-unions-and-intersections',
            allowCallbacks: 'always',
            allowLiterals: 'in-unions-and-intersections',
            allowMappedTypes: 'in-unions-and-intersections',
            allowTupleTypes: 'always'
        }],
        // '@typescript-eslint/no-unnecessary-condition': tempWarn, // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        // '@typescript-eslint/no-unnecessary-condition': tempWarn, // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        // '@typescript-eslint/no-unnecessary-qualifier': tempWarn, // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        // '@typescript-eslint/no-unnecessary-type-arguments': tempWarn, // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        // '@typescript-eslint/no-unnecessary-type-assertion': tempWarn, // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        '@typescript-eslint/no-unused-vars': [tempWarn, {
            vars: 'all',
            args: 'none',
            ignoreRestSiblings: true,
            caughtErrors: 'all'
        }],
        '@typescript-eslint/no-use-before-define': [tempWarn, {
            functions: false,
            classes: true,
            variables: true,
            typedefs: false
        }],
        '@typescript-eslint/no-useless-constructor': 'off',
        '@typescript-eslint/no-var-requires': tempWarn,
        '@typescript-eslint/prefer-for-of': 'off',
        '@typescript-eslint/prefer-function-type': tempWarn,
        // '@typescript-eslint/prefer-includes': 'off', // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        '@typescript-eslint/prefer-namespace-keyword': 'off',
        // '@typescript-eslint/prefer-readonly': 'off', // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        // '@typescript-eslint/prefer-regexp-exec': 'off', // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        // '@typescript-eslint/prefer-string-starts-ends-with': 'off', // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        // '@typescript-eslint/promise-function-async': 'off', // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        '@typescript-eslint/quotes': [tempWarn, 'single', {
            avoidEscape: false,
            allowTemplateLiterals: false
        }],
        // '@typescript-eslint/require-array-sort-compare': tempWarn, // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        // '@typescript-eslint/require-await': tempWarn, // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        // '@typescript-eslint/restrict-plus-operands': tempWarn, // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        '@typescript-eslint/semi': [tempWarn, 'always'],
        // '@typescript-eslint/strict-boolean-expressions': tempWarn, // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser
        '@typescript-eslint/triple-slash-reference': [tempWarn, {
            path: 'never',
            types: 'never',
            lib: 'never'
        }],
        '@typescript-eslint/type-annotation-spacing': [tempWarn, {
            before: false,
            after: true,
            overrides: {
                arrow: {
                    before: true
                }
            }
        }],
        '@typescript-eslint/typedef': [tempWarn, {
            arrayDestructuring: false,
            arrowParameter: false,
            memberVariableDeclaration: false,
            objectDestructuring: false,
            parameter: false,
            propertyDeclaration: true,
            variableDeclaration: false
        }],
        // '@typescript-eslint/unbound-method': tempWarn, // You must therefore provide a value for the "parserOptions.project" property for @typescript-eslint/parser,
        '@typescript-eslint/unified-signatures': 'off'
    }
};