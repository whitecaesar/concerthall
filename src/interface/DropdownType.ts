export type DropdownOption = {
	label: string;
	value: string;
};

export interface DropdownProps {
	options: DropdownOption[];
}

export const dropdownOptions: DropdownOption[] = [
	{ label: "최근순", value: "recent" },
	{ label: "재생 빈도 수", value: "frequency" },
	{ label: "선호도순", value: "preference" },
	{ label: "이름 오름차순", value: "ascending" },
	{ label: "이름 내림차순", value: "descending" },
];
