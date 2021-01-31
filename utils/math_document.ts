
export type TopicList = {
	generating: string[];
};

export type TopicData = {
	title: string;
	comment: string[];
};

export function getTopicName(topic: string) {
	const data = require(`${process.env.DOCUMENT_PATH}/math/${topic}/data.json`);
	return data.title as string;
}
