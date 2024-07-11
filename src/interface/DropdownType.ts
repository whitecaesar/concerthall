export type DropdownOption = {
	label: string;
	value: string;
};

export interface DropdownProps {
	options: DropdownOption[];
	onRecentChange: (event: string) => void;
}

const optionsByLang: { [key: string]: DropdownOption[] } = {
	en: [
		{ label: "Recent", value: "recent" },
		{ label: "Preference", value: "preference" },
		{ label: "Name Ascending", value: "ascending" },
		{ label: "Name Descending", value: "descending" },
	],
	kr: [
		{ label: "최근순", value: "recent" },
		{ label: "선호도순", value: "preference" },
		{ label: "이름 오름차순", value: "ascending" },
		{ label: "이름 내림차순", value: "descending" },
	],
	de: [
		{ label: "Neueste", value: "recent" },
		{ label: "Präferenz", value: "preference" },
		{ label: "Name Aufsteigend", value: "ascending" },
		{ label: "Name Absteigend", value: "descending" },
	],
	jp: [
		{ label: "最新順", value: "recent" },
		{ label: "好み順", value: "preference" },
		{ label: "名前昇順", value: "ascending" },
		{ label: "名前降順", value: "descending" },
	],
	fr: [
		{ label: "Récent", value: "recent" },
		{ label: "Préférence", value: "preference" },
		{ label: "Nom Ascendant", value: "ascending" },
		{ label: "Nom Descendant", value: "descending" },
	],
	zh: [
		{ label: "最近", value: "recent" },
		{ label: "偏好", value: "preference" },
		{ label: "名称升序", value: "ascending" },
		{ label: "名称降序", value: "descending" },
	],
};

const albumOptionsByLang: { [key: string]: DropdownOption[] } = {
	en: [
		{ label: "Preference", value: "preference" },
		{ label: "Name Ascending", value: "ascending" },
		{ label: "Name Descending", value: "descending" },
	],
	kr: [
		{ label: "선호도순", value: "preference" },
		{ label: "이름 오름차순", value: "ascending" },
		{ label: "이름 내림차순", value: "descending" },
	],
	de: [
		{ label: "Präferenz", value: "preference" },
		{ label: "Name Aufsteigend", value: "ascending" },
		{ label: "Name Absteigend", value: "descending" },
	],
	jp: [
		{ label: "好み順", value: "preference" },
		{ label: "名前昇順", value: "ascending" },
		{ label: "名前降順", value: "descending" },
	],
	fr: [
		{ label: "Préférence", value: "preference" },
		{ label: "Nom Ascendant", value: "ascending" },
		{ label: "Nom Descendant", value: "descending" },
	],
	zh: [
		{ label: "偏好", value: "preference" },
		{ label: "名称升序", value: "ascending" },
		{ label: "名称降序", value: "descending" },
	],
};

export function getDropdownOptions(lang: string): DropdownOption[] {
	return optionsByLang[lang] || optionsByLang.en;
}

export function getAlbumDropdownOptions(lang: string): DropdownOption[] {
	return albumOptionsByLang[lang] || albumOptionsByLang.en;
}


