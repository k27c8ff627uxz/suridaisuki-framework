import React, { Component } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import {
	TopicList,
	TopicData,
	MathContent,
	isPageContent,
	isSeparatorContent,
	SeparatorContent,
	getPageTitle,
	isOuterPageContent,
} from '../../../utils/math_document';

type Props = {
	topicData: TopicData;
	topicId: string;
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
	const topic = ctx.params.topicId as string;
	const topicData = require(`${process.env.DOCUMENT_PATH}/math/${topic}/data.json`) as TopicData;
	return {
		props: {
			topicData,
			topicId: topic,
		},
	};
};

export default class extends Component<Props> {
	contentLine(content: MathContent) {
		if (isPageContent(content)) {
			if (content.hide) return undefined;
			return (<span>
				{ content.prefix ?? <span>{content.prefix}</span>}
				<Link href={`/math/${this.props.topicId}/page/${content.name}`}><a>
					{content.title}
				</a></Link>
			</span>);
		} else if (isOuterPageContent(content)) {
			return (
				<Link href={`/math/${content.place}/page/${content.name}`}><a>
					{getPageTitle(content.place, content.name)}
				</a></Link>
			);
		} else if (isSeparatorContent(content)) {
			return (<h5>{ content.name }</h5>);
		}
	}

	content(contents: MathContent[]) {
		type SeparatedContents = {
			isSeparate: false;
			contents: MathContent[]
		} | {
			isSeparate: true;
			content: SeparatorContent;
		};
		const separatedContents =
			contents.reduce<SeparatedContents[]>((prev, current) => {
				if (isSeparatorContent(current)) {
					prev.push({
						isSeparate: true,
						content: current,
					});
				} else {
					if (prev.length === 0) {
						prev.push({
							isSeparate: false,
							contents: [ current ],
						});
					} else {
						const lastData = prev[prev.length - 1];
						if(lastData.isSeparate === true) {
							prev.push({
								isSeparate: false,
								contents: [ current ],
							});
						} else {
							lastData.contents.push(current);
						}
					}
				}
				return prev;
			}, []);
		return (
			<div style={{display: 'inline-block'}}>
				{ separatedContents.map((contents, index) => {
					if (contents.isSeparate === false) {
						return (
							<ol style={{textAlign: 'left'}} key={index}>
								{ contents.contents.map(item => (
									<li key={item.name}>
										{ this.contentLine(item) }
									</li>
								))}
							</ol>
						);
					} else {
						return (
							<div key={index}>
								{this.contentLine(contents.content)}
							</div>
						);
					}
				})}
			</div>

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
			{this.content(this.props.topicData.contents.filter(item => !item.hide))}
			<hr />
			<Link href="/math">戻る</Link>
		</div>);
	}
}
