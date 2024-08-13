import axios, { AxiosResponse } from "axios";
import { ARTIST_INFO_TYPE, VIEWALL_LIST_TYPE } from "../contents/ViewAllAxios";

export type TKEYWORD_INFO = {
	KEY: string;
	NAME: string;
};

export type TCATEGORY_RES = {
	TITLE: string;
	KEWORD: TKEYWORD_INFO[];
};

export type CATEGORY_LIST_RESPONSE = {
	RES_CODE: string;
	RES_MSG: string;
	CATEGORY: TCATEGORY_RES[];
	RECOMMEND_LIST: VIEWALL_LIST_TYPE[];
};

export async function getExploreAxios(): Promise<CATEGORY_LIST_RESPONSE> {
	const response: AxiosResponse = await axios.get(
		"http://cip.ontown.co.kr/hch/recom/info.json"
	);

	if (response.status === 200) {
		const data = response.data as CATEGORY_LIST_RESPONSE;
		
		const parsedRecommendList = data.RECOMMEND_LIST.map(list => ({
			...list,
			ITEM_INFO: list.ITEM_INFO.map(item => ({
			...item,
			ARTIST: JSON.parse(item.S_ARTIST) as ARTIST_INFO_TYPE[]
			}))
		}));
		
		return {
			...data,
			RECOMMEND_LIST: parsedRecommendList
		};
	} else {
		throw new Error(
			`데이터를 불러오는 중 오류가 발생했습니다. (응답 코드: ${response.status})`
		);
	}
}
