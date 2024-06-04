module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
};
