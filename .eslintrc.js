const OFF = 0
const ERROR = 2

module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'airbnb',
		'airbnb/hooks',
		'plugin:react/recommended',
		'plugin:unicorn/recommended',
		'plugin:promise/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier',
		'prettier/@typescript-eslint',
		'prettier/react',
		'prettier/unicorn'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 12,
		sourceType: 'module'
	},
	settings: {
		'import/resolver': {
			node: {
				extensions: ['.tsx', '.ts', '.js', '.json']
			},
			typescript: {}
		}
	},
	plugins: ['react', 'unicorn', 'promise', '@typescript-eslint'],
	rules: {
		'import/extensions': [
			ERROR,
			'ignorePackages',
			{
				ts: 'never',
				tsx: 'never',
				json: 'never',
				js: 'never'
			}
		],
		'@typescript-eslint/no-var-requires': OFF,
		'unicorn/consistent-function-scoping': OFF,
		'unicorn/prevent-abbreviations': OFF,
		'unicorn/import-style': OFF,
		'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
		'global-require': OFF,
		'no-use-before-define': OFF,
		'react/jsx-filename-extension': [OFF, { extensions: ['.js', '.jsx'] }],
		'@typescript-eslint/no-explicit-any': OFF,
		'import/prefer-default-export': OFF,
		'react/display-name': OFF,
		'unicorn/no-null': OFF,
		'react/no-unescaped-entities': OFF,
		'promise/catch-or-return': OFF,
		'promise/always-return': OFF,
		'jsx-a11y/click-events-have-key-events': OFF,
		'jsx-a11y/no-noninteractive-element-interactions': OFF,
		'jsx-a11y/no-static-element-interactions': OFF,
		'react/no-array-index-key': OFF,
		'promise/no-nesting': OFF,
		'unicorn/explicit-length-check': OFF
	}
}
