import axios, { AxiosResponse } from "axios";
import { ALBUM_ITEM_TYPE } from "./AlbumAxios";
import { API_URL_CIP, getCookie } from "../common";

export type ARTIST_DEFAULT_INFO_TYPE = {
	artist_id: string;
	artist_name: string;
	thumbnail: string;
}

export type ARTIST_TRACK_INFO_TYPE = {
	ID: string;
	THUMBNAIL: string;
	TITLE: string;
    DURATION: string;
	MEDIA_TYPE: string;
    TOTAL_NUM_TRACK: number;
    ARTIST?: ARTIST_DEFAULT_INFO_TYPE[];
    YN_SALE?: string;
	S_ARTIST?: string;
    ALBUM_PRICE?:number;
    PRICE?:number;
}

export type ARTIST_ALBUM_INFO_TYPE = {
	ID: string;
	THUMBNAIL: string;
	TITLE: string;
    TOTAL_NUM_TRACK: number;
	ARTIST?: ARTIST_DEFAULT_INFO_TYPE[];
	S_ARTIST?: string;
    ALBUM_PRICE?:number;
    PRICE?:number;
}

export type ARTISTINFO_INFO_TYPE = {
	ID_ARTIST: string;
	NM_ARTIST: string;
	DESC_ARTIST: string;
    IMG_ARTIST: string;
};

export type ARTIST_INFO_RESPONSE = {
	idArtist: string;
	RES_CODE: string;
    ARTIST_INFO: ARTISTINFO_INFO_TYPE;
	ARTIST_ALBUM_INFO: ARTIST_ALBUM_INFO_TYPE[];
    ARTIST_TRACK_INFO: ALBUM_ITEM_TYPE[];
};

export async function getArtistInfoAxios(
	idArtist: string // idAlbum 파라미터를 추가했습니다.
): Promise<ARTIST_INFO_RESPONSE> {

    const ID_CUST = getCookie("userid");
	const response: AxiosResponse<ARTIST_INFO_RESPONSE> = await axios.get(
		`${API_URL_CIP}/hch/artist/${idArtist}/info.json?ID_CUST=${ID_CUST}` // URL 구성을 동적으로 변경했습니다.
	);

	if (response.status === 200) {
        const artistData = response.data;

        // Parse S_ARTIST for ARTIST_ALBUM_INFO
        artistData.ARTIST_ALBUM_INFO.forEach(album => {
            if (album.S_ARTIST) {
                try {
                    album.ARTIST = JSON.parse(album.S_ARTIST);
                } catch (error) {
                    console.error("Error parsing S_ARTIST for ARTIST_ALBUM_INFO:", error);
                }
            }
        });

        // Parse S_ARTIST for ARTIST_TRACK_INFO
        artistData.ARTIST_TRACK_INFO.forEach(track => {
            if (track.S_ARTIST) {
                try {
                    track.ARTIST = JSON.parse(track.S_ARTIST);
                } catch (error) {
                    console.error("Error parsing S_ARTIST for ARTIST_TRACK_INFO:", error);
                }
            }
        });

		return artistData;
	} else {
		throw new Error(`에러입니다. ${response.status}`);
	}
}
