import React from 'react';
import { AppProps } from 'next/app';
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
	width: number,
	height: number,
	style: CSS.Properties,
) {
	if (client === '' || slot === '') return undefined;

	return (<div style={style}>
		<AdSense.Google
			key={Math.random()}
			client={client}
			slot={slot}
			style={{ width, height }}
			format=''
		/>
	</div>);

}

const App = ({ Component, pageProps }: AppProps) => (
	<div>
		{ googleAdsense(process.env.GAD_CLIENT, process.env.GAD_SLOT1, 728, 90, { textAlign: 'center' }) }
		<Component {...pageProps} />
		<div style={{ marginTop: 30 }} />
		{ googleAdsense(process.env.GAD_CLIENT, process.env.GAD_SLOT2, 728, 15, { textAlign: 'center', marginTop: '60px' }) }
	</div>
);

export default App;
