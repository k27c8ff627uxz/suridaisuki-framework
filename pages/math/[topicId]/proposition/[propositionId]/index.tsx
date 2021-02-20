import fs from 'fs';
import React, { Component } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import JsxParser from 'react-jsx-parser';
import {
	TopicList,
	TopicData,
} from '../../../../../utils/math_document';
import {
	pic as picTopic,
	exp,
	key,
	key1,
	key2,
	key3,
	key4,
	hide,
	huge,
} from '../../../../../components/custom_elements';

type Props = {
	topicId: string;
	propositionText: string;
	proofText: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const topicList = require(`${process.env.DOCUMENT_PATH}/math/topics.json`) as TopicList;
	const paths = topicList.generating.map(topicId => {
		const topicData = require(`${process.env.DOCUMENT_PATH}/math/${topicId}/data.json`) as TopicData;
		const propositions = topicData.propositions;

		if (propositions === undefined) return [];

		return propositions
			.filter(proposition => proposition.hasProof)
			.map(proposition => ({
				params: {
					topicId,
					propositionId: proposition.name,
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
	const propositionId = ctx.params.propositionId as string;

	const propositionText = fs.readFileSync(`${process.env.DOCUMENT_PATH}/math/${topicId}/proposition/${propositionId}/proposition.htm`)
		.toString().replace(/({|})/g, '{\'$1\'}');
	const proofText = fs.readFileSync(`${process.env.DOCUMENT_PATH}/math/${topicId}/proposition/${propositionId}/proof.htm`)
		.toString().replace(/({|})/g, '{\'$1\'}');
	return {
		props: {
			topicId,
			propositionText,
			proofText,
		},
	};
};

export default class extends Component<Props> {
	render() {
		const pic = picTopic(this.props.topicId);
		return (<div>
			<Head>
				<title>証明</title>
			</Head>
			<hr />
			<JsxParser
				jsx={this.props.propositionText}
				components={{
					exp,
				}}
			/>
			<hr />
			<JsxParser
				jsx={this.props.proofText}
				components={{
					exp,
					pic,
					key,
					key1,
					key2,
					key3,
					key4,
					hide,
					huge,
				}}
			/>
			<hr />
			<div style={{textAlign: 'center'}}>
				<Link href={`/math/${this.props.topicId}/proposition`}>戻る</Link>
			</div>
		</div>);
	}
}
