import React, { Component } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import CSS from 'csstype';
import {
	TopicList,
	TopicData,
	PageContent,
	isPageContent,
} from '../../../../../utils/math_document';

type Props = {
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
	const topicId = ctx.params.topicId;
	const contentId = ctx.params.contentId;
	const topicData = require(`${process.env.DOCUMENT_PATH}/math/${topicId}/data.json`) as TopicData;
	const contentData = topicData.contents.find(item => {
		if (!isPageContent(item)) {
			return false;
		}
		return item.name === contentId;
	}) as PageContent;
	return {
		props: { contentData },		
	};
};

export default class extends Component<Props> {
	render() {
		const titleStyle: CSS.Properties = {
			textAlign: 'center',
			color: 'yellow',
			fontSize: 'xxx-large',
		};
		return (<div>
			<div style={titleStyle}>{this.props.contentData.title}</div>
		</div>);
	}
}
