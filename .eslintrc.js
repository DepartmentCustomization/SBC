module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true
    },
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "indent": ["error", 4],
        "quotes": ["error", "single"],
        "no-var": "error",
        "no-multiple-empty-lines": ["error", { max: 0 }],
        "line-comment-position": ["error", { "position": "beside" }],
        "no-inline-comments": "error",
        "no-console": "error",
        "no-debugger": "error",
        "brace-style": ["error", "1tbs"],
        "no-trailing-spaces": "error"
    }
};