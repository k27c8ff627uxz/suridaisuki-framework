const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

const BASE_PATH = process.env.BASE_PATH ?? '';

module.exports = {
	future: {
		// 以下の設定がなかったら、webpack 4を使いなさいと怒られる
		webpack5: true,
	},
	webpack: (config) => {
		config.plugins.push(
			new CopyPlugin({
				patterns: [{
					from: '*/pic/*',
					to: path.join(__dirname, 'public/math/'),
					context: `${process.env.DOCUMENT_PATH}/math`,
				}],
			})
		);
		return config;
	},

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
		TWITTER: process.env.TWITTER ?? '',
		GA_TRACKING_ID: process.env.GA_TRACKING_ID ?? '',
		GAD_CLIENT: process.env.GAD_CLIENT ?? '',
		GAD_SLOT1: process.env.GAD_SLOT1 ?? '',
		GAD_SLOT2: process.env.GAD_SLOT2 ?? '',
	},
};
