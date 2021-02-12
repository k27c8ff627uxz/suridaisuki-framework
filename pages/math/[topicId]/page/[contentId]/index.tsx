import fs from 'fs';
import React, { Component } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import CSS from 'csstype';
import Link from 'next/link';
import JsxParser from 'react-jsx-parser';
import {
	TopicList,
	TopicData,
	PageContent,
	isPageContent,
} from '../../../../../utils/math_document';
import {
	pic as picTopic,
} from '../../../../../components/custom_elements';

type Props = {
	topicId: string;
	title: string;
	paragraphs: Paragraph[];
}

type Paragraph = {
	name: string;
	title: string;
	rawText: string;
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
	const paragraphs = contentData.paragraphs.map(item => {
		const rawText = fs.readFileSync(`${process.env.DOCUMENT_PATH}/math/${topicId}/page/${contentData.name}/${item.name}.htm`)
			.toString().replace(/({|})/g, '{\'$1\'}');
		return {
			rawText,
			name: item.name,
			title: item.title,
		} as Paragraph;
	});
	return {
		props: {
			topicId,
			paragraphs,
			title: contentData.title,
		},
	};
};

export default class extends Component<Props> {
	paragraph(data: Paragraph) {
		const { name, title, rawText } = data;
		const pic = picTopic(this.props.topicId);
		return (
			<div key={name}>
				<hr />
				<a name={name}></a>
				<h2 style={{color: 'lime'}}>{title}</h2>
				<JsxParser
					jsx={rawText}
					components={{
						pic,
					}}
				/>
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
			<div style={titleStyle}>{this.props.title}</div>
			{ this.props.paragraphs.map(item => this.paragraph(item)) }
			<hr />
			<div style={{textAlign: 'center'}}>
				<Link href={`/math/${this.props.topicId}`}>戻る</Link>
			</div>
		</div>);
	}
}
