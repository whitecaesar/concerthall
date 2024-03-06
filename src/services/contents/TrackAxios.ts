import axios, { AxiosResponse } from "axios";
import { ITEM_INFO_TYPE } from "./ViewAllAxios";

export type TRACK_LIST_RES = {
	ID: string;
	TITLE: string;
	THUMBNAIL?: string;
	TOTAL_NUM_TRACK: number;
	ITEM_INFO: ITEM_INFO_TYPE[];
};

export type TRACK_LIST_RESPONSE = {
	RES_CODE: string;
	RES_MSG: string;
	TRACK_LIST: TRACK_LIST_RES[];
};

export async function getTrackAxios(): Promise<TRACK_LIST_RESPONSE> {
	const response: AxiosResponse<TRACK_LIST_RESPONSE> = await axios.get(
		"http://cip.ontown.co.kr/hch/{idAlbum}/contents"
	);

	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`에러입니다. (status: ${response.status})`);
	}
}
