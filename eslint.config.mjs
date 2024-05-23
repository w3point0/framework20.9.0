// eslint.config.js

 
import js from "@eslint/js";

 

export default [
  js.configs.recommended,
  {
    files: ["**/*.mjs"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        require: "readonly",
        process: "readonly",
        console: "readonly",
        module: "readonly",
        describe: "readonly",
        __dirname: "readonly",
        next: "readonly"
      },
    } 
  },
];
