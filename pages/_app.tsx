import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import CSS from 'csstype';
import AdSense from 'react-adsense';
import './style.scss';
import * as gtag from '../utils/gtag';

Router.events.on('routeChangeComplete', url => {
	if (process.env.GA_TRACKING_ID !== '') {
		gtag.pageview(url);
	}
});

function googleAdsense(
	client: string,
	slot: string,
	style: CSS.Properties,
) {
	if (client === '' || slot === '') return undefined;

	return (<div style={style}>
		<AdSense.Google
			key={Math.random()}
			client={client}
			slot={slot}
			style={{ display: 'block' }}
			format='auto'
			responsive='true'
		/>
	</div>);

}

const App = ({ Component, pageProps }: AppProps) => (
	<div>
		<Head>
			{/* MathJax */}
			<script async id={Math.random().toString()} src='https://platform.twitter.com/widgets.js' />
			<script
				id={Math.random().toString()}
				dangerouslySetInnerHTML={{
					__html: `
				MathJax = {
					chtml: {
						matchFontHeight: false
					},
					tex: {
						inlineMath: [['$', '$']]
					}
				};
					`,
				}}
			/>
			<script id={Math.random().toString()} async src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js' />
		</Head>
		{ googleAdsense(process.env.GAD_CLIENT, process.env.GAD_SLOT1, { textAlign: 'center' }) }
		<Component {...pageProps} />
		<div style={{ marginTop: 30 }} />
		{ googleAdsense(process.env.GAD_CLIENT, process.env.GAD_SLOT2, { textAlign: 'center', marginTop: '60px' }) }
	</div>
);

export default App;
