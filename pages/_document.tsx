import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		border?: string;
		align?: string;
		name?: string;
  }
}

type Props = {
};

class Document extends NextDocument<Props> {
	googleAnalytics(trackingId: string): JSX.Element[] {
		if (trackingId === '') return [];
		return [
			<script
				key='readScript'
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${trackingId}`}
			/>,
			<script
				key='scriptBody'
				dangerouslySetInnerHTML={{
					__html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${trackingId}', {
						page_path: window.location.pathname,
					});
				`,
				}}
			/>,
		];
	}

	render() {
		return (
			<Html >
				<Head>
					{ this.googleAnalytics(process.env.GA_TRACKING_ID) }
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Document;
