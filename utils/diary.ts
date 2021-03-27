
export type DiaryData = {
  date: string;
  title: string;
}

export type DiaryList = DiaryData[];

export function convertDate(dateStr: string) {
	const date = new Date(dateStr);
	return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}
