import React from 'react';
import MathJax from 'react-mathjax';

type Props = {
	// props.childrenでとってこれないのが少し気持ち悪い
	children: { props: { children: React.ReactNode }};
}

export const pic = (topicId: string) => (
	({ children }: Props) => {
		const { props } = children;
		return (
			<img src={`${process.env.BASE_PATH}/math/${topicId}/pic/${props.children}`}/>
		);
	}
);

export function exp({ children }: Props) {
	const { props } = children;
	if (props === undefined) return <div />;
	const formula = props.children as string;
	return (
		<MathJax.Provider>
			<MathJax.Node inline formula={formula} />
		</MathJax.Provider>
	);
}
