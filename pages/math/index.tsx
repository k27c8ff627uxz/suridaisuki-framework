import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default class extends Component {
	doorsData = [
		{
			title: 'レベル１',
			link: 'index0',
			img: 'door2.gif',
		},
		{
			title: 'レベル２',
			link: 'index0',
			img: 'door3.gif',
		},
		{
			title: 'レベル３',
			link: 'index0',
			img: 'door4.gif',
		},
		{
			title: 'レベル４',
			link: 'index4',
			img: 'door5.gif',
		},
		{
			title: 'レベル５',
			link: 'index5',
			img: 'door6.gif',
		},
		{
			title: 'レベル６',
			link: 'index6',
			img: 'door7.gif',
		},
		{
			title: 'レベル７',
			link: 'index7',
			img: 'door8.gif',
		},
		{
			title: 'レベル８',
			link: 'index8',
			img: 'door9.gif',
		},
	];

	doors() {
		const headData = this.doorsData.map(item => (
			<th key={item.link}>
				{item.title}
			</th>
		));
		const imgData = this.doorsData.map(item => (
			<td key={item.link}>
				<Link href={`/math/${item.link}`} as={`/math/${item.link}.html`}><a>
					<img src={`${process.env.BASE_PATH}/static/pic/math/${item.img}`} />
				</a></Link>
			</td>
		));

		return (
			<table align="center" style={{width: '80%'}}>
				<tr>
					{headData}
				</tr>
				<tr>
					{imgData}
				</tr>
			</table>
		);
	}

	render() {
		return (
			<div style={{textAlign: 'center'}}>
				<Head>
					<title>数学大好き</title>
				</Head>
				<img src={`${process.env.BASE_PATH}/static/pic/math/title.gif`}  />
				<div style={{marginTop: '40px'}}>
					ここでは、数学を扱います。
				</div>
				<hr />
				{this.doors()}
				<hr />
				<Link href="/">戻る</Link>
			</div>
		);
	}
}
