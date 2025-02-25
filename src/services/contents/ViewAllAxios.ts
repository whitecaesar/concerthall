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
	DURATION?: string;
	ARTIST_NAME?: string;
	MEDIA_TYPE?:string;
	TOTAL_NUM_TRACK?: number;
	ARTIST:ARTIST_INFO_TYPE[];
	URL?:string;
	PLAYABLE_CODE?:string;
	ALBUM_ID?:string;
	ALBUM_NAME?:string;
	STAR?:number;
	S_ARTIST:string;
	YN_PURCHASED? : string;
	YN_SALE? : string;
	PRICE?:number;
	ALBUM_PRICE?:number;
	YN_CANCEL?: string;
};

export type VIEWALL_LIST_TYPE = {
	PATH?: any; 
	TYPE: "ALBUM" | "TRACK";
	ID: string;
	TITLE: string;
	TOTAL_NUM_ITEM?: number;
	ITEM_INFO: ITEM_INFO_TYPE[];
};

export type TVIEWALL_LIST_RESPONSE = {
	idRecom: string;
	RES_CODE: string;
	RECOMMEND_LIST: VIEWALL_LIST_TYPE[];
};

export async function getViewallAxios(type?:string): Promise<TVIEWALL_LIST_RESPONSE | void> {
	const response: AxiosResponse<TVIEWALL_LIST_RESPONSE> = await axios.get(
		`http://cip.ontown.co.kr/hch/recom/${type}/contents.json`
	);
	if (response.status === 200) {
		const data = response.data;
        // Modify each ITEM_INFO to parse S_ARTIST and create ARTIST
        data.RECOMMEND_LIST = data.RECOMMEND_LIST.map(list => ({
            ...list,
            ITEM_INFO: list.ITEM_INFO.map(item => ({
                ...item,
                ARTIST: JSON.parse(item.S_ARTIST) as ARTIST_INFO_TYPE[]
            }))
        }));

        return data;
	} else {
		throw new Error(`에러입니다.`);
	}
}
