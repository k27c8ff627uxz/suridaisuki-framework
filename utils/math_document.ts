
export type TopicList = {
	generating: string[];
};

export type TopicData = {
	title: string;
	comment: string[];
	contents: MathContent[];
	propositions?: Proposition[]
};

export type PageContent = {
	name: string;
	title: string;
	prefix?: string;
	paragraphs: { name: string, title: string }[],
}

export type OuterPageContent = {
	name: string;
	place: string;
}

export type SeparatorContent = {
	sepType: 'Chapter';
	name: string;
}

export type MathContent = { hide?: boolean } & (PageContent | OuterPageContent | SeparatorContent)

export type Proposition = {
	name: string;
	hasProof: boolean;
}

export function isPageContent(content: MathContent): content is PageContent {
	const arg = content as PageContent;
	return (
		arg.name !== undefined &&
		arg.title !== undefined &&
		arg.paragraphs !== undefined
	);
}

export function isOuterPageContent(content: MathContent): content is OuterPageContent {
	const arg = content as OuterPageContent;
	return (
		arg.name !== undefined &&
		arg.place !== undefined
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

export function getPageTitle(topic: string, contentName: string) {
	const data = require(`${process.env.DOCUMENT_PATH}/math/${topic}/data.json`) as TopicData;
	return data.contents.find(
		(content): content is PageContent => isPageContent(content) && content.name === contentName
	).title;
}
