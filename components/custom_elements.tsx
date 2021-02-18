import React from 'react';
import MathJax from 'react-mathjax';

type Props = {
	children: React.ReactNode;
}

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

export const pic = (topicId: string) => (
	({ children }: Props) => {
		const picName = reformReactNode(children);
		if (typeof picName !== 'string') throw `Error: <pic>${children}</pic>`;
		return (
			<img src={`${process.env.BASE_PATH}/math/${topicId}/pic/${picName}`}/>
		);
	}
);

export function exp({ children }: Props) {
	const formula = reformReactNode(children);
	if (typeof formula !== 'string') throw `Error: <pic>${children}</pic>`;
	return (
		<MathJax.Provider>
			<MathJax.Node inline formula={formula} />
		</MathJax.Provider>
	);
}

export function key({ children }: Props) {
	return (
		<span style={{color: 'red'}}>
			{children}
		</span>
	);
}

export function key1({ children }: Props) {
	return (
		<span style={{color: 'yellow'}}>
			{children}
		</span>
	);
}

export function key2({ children }: Props) {
	return (
		<span style={{color: 'lime'}}>
			{children}
		</span>
	);
}

export function key3({ children }: Props) {
	return (
		<span style={{color: 'pink'}}>
			{children}
		</span>
	);
}

export function key4({ children }: Props) {
	return (
		<span style={{color: 'aqua'}}>
			{children}
		</span>
	);
}

export function hide({ children }: Props) {
	return (
		<span style={{color: 'black'}}>
			{children}
		</span>
	);
}

export function huge({ children }: Props) {
	return (
		<span style={{color: 'yellow', fontSize: 'xx-large'}}>
			{children}
		</span>
	);
}
