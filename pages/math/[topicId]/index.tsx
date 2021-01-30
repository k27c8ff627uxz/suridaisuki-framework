import React, { Component } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import {
	TopicList,
} from '../../../utils/math_document';

type Props = {
	topic: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const data = require(`${process.env.DOCUMENT_PATH}/math/topics.json`) as TopicList;
	const paths = data.generating.map(topicId => ({
		params: { topicId },
	}));
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<Props> = async (ctx: GetStaticPropsContext) => {
	const topic = ctx.params.topicId;
	return {
		props: { topic: `Hello, ${topic}` },		
	};
};

export default class extends Component<Props> {
	render() {
		return (<div>
			<h1>{this.props.topic}</h1>
		</div>);
	}
}
