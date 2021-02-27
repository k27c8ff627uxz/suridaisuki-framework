import React, { Component } from 'react';
import CSS from 'csstype';
import Head from 'next/head';
import Link from 'next/link';

export default class extends Component {
	linkIcon(src: string, href: string, as?: string) {
		const style: CSS.Properties = {
			margin: '18px',
		};

		return (
			<div style={style}>
				<Link href={href} as={as}>
					<a>
						<img src={src} />
					</a>
				</Link>
			</div>
		);
	}

	render() {
		return (
			<div style={{textAlign: 'center'}}>
				<Head>
					<title>数理大好き！！！(いんふぉ)</title>
				</Head>
				<div style={{margin: '32px'}}>
					<img src={`${process.env.BASE_PATH}/info/title.gif`} />
				</div>
				<div style={{margin: '66px'}}>
					{this.linkIcon(`${process.env.BASE_PATH}/info/profile.gif`, '/info/profile', '/info/profile.html')}
					{this.linkIcon(`${process.env.BASE_PATH}/info/twitter.gif`, `http://twitter.com/${process.env.TWITTER}`)}
					{this.linkIcon(`${process.env.BASE_PATH}/info/mail.gif`, 'mailto:k27c8_math@yahoo.co.jp')}
				</div>
				<hr />
				<Link href="/">戻る</Link>
			</div>
		);
	}
}
