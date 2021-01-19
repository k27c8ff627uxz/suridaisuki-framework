import React, { Component } from 'react';
import CSS from 'csstype';
import Head from 'next/head';
import Link from 'next/link';

export default class extends Component {
	render() {
		const captionStyle: CSS.Properties = {
			color: 'yellow',
			textAlign: 'center',
		};

		return (
			<div>
				<Head>
					<title>ぷろふぃーる</title>
				</Head>
				<h1 style={captionStyle}>ぷろふぃーる</h1>
				<table border='1' align='center'>
					<tbody>
						<tr>
							<th>所在地</th>
							<td>名古屋辺り</td>
						</tr>
						<tr>
							<th>現在</th>
							<td>名古屋大学多元数理科学研究科(分かりやすく言えば、理学部数理学科)</td>
						</tr>
						<tr>
							<th>アドレス</th>
							<td><a href="mailto:k27c8_math@yahoo.co.jp">k27c8_mathあっとまーくyahoo.co.jp</a></td>
						</tr>
						<tr>
							<th>Twitter</th>
							<td><a href="https://twitter.com/suridaisuki">@suridaisuki</a></td>
						</tr>
						<tr>
							<th>血液型</th>
							<td>ＡＢ型</td>
						</tr>
						<tr>
							<th>誕生日</th>
							<td>牡羊座の３／２４</td>
						</tr>
						<tr>
							<th>好きな分野</th>
							<td>やっぱり数学と物理とプログラミングが大好き。最近は、天体観測にはまっちゃいました☆</td>
						</tr>
						<tr>
							<th>趣味</th>
							<td>
								？？？<br />
								あと、ダンスと歌かなぁ？<br />
								結構、多趣味とか言われます
							</td>
						</tr>
						<tr>
							<th>好きなアーティスト</th>
							<td>
								ジャニーズ。最近はNEWSとかHey!Say!JUMPとか☆<br />
								w-inds.
							</td>
						</tr>
						<tr>
							<th>履歴</th>
							<td>
								<a href="http://www.mie-u.ac.jp/">三重大学</a><a href="http://www.eng.mie-u.ac.jp/">工学部</a><a href="http://www.info.mie-u.ac.jp/">情報工学科</a>(<a href="https://twitter.com/m_u_d_c">三重大学ダンス部</a>)→<a href="http://www.nagoya-u.ac.jp/">名古屋大学</a><a href="http://www.math.nagoya-u.ac.jp/ja">多元数理科学研究科</a>→？？？
							</td>
						</tr>
					</tbody>
				</table>
				<div style={{textAlign: 'center'}}>
					<Link href="/info">戻る</Link>
				</div>
			</div>
		);
	}
}
