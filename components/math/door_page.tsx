import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { getTopicName } from '../../utils/math_document';

export type TopicInTopicGroup = {
	type: 'linked';
	topic: string;
} | {
	type: 'unlinked';
	topicName: string;
};

export type TopicGroup = {
	title: string;
	comment: string[];
	topics: TopicInTopicGroup[];
};

type Props = {
	name: string
};

export default class extends Component<Props> {
	getTopicGroup(id: string): TopicGroup {
		const data = require(`${process.env.DOCUMENT_PATH}/math/topic_group.json`);
		return data[id] as TopicGroup;
	}

	topicContent(topic: TopicInTopicGroup) {
		switch(topic.type) {
		case 'linked': {
			const topicName = getTopicName(topic.topic);
			return (
				<Link href={`/math/${topic.topic}/`}>
					<a>{topicName}</a>
				</Link>
			);
		}
		case 'unlinked': {
			return <span>{topic.topicName}</span>;
		}
		}
	}

	render() {
		const data = this.getTopicGroup(this.props.name);
		return (<div style={{textAlign: 'center'}}>
			<Head>
				<title>{data.title}</title>
			</Head>
			<h1 style={{color: 'yellow', margin: '20px'}}>
				{data.title}
			</h1>
			<div style={{color: 'red'}}>
				{ data.comment.map((text, index) => (
					<div key={index}>{text}</div>
				))}
			</div>
			<hr />
			<ul style={{display: 'inline-block'}}>
				{
					data.topics.map((topic, index) => 
						<li key={index} style={{textAlign: 'left'}}>{this.topicContent(topic)}</li>
					)
				}
			</ul>
			<hr />
			<Link href="/math" as="/math">戻る</Link>
		</div>);
	}
}
