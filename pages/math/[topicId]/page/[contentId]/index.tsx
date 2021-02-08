import React, { Component } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import CSS from 'csstype';
import Link from 'next/link';
import {
	TopicList,
	TopicData,
	PageContent,
	isPageContent,
} from '../../../../../utils/math_document';

type Props = {
	topicId: string;
	contentData: PageContent;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const topicList = require(`${process.env.DOCUMENT_PATH}/math/topics.json`) as TopicList;
	const paths = topicList.generating.map(topic => {
		const topicData = require(`${process.env.DOCUMENT_PATH}/math/${topic}/data.json`) as TopicData;
		return topicData.contents
			.filter((item): item is PageContent => isPageContent(item))
			.map(item => ({
				params: {
					topicId: topic,
					contentId: item.name,
				},
			}));
	}).flat();
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<Props> = async (ctx: GetStaticPropsContext) => {
	const topicId = ctx.params.topicId as string;
	const contentId = ctx.params.contentId as string;
	const topicData = require(`${process.env.DOCUMENT_PATH}/math/${topicId}/data.json`) as TopicData;
	const contentData = topicData.contents.find(item => {
		if (!isPageContent(item)) {
			return false;
		}
		return item.name === contentId;
	}) as PageContent;
	return {
		props: { topicId, contentData },		
	};
};

export default class extends Component<Props> {
	paragraph(data: {name: string; title: string}) {
		const { name, title } = data;
		return (
			<div key={name}>
				<hr />
				<a name={name}></a>
				<h2 style={{color: 'lime'}}>{title}</h2>
			</div>
		);
	}

	render() {
		const titleStyle: CSS.Properties = {
			textAlign: 'center',
			color: 'yellow',
			fontSize: 'xxx-large',
		};
		return (<div>
			<div style={titleStyle}>{this.props.contentData.title}</div>
			{ this.props.contentData.paragraphs.map(item => this.paragraph(item)) }
			<hr />
			<div style={{textAlign: 'center'}}>
				<Link href={`/math/${this.props.topicId}`}>戻る</Link>
			</div>
		</div>);
	}
}
