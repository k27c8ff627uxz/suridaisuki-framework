import React, { Component, PropsWithChildren } from 'react';
import Link, { LinkProps } from 'next/link';
import MathJax from 'react-mathjax';
import JsxParser from 'react-jsx-parser';

function reformReactNode(node: React.ReactNode): React.ReactNode {
	if (Array.isArray(node)) {
		const ret_val = node
			.map(reformReactNode)
			.reduce<React.ReactNodeArray>((prev, current) => {
				if (prev.length === 0) return [ current ];
				const prevValue = prev[prev.length - 1];
				if (typeof prevValue === 'string' && typeof current === 'string') {
					prev[prev.length - 1] = prevValue + current;
					return prev;
				}
				return [ ...prev, current ];
			}, []);
		if (ret_val.length === 0) throw `Not Implemented ${node}`;
		if (ret_val.length === 1) return ret_val[0];
		return ret_val;
	} else if (node instanceof Object && 'props' in node) {
		if (node.type.toString() === 'Symbol(react.fragment)') {
			return node.props.children;
		} else {
			return {
				...node,
				props: {
					...node.props,
					children: reformReactNode(node.props.children),
				},
			};
		}
	} else if (typeof node === 'string') {
		return node;
	} else if (typeof node === 'number' ) {
		return node.toString();
	} else if (node === undefined) {
		return '';
	} else if (typeof node === 'boolean' || typeof node === 'function') {
		throw `Not Implemented: ${node}`;
	}
}

export type Props = {
	jsx: string;
	picPlace?: string;
	nlinkPlace?: string;
	tlinkPlace?: string;
}

export default class extends Component<PropsWithChildren<Props>> {

	pic = (picPlace?: string) => function({ children }: PropsWithChildren<void>) {
		const picName = reformReactNode(children);
		if (picPlace === undefined || typeof picName !== 'string') throw `Error: <pic>${children}</pic>`;
		return (
			<img src={`${picPlace}/${picName}`} />
		);
	}
	
	exp({ children }: PropsWithChildren<void>) {
		const formula = reformReactNode(children);
		if (typeof formula !== 'string') throw `Error: <pic>${children}</pic>`;
		return (
			<MathJax.Provider>
				<MathJax.Node inline formula={`\\displaystyle ${formula}`} />
			</MathJax.Provider>
		);
	}
	
	key({ children }: PropsWithChildren<void>) {
		return (
			<span style={{color: 'red'}}>
				{children}
			</span>
		);
	}
	
	key1({ children }: PropsWithChildren<void>) {
		return (
			<span style={{color: 'yellow'}}>
				{children}
			</span>
		);
	}
	
	key2({ children }: PropsWithChildren<void>) {
		return (
			<span style={{color: 'lime'}}>
				{children}
			</span>
		);
	}
	
	key3({ children }: PropsWithChildren<void>) {
		return (
			<span style={{color: 'pink'}}>
				{children}
			</span>
		);
	}
	
	key4({ children }: PropsWithChildren<void>) {
		return (
			<span style={{color: 'aqua'}}>
				{children}
			</span>
		);
	}
	
	hide({ children }: PropsWithChildren<void>) {
		return (
			<span style={{color: 'black'}}>
				{children}
			</span>
		);
	}
	
	huge({ children }: PropsWithChildren<void>) {
		return (
			<span style={{color: 'yellow', fontSize: 'xx-large'}}>
				{children}
			</span>
		);
	}
	
	nlink = (nlinkPlace?: string) => function({ children, href }: PropsWithChildren<LinkProps>) {
		if (nlinkPlace === undefined) throw `Error: <nlink>${children}</nlink>`;
		return (
			<Link href={`${nlinkPlace}/${href}`}><a>
				{children}
			</a></Link>
		);
	}
	
	plink({ children, href }: PropsWithChildren<LinkProps>) {
		return (
			<Link href={`/math/${href}`}><a>
				{children}
			</a></Link>
		);
	}
	
	nplink({ children, href }: PropsWithChildren<LinkProps>) {
		return (
			<Link href={`/math/${href}`}><a>
				{children}
			</a></Link>
		);
	}
	
	tlink = (tlinkPlace?: string) => function({ children, href }: PropsWithChildren<LinkProps>) {
		if (tlinkPlace === undefined) throw `Error: <tlink>${children}</tlink>`;
		return (
			<Link href={`${tlinkPlace}/${href}`}><a>
				{children}
			</a></Link>
		);
	}
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	comment(props: PropsWithChildren<void>) {
		return <span /> as JSX.Element;
	}

	render() {
		return <JsxParser
			jsx={this.props.jsx}
			components={{
				pic: this.pic(this.props.picPlace),
				exp: this.exp,
				key: this.key,
				key1: this.key1,
				key2: this.key2,
				key3: this.key3,
				key4: this.key4,
				hide: this.hide,
				huge: this.huge,
				nlink: this.nlink(this.props.nlinkPlace),
				plink: this.plink,
				nplink: this.nplink,
				tlink: this.tlink(this.props.tlinkPlace),
				comment: this.comment,
			}}
			onError={(err) => {
				console.log(err);
				throw `JSX parse error: ${err}`; 
			}}
		/>;
	}
}
