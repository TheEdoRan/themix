/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	extends: ["eslint:recommended", "next/core-web-vitals", "prettier"],
	rules: {
		"react/no-unescaped-entities": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"@typescript-eslint/no-empty-function": "off",
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/no-explicit-any": "off",
		"@typescript-eslint/no-empty-interface": "off",
		"@typescript-eslint/no-floating-promises": "warn",
		"@typescript-eslint/consistent-type-exports": "warn",
		"@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			extends: ["plugin:@typescript-eslint/recommended"],
			plugins: ["@typescript-eslint"],
			parser: "@typescript-eslint/parser",
			parserOptions: {
				project: "./tsconfig.json",
				ecmaFeatures: {
					jsx: true,
				},
				ecmaVersion: "latest",
				sourceType: "module",
			},
			rules: {},
		},
	],
};
