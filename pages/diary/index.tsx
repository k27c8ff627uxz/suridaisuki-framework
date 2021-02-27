import React, { Component } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { DiaryList, convertDate } from '../../utils/diary';

export default class extends Component {
	render() {
		const diaryList = require(`${process.env.DOCUMENT_PATH}/diary/list.json`) as DiaryList;
		return diaryList.map(diary => <div key={diary.date}>
			<Head>
				<title>日記</title>
			</Head>
			<Link href={`/diary/${diary.date}`}><a>
				{ convertDate(diary.date) }
			</a></Link>
			・・・{ diary.title }
		</div>);
	}
}
