import React, { Component } from 'react';
import Head from 'next/head';
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
					<img src={`${process.env.BASE_PATH}/static/pic/title.gif`} />
				</div>
				<div style={{margin: '50px'}}>
					<table border="2" align="center">
						<tbody>
							<tr><th>
								メインメニュー
							</th></tr>
							<tr><td>
								<img src={`${process.env.BASE_PATH}/static/pic/math/title.gif`} />
							</td></tr>
							<tr><td>
								<img src={`${process.env.BASE_PATH}/static/pic/info/title.gif`} />
							</td></tr>
						</tbody>
					</table>
				</div>
				<div style={{margin: '30px'}}>
					<a href="mailto:k27c8_math@yahoo.co.jp">
						<img src={`${process.env.BASE_PATH}/static/pic/mail.gif`} />
						<div style={mailMessage}>メールはこちらへ↑↑↑</div>
					</a>
				</div>
			</div>
		);
	}
}
