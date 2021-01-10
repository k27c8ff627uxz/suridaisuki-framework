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
	},
	'settings': {
		'react': {
			'version': 'detect',
		},
	},
};
