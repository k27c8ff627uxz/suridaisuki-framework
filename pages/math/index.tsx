import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { TopicGroup } from '../../components/math/door_page';
import { getTopicName } from '../../utils/math_document';

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

	getTopicsOfGroup(groupId: string): string[] {
		const groupData = require(`${process.env.DOCUMENT_PATH}/math/topic_group.json`);
		const topicGroup = groupData[groupId] as TopicGroup | undefined;
		if (topicGroup === undefined) return [];
		return topicGroup.topics
			.filter((topic): topic is { type: 'linked', topic: string } => topic.type === 'linked')
			.map(topic => topic.topic as string);
	}

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
		const topicList = this.doorsData.map(item => {
			const topicList = this.getTopicsOfGroup(item.link);
			return (<td key={item.link} style={{fontSize: 'small'}} width="101">
				{
					topicList
						.map(item =>
							<Link key={item} href={`/math/${item}`}>
								<a>{getTopicName(item)}</a>
							</Link>
						).reduce((previousValue, currentValue, index) => {
							if (previousValue.length === 0) return [ currentValue ];
							return [
								...previousValue,
								<span key={`${index}-sep`}> / </span>,
								currentValue,
							];
						}, [])
				}
			</td>);
		});

		return (
			<table align="center" style={{width: '80%'}}>
				<tr>
					{headData}
				</tr>
				<tr>
					{imgData}
				</tr>
				<tr>
					{topicList}
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
