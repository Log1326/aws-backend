module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'prettier', 'unused-imports'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'prettier/prettier': [
			'error',
			{ semi: false, trailingComma: 'none', singleQuote: true }
		],
		'no-extra-semi': 'error',
		'no-trailing-spaces': 'error',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'error',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_'
			}
		],
		'padding-line-between-statements': [
			'error',
			{ blankLine: 'always', prev: 'function', next: 'function' },
			{ blankLine: 'always', prev: '*', next: 'return' }
		],
		'lines-between-class-members': [
			'error',
			'always',
			{ exceptAfterSingleLine: true }
		],
		'@typescript-eslint/member-ordering': [
			'error',
			{
				default: [
					'public-static-method',
					'private-static-method',
					'public-instance-method',
					'private-instance-method'
				]
			}
		],
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'error'
	}
}
