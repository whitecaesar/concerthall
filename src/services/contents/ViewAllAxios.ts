import axios, { AxiosResponse } from "axios";

export type ARTIST_INFO_TYPE = {
	artist_id: string;
	artist_name: string;
	thumbnail: string;
}


export type ITEM_INFO_TYPE = {
	NUM_THUMBUP?: number; //CITECH에서 제공 예정
	ID: string;
	THUMBNAIL: string;
	TITLE: string;
	ARTIST?: ARTIST_INFO_TYPE;
	GENRE?: string;
	TOTAL_NUM_TRACK?: number;
	star?: number;
};

export type VIEWALL_LIST_TYPE = {
	PATH?: any; 
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

export async function getViewallAxios(type?:number): Promise<TVIEWALL_LIST_RESPONSE | void> {
	const response: AxiosResponse<TVIEWALL_LIST_RESPONSE> = await axios.get(
		`http://cip.ontown.co.kr/hch/recom/${type}/contents.json`
	);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다.`);
	}
}
