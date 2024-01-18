import axios, { AxiosResponse } from "axios";
import { TRECOMMEND_LIST_RES } from "../banner/MainInfoAxios";

export type TCATEGORY_RES = {
	TITLE: string;
	KEYWORD: string;
};

export type CATEGORY_LIST_RESPONSE = {
	RES_CODE: string;
	RES_MSG: string;
	CATEGORY: TCATEGORY_RES[];
	RECOMMEND_LIST: TRECOMMEND_LIST_RES[];
};

export async function getExploreAxios(): Promise<CATEGORY_LIST_RESPONSE | void> {
	const response = await axios.get("http://211.43.189.202/hch/info/recom.json");
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러에러ㅜ_ㅜ`);
	}
}
