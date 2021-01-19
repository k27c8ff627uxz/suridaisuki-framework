const BASE_PATH = process.env.BASE_PATH ?? '';

module.exports = {
	trailingSlash: true,
	exportPathMap: async function (defaultPathMap) {
		delete defaultPathMap['/info/profile'];
		return {
			...defaultPathMap,
			'/info/profile.html': { page: '/info/profile' },
		};
	},

	basePath: BASE_PATH,

	env: {
		BASE_PATH,
	},
};
