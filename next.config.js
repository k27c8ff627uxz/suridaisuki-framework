const BASE_PATH = process.env.BASE_PATH ?? '';

module.exports = {
	trailingSlash: true,
	exportPathMap: async function (defaultPathMap) {
		const generatingPages = [
			'/info/profile',
			'/math/index0',
			'/math/index4',
			'/math/index5',
			'/math/index6',
			'/math/index7',
			'/math/index8',
		];
		for (const page of generatingPages) {
			delete defaultPathMap[page];
			defaultPathMap[`${page}.html`] = { page };
		}
		return defaultPathMap;
	},

	basePath: BASE_PATH,

	env: {
		BASE_PATH,
		DOCUMENT_PATH: process.env.DOCUMENT_PATH,
	},
};
