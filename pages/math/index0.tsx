import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default class extends Component {
	render() {
		return (
			<div style={{textAlign: 'center'}}>
				<Head>
					<title>数学大好き？</title>
				</Head>
				<div>まだ未作成のページです。</div>
				<div>今のところ「レベル４・５・６・７」がオープンしています。</div>
				<hr />
				<Link href="/math" as="/math">戻る</Link>
			</div>
		);
	}
}
