
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
	hide?: boolean;
	prefix?: string;
}

export type MathContent = PageContent

export function isPageContent(content: MathContent): content is PageContent {
	const arg = content as PageContent;
	return (
		arg.name !== undefined &&
		arg.title !== undefined
	);
}

export function getTopicName(topic: string) {
	const data = require(`${process.env.DOCUMENT_PATH}/math/${topic}/data.json`);
	return data.title as string;
}
