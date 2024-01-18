import { TITEM_INFO } from "@/types/itemInfo";
import axios, { AxiosResponse } from "axios";

export type TRACK_LIST_RES = {
	ID: string;
	TITLE: string;
	THUMBNAIL: string;
	TOTAL_NUM_TRACK: number;
	ITEM_INFO: TITEM_INFO[];
};

export type TRACK_LIST_RESPONSE = {
	RES_CODE: string;
	RES_MSG: string;
	TRACK_LIST: TRACK_LIST_RES[];
};

export function getTrackAxios(): Promise<TRACK_LIST_RESPONSE | void> {
	return axios
		.get("http://211.43.189.202/hch/{idAlbum}/contents")
		.then((response: AxiosResponse<TRACK_LIST_RESPONSE>) => {
			if (response.status === 200) {
				return response.data;
			} else {
				throw new Error(`에러에러ㅜ_ㅜ`);
			}
		});
}
