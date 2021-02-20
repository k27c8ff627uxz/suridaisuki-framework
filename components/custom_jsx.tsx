import React, { PropsWithChildren } from 'react';
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

const picWithPlace = (place: string) => (
	({ children }: PropsWithChildren<void>) => {
		const picName = reformReactNode(children);
		if (typeof picName !== 'string') throw `Error: <pic>${children}</pic>`;
		return (
			<img src={`${place}/${picName}`} />
		);
	}
);

function exp({ children }: PropsWithChildren<void>) {
	const formula = reformReactNode(children);
	if (typeof formula !== 'string') throw `Error: <pic>${children}</pic>`;
	return (
		<MathJax.Provider>
			<MathJax.Node inline formula={`\\displaystyle ${formula}`} />
		</MathJax.Provider>
	);
}

function key({ children }: PropsWithChildren<void>) {
	return (
		<span style={{color: 'red'}}>
			{children}
		</span>
	);
}

function key1({ children }: PropsWithChildren<void>) {
	return (
		<span style={{color: 'yellow'}}>
			{children}
		</span>
	);
}

function key2({ children }: PropsWithChildren<void>) {
	return (
		<span style={{color: 'lime'}}>
			{children}
		</span>
	);
}

function key3({ children }: PropsWithChildren<void>) {
	return (
		<span style={{color: 'pink'}}>
			{children}
		</span>
	);
}

function key4({ children }: PropsWithChildren<void>) {
	return (
		<span style={{color: 'aqua'}}>
			{children}
		</span>
	);
}

function hide({ children }: PropsWithChildren<void>) {
	return (
		<span style={{color: 'black'}}>
			{children}
		</span>
	);
}

function huge({ children }: PropsWithChildren<void>) {
	return (
		<span style={{color: 'yellow', fontSize: 'xx-large'}}>
			{children}
		</span>
	);
}

export type Props = {
	jsx: string;
	picPlace: string;
}

export default function customJSX(props: Props) {
	const pic = picWithPlace(props.picPlace);
	return <JsxParser
		jsx={props.jsx}
		components={{
			pic,
			exp,
			key,
			key1,
			key2,
			key3,
			key4,
			hide,
			huge,
		}}
	/>;
}
