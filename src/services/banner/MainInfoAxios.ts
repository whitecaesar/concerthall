import { TIMAGE_BANNER_RES, TTXT_BANNER_RES } from "@/types/banners";
import { TITEM_INFO } from "@/types/itemInfo";
import axios, { AxiosResponse } from "axios";

export type TRECOMMEND_LIST_RES = {
	ID: string;
	TYPE: string;
	TITLE: string;
	TOTAL_NUM_ITEM: number;
	ITEM_INFO: TITEM_INFO[];
};

export type TBANNER_RESPONSE = {
	RES_CODE: string;
	RES_MSG: string;
	IMG_BANNER: TIMAGE_BANNER_RES[];
	TXT_BANNER: TTXT_BANNER_RES[];
	RECOMMEND_LIST: TRECOMMEND_LIST_RES[];
};

export async function getBannersAxios(): Promise<TBANNER_RESPONSE | void> {
	const response = await axios.get("http://211.43.189.202/hch/info/home.json");
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러에러ㅜ_ㅜ`);
	}
}
