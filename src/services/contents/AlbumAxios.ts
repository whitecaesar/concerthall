import axios, { AxiosResponse } from "axios";

export type ALBUM_ARTIST_INFO_TYPE = {
	artist_id: string;
	artist_name: string;
	thumbnail: string;
}

export type ALBUM_DATA_INFO_TYPE = {
	codec: string;
	duration: string;
	resolution: string;
}

export type ALBUM_ITEM_TYPE = {
	ID: string;
	THUMBNAIL: string;
	TITLE: string;
	ARTIST?: ALBUM_ARTIST_INFO_TYPE[];
	S_ARTIST?: string;
	MEDIA_TYPE?: string;
	ALBUM_ID: string;
	ALBUM_NAME: string;
	ALBUM_THUMBNAIL?: string;
	DATA?: ALBUM_DATA_INFO_TYPE;
	PLAYABLE_CODE?: string;
	URL?: string;
	STAR?: number;
	DURATION?: string;
};

export type ALBUM_DETAIL_TYPE = {
	idAlbum: string;
	RES_CODE: string;
	ID: string;
	TITLE: string;
	THUMBNAIL: string;
	TOTAL_NUM_TRACK: number;
	ITME_INFO: ALBUM_ITEM_TYPE[];
	ARTIST?: ALBUM_ARTIST_INFO_TYPE[];
	STAR?:number;
	S_ARTIST?: string;
};

export async function getAlbumAxios(
	idAlbum?: string // idAlbum 파라미터를 추가했습니다.
): Promise<ALBUM_DETAIL_TYPE> {

	const response: AxiosResponse<ALBUM_DETAIL_TYPE> = await axios.get(
		`http://cip.ontown.co.kr/hch/album/${idAlbum}/contents.json` // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
		const albumData = response.data;
        // 파싱 로직을 여기에 추가
        if (albumData.S_ARTIST) {
            albumData.ARTIST = JSON.parse(albumData.S_ARTIST); // 앨범 수준의 S_ARTIST 파싱
        }

        // ITEM_INFO 배열 내의 각 아이템에 대해 S_ARTIST를 파싱
        albumData.ITME_INFO = albumData.ITME_INFO.map(item => ({
            ...item,
            ARTIST: item.S_ARTIST ? JSON.parse(item.S_ARTIST) : []
        }));

        return albumData;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}
