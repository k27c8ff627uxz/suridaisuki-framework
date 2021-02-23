import React from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import './style.scss';
import * as gtag from '../utils/gtag';

Router.events.on('routeChangeComplete', url => {
	if (process.env.GA_TRACKING_ID !== '') {
		gtag.pageview(url);
	}
});

const App = ({ Component, pageProps }: AppProps) => (
	<Component {...pageProps} />
);

export default App;
