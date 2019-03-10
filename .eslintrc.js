module.exports = {
    extends: ["eslint:recommended", 'prettier', 'prettier/react'], // extending recommended config and config derived from eslint-config-prettier
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: 'module', // es6 import/export
        ecmaFeatures: {'classes': true, 'jsx': true },
    },
    'parser': 'babel-eslint',
    plugins: [
        'prettier', // activating esling-plugin-prettier (--fix stuff)
        'jest',
        'react',  // activating react plugin
    ],
    rules: {
        eqeqeq: ['error', 'always'], // adding some custom ESLint rules
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "no-console": "off",
        "prettier/prettier": [
            "error",
            {
                singleQuote: true,
                trailingComma: 'all',
                tabWidth: 4,
                printWidth:120,
            },
        ],
    },
    'env': {
        "jest/globals": true,
        "browser":true,
        "shared-node-browser":true,
    },
    settings: {
        "react": {
            "createClass": "createReactClass", // Regex for Component Factory to use, default to "createReactClass"
            "pragma": "React",  // Pragma to use, default to "React"
            "version": "15.0", // React version, default to the latest React stable release
            "flowVersion": "0.53" // Flow version
        },
        "propWrapperFunctions": [ "forbidExtraProps" ] // The names of any functions used to wrap the propTypes object, such as `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
    },
};