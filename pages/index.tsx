import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import CSS from 'csstype';

const mailMessage: CSS.Properties = {
	fontSize: 'small',
};

export default class extends Component {
	render() {
		return (
			<div style={{textAlign: 'center'}}>
				<Head>
					<title>数理大好き</title>
				</Head>
				<div style={{margin: '20px'}}>
					<img src={`${process.env.BASE_PATH}/title.gif`} />
				</div>
				<div style={{margin: '50px'}}>
					<table border="2" align="center">
						<tbody>
							<tr><th>
								メインメニュー
							</th></tr>
							<tr><td>
								<Link href="/math"><a>
									<img src={`${process.env.BASE_PATH}/math/title.gif`} />
								</a></Link>
							</td></tr>
							<tr><td>
								<Link href="/info"><a>
									<img src={`${process.env.BASE_PATH}/info/title.gif`} />
								</a></Link>
							</td></tr>
						</tbody>
					</table>
				</div>
				<div style={{margin: '30px'}}>
					<a href="mailto:k27c8_math@yahoo.co.jp">
						<img src={`${process.env.BASE_PATH}/mail.gif`} />
						<div style={mailMessage}>メールはこちらへ↑↑↑</div>
					</a>
				</div>
			</div>
		);
	}
}
