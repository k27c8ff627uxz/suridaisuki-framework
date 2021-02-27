import fs from 'fs';
import React, { Component } from 'react';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import CSS from 'csstype';
import Head from 'next/head';
import Link from 'next/link';
import CustomJSX from '../../../components/custom_jsx';
import { DiaryList, convertDate } from '../../../utils/diary';

type Props = {
	date: string;
	title: string;
	rawText: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
	const diaryList = require(`${process.env.DOCUMENT_PATH}/diary/list.json`) as DiaryList;
	const paths = diaryList.map(diary => ({
		params: {
			date: diary.date,
		},
	}));
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<Props> = async (ctx: GetStaticPropsContext) => {
	const date = ctx.params.date as string;
	const diaryList = require(`${process.env.DOCUMENT_PATH}/diary/list.json`) as DiaryList;
	const title = diaryList.find(diary => diary.date === date).title;
	const rawText = fs.readFileSync(`${process.env.DOCUMENT_PATH}/diary/doc/${date}.htm`).toString();
	return {
		props: {
			date,
			title,
			rawText,
		},
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
			<Head>
				<title>{ convertDate(this.props.date)} { this.props.title }</title>
			</Head>
			<div style={titleStyle}>{this.props.title}</div>
			<hr />
			<CustomJSX jsx={this.props.rawText} picPlace='' />
			<hr />
			<div style={{textAlign: 'center'}}>
				<Link href='/diary'>戻る</Link>
			</div>
		</div>);
	}
}
