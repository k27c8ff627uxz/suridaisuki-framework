import React, { Component } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
	TopicList,
	TopicData,
	PageContent,
	MathContent,
	isPageContent,
} from '../../../utils/math_document';

type Props = {
	topicData: TopicData;
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
	const topicData = require(`${process.env.DOCUMENT_PATH}/math/${topic}/data.json`) as TopicData;
	return {
		props: { topicData },		
	};
};

export default class extends Component<Props> {
	content(contents: MathContent[]) {
		const mainContents = contents.filter((item): item is PageContent => isPageContent(item) && item.hide !== true);
		return (
			<ol style={{display: 'inline-block', textAlign: 'left'}}>
				{ mainContents.map(item => (
					<li key={item.name}>
						{item.title}
					</li>
				))}
			</ol>
		);
	}

	render() {
		return (<div style={{textAlign: 'center'}}>
			<Head>
				<title>{this.props.topicData.title}</title>
			</Head>
			<h1 style={{color: 'yellow'}}>{this.props.topicData.title}</h1>
			<div style={{color: 'red'}}>
				{ this.props.topicData.comment.map((text, index) => (
					<div key={index}>{text}</div>
				))}
			</div>
			<hr />
			{this.content(this.props.topicData.contents)}
			<hr />
			<Link href="/math">戻る</Link>
		</div>);
	}
}
