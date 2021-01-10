import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
		border?: string;
		align?: string;
  }
}

type Props = {
};

class Document extends NextDocument<Props> {
	render() {
		return (
			<Html >
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default Document;
