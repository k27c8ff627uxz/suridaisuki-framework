module.exports = {
	'parser': '@typescript-eslint/parser', 
	'extends': [
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
	],
	'rules': {
		'semi': [ 'error', 'always' ],
		'comma-dangle': [ 'error', 'always-multiline' ],
		'quotes': ['error', 'single'],
		'indent': [ 2, 'tab' ],
		'react/display-name': 0,
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'@typescript-eslint/no-var-requires': 0,
	},
	'settings': {
		'react': {
			'version': 'detect',
		},
	},
};
