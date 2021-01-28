import React, { Component } from 'react';
import Link from 'next/link';

type Props = {
	name: string
};

export default class extends Component<Props> {
	render() {
		return (<div style={{textAlign: 'center'}}>
			<h1 style={{color: 'yellow', margin: '20px'}}>
				{this.props.name}
			</h1>
			<hr />
			<hr />
			<Link href="/math" as="/math">戻る</Link>
		</div>);
	}
}
