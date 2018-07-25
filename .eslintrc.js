module.exports = {
  "extends": "airbnb-base",
  "plugins": ["jest"],
  "env": {
    "browser": true,
    "es6": true,
    "jest/globals": true
  },
  rules: {
    "import/prefer-default-export": 0,

    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "never"
    }],

    "eslint/experimentalDecorators": 0,
    "no-nested-ternary": 0,
    "function-paren-newline": 0,
    "func-names": 0,
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "no-console": 0,
    "prefer-template": "warn",
    "eol-last": 0,
    "quote-props": ["error", "as-needed"],
    "indent": ["error", 2, { "SwitchCase": 1, "MemberExpression": 1 }],
    "no-plusplus": 0,
    "no-mixed-operators": ["error", { "allowSamePrecedence": true }],
    "no-new": 0,
  }
}
