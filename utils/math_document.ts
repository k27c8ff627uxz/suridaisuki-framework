
export type TopicList = {
	generating: string[];
};

export type TopicData = {
	title: string;
	comment: string[];
	contents: MathContent[];
};

export type PageContent = {
	name: string;
	title: string;
	prefix?: string;
}

export type SeparatorContent = {
	sepType: 'Chapter';
	name: string;
}

export type MathContent = { hide?: boolean } & (PageContent | SeparatorContent)

export function isPageContent(content: MathContent): content is PageContent {
	const arg = content as PageContent;
	return (
		arg.name !== undefined &&
		arg.title !== undefined
	);
}

export function isSeparatorContent(content: MathContent): content is SeparatorContent {
	const arg = content as SeparatorContent;
	return (
		arg.sepType !== undefined &&
		arg.name !== undefined
	);
}

export function getTopicName(topic: string) {
	const data = require(`${process.env.DOCUMENT_PATH}/math/${topic}/data.json`);
	return data.title as string;
}
