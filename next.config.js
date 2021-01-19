const BASE_PATH = process.env.BASE_PATH ?? '';

module.exports = {
	trailingSlash: true,

	basePath: BASE_PATH,

	env: {
		BASE_PATH,
	},
};
