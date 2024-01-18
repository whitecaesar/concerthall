import { TITEM_INFO } from "@/types/itemInfo";
import axios, { AxiosResponse } from "axios";

export type TVIEWALL_LIST_RES = {
	ID: string;
	TYPE: string;
	TITLE: string;
	TOTAL_NUM_ITEM: number;
	ITEM_INFO: TITEM_INFO[];
};

export type TVIEWALL_LIST_RESPONSE = {
	RES_CODE: string;
	RES_MSG: string;
	VIEWALL_LIST: TVIEWALL_LIST_RES[];
};

export async function getViewallAxios(): Promise<TVIEWALL_LIST_RESPONSE | void> {
	const response = await axios.get(
		"http://211.43.189.202/hch/{idRecom}/recomDetail.json"
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러에러ㅜ_ㅜ`);
	}
}
