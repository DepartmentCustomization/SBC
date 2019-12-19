module.exports = {
    "env": {
        "browser": true,
        "es6": true
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
        "no-var": "error",
        "no-multiple-empty-lines": ["error", { max: 0 }],
        "line-comment-position": ["warn", { "position": "beside" }],
        "no-inline-comments": "warn",
        "no-console": "error",
        "no-debugger": "error",
        "brace-style": ["error", "1tbs"]
    }
};