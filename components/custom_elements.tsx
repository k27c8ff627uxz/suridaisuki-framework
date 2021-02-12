import React from 'react';

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
