import axios, { AxiosResponse } from "axios";
import { ITEM_INFO_TYPE, VIEWALL_LIST_TYPE, TVIEWALL_LIST_RESPONSE, ARTIST_INFO_TYPE } from "../contents/ViewAllAxios";
import { API_URL_CIP, getCookie } from "../common";

//텍스트 배너 타입
export type TTXT_BANNER_RES = {
	ID_BANNER: string;
	TYPE: string;
	CONTENTS: string;
	LINK: string;
	LINK_TARGAT: string;
};

//이미지 배너 타입
export type TIMAGE_BANNER_RES = TTXT_BANNER_RES & {
	ALT: string;
};

// 추천 리스트 타입
export type TRECOMMEND_LIST_RES = {
	ID: string;
	TYPE: string;
	TITLE: string;
	TOTAL_NUM_ITEM: number;
	ITEM_INFO: ITEM_INFO_TYPE[];
};

export type TMAIN_RESPONSE = {
	RES_CODE: string;
	RES_MSG?: string;
	TOP_IMG_BANNER: TIMAGE_BANNER_RES[];
	TOP_TXT_BANNER: TTXT_BANNER_RES[]; //나중에 [] 빼야함
	IMG_BANNER: TIMAGE_BANNER_RES[];
	RECOMMEND_LIST: VIEWALL_LIST_TYPE[];
};

export async function getBannersAxios(): Promise<TMAIN_RESPONSE | void> {
	const ID_CUST = getCookie("userid");
	const response = await axios.get(
		`${API_URL_CIP}/hch/home/info.json?ID_CUST=${ID_CUST}`
	);
	if (response.status === 200) {
		const data = response.data as TMAIN_RESPONSE;
		
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
		throw new Error(`에러입니다.`);
	}
}


