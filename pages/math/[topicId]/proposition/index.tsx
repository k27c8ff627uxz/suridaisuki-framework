import fs from 'fs';
import React, { Component } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import JsxParser from 'react-jsx-parser';
import {
	TopicList,
	TopicData,
	Proposition,
} from '../../../../utils/math_document';
import { exp } from '../../../../components/custom_elements';

type Props = {
	title: string;
	topicId: string;
	propositions: PropositionWithText[];
}

type PropositionWithText = Proposition & { propsitionText: string };

export const getStaticPaths: GetStaticPaths = async () => {
	const topicList = require(`${process.env.DOCUMENT_PATH}/math/topics.json`) as TopicList;
	const paths = topicList.generating.filter(topicId => {
		const topicData = require(`${process.env.DOCUMENT_PATH}/math/${topicId}/data.json`) as TopicData;
		return topicData.propositions !== undefined;
	}).map(topicId => ({
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
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const propositions = topicData.propositions!;
	const propositionsWithText = propositions
		.map(proposition => {
			const rawText = fs.readFileSync(`${process.env.DOCUMENT_PATH}/math/${topic}/proposition/${proposition.name}/proposition.htm`)
				.toString().replace(/({|})/g, '{\'$1\'}');
			return {
				...proposition,
				propsitionText: rawText,
			};
		});
	return {
		props: {
			title: topicData.title,
			topicId: topic,
			propositions: propositionsWithText,
		},
	};
};

export default class extends Component<Props> {
	propositions(propositions: PropositionWithText[]) {
		const propositionLink = (proposition: Proposition) =>
			proposition.hasProof
				? `<a href="/math/${this.props.topicId}/proposition/${proposition.name}">●</a> `
				: '● ';
		return propositions.map(proposition => (<div key={proposition.name}>
			<a name={proposition.name} />
			<JsxParser
				jsx={propositionLink(proposition) + proposition.propsitionText}
				components={{
					exp,
				}}
			/>
			<hr />
		</div>));
	}

	render() {
		return (<div>
			<Head>
				<title>{this.props.title}</title>
			</Head>
			<h1 style={{color: 'yellow'}}>{this.props.title}</h1>
			<hr />
			{ this.propositions(this.props.propositions) }
			<div style={{textAlign: 'center'}}>
				<Link href={`/math/${this.props.topicId}`}>戻る</Link>
			</div>
		</div>);
	}
}
