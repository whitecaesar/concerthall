import axios, { AxiosResponse } from "axios";
import { getCookie } from "../common";
import { ALBUM_ITEM_TYPE } from "./AlbumAxios";
import { ITEM_INFO_TYPE } from "./ViewAllAxios";

export type PURCHASE_LIST_RESPONSE = {
	RES_CODE: string;
	PURCHASED_TRACKS: ALBUM_ITEM_TYPE[];
	PURCHASED_ALBUMS: ITEM_INFO_TYPE[];
};

export async function getPurchaseListAxios(
	idAlbum?: string // idAlbum 파라미터를 추가했습니다.
): Promise<PURCHASE_LIST_RESPONSE> {

	const ID_CUST = getCookie("userid");
	const response: AxiosResponse<PURCHASE_LIST_RESPONSE> = await axios.get(
		`http://cip.ontown.co.kr/hch/purchase/list.json?ID_CUST=${ID_CUST}` // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		const purchaseData = response.data;

		// ITEM_INFO 배열 내의 각 아이템에 대해 S_ARTIST를 파싱
        purchaseData.PURCHASED_TRACKS = purchaseData.PURCHASED_TRACKS.map(item => ({
          ...item,
          ARTIST: item.S_ARTIST ? JSON.parse(item.S_ARTIST) : []
        }));

        purchaseData.PURCHASED_ALBUMS = purchaseData.PURCHASED_ALBUMS.map(item => ({
          ...item,
          ARTIST: item.S_ARTIST ? JSON.parse(item.S_ARTIST) : []
        }));

        return purchaseData;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}
