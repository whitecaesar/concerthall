import axios, { AxiosResponse } from "axios";

export type ITEM_INFO_TYPE = {
	NUM_THUMBUP?: number; //CITECH에서 제공 예정
	ID: number;
	THUMBNAIL: string;
	TITLE: string;
	ARTIST?: string;
	GENRE?: string;
	TOTAL_NUM_TRACK?: number;
};

export type VIEWALL_LIST_TYPE = {
	TYPE: "ALBUM" | "SINGLE";
	ID: number;
	TITLE: string;
	TOTAL_NUM_ITEM?: number;
	ITEM_INFO: ITEM_INFO_TYPE[];
};

export type TVIEWALL_LIST_RESPONSE = {
	idRecom: string;
	RES_CODE: string;
	VIEWALL_LIST: VIEWALL_LIST_TYPE[];
};

export async function getViewallAxios(): Promise<TVIEWALL_LIST_RESPONSE | void> {
	const response = await axios.get(
		"http://cip.ontown.co.kr/hch/{idRecom}/recomDetail.json"
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다.`);
	}
}
