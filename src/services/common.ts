import { useQuery } from "@tanstack/react-query";
import { TRACK_ITEM_TYPE } from "./contents/AlbumAxios";
import { PLAY_ITEM_RESPONSE, getPlayInfoAxios } from "./contents/PlayInfoAxios";

export function setCookie(name: string, value: string, days: number) {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}



export function getCookie(name: string): string | undefined {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';'); // 쿠키를 세미콜론으로 분리하여 배열 생성
    for(let i=0;i < ca.length;i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1,c.length); // 앞 공백 제거
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length); // 쿠키 값 반환
    }
    return undefined; // 해당 이름의 쿠키가 없는 경우 undefined 반환
 }

export function deleteCookie(name: string): void {
// 쿠키의 만료일을 과거로 설정하여 삭제
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

export function funcTrackPlayClick(type : string, playUrl:PLAY_ITEM_RESPONSE, track : TRACK_ITEM_TYPE) {

   const artistItem = {
    artist_id : track.ARTIST?.artist_id ,
    artist_name : track.ARTIST?.artist_name ,
    thumbnail : track.ARTIST?.thumbnail
  };

  const WebStreamArtistItem: any[] = [artistItem];

  const trackItem = {
    track_id : track.ID,
    title : track.TITLE,
    album_thumbnail : track.album_thumbnail,
    thumbnail : track.THUMBNAIL,
    url : playUrl?.INFO.URL,
    playable : playUrl?.RES_CODE,
    media_type : track.media_type,
    album_id : track.album_id,
    album_name : track.album_name,
    artist : WebStreamArtistItem,
    duration : track.data?.duration,
    resolution : track.data?.resolution,
    codec : track.data?.codec,
  };

  console.log(trackItem);
  
  const WebStreamTrackItem: any[] = [trackItem];

  const albumItem  = {   
    album_id : track.album_id,           
    album_name : track.album_name,       
    thumbnail : track.album_thumbnail,
    tracks  : WebStreamTrackItem, 
    artist  : WebStreamArtistItem 
  }

  const WebStreamAlbumItem: any[] = [albumItem];

  const artistData = {
    WebStreamArtistItem : WebStreamArtistItem
  }
  
  const trackData = {
    webstreamtrackitem : WebStreamTrackItem
  }

  const albumData = {
    webstreamtrackitem : WebStreamAlbumItem
  }

  let json_artist_data: string = JSON.stringify(artistData);
  let json_track_data: string = JSON.stringify(trackData);
  let json_album_data: string = JSON.stringify(albumData);

  // 버튼 클릭 시 실행할 로직
  if(type == 'artistMore')
  {
  //	console.log(json_track_data);
    (window as any).HifiRose.webStreamArtistMoreClick(json_artist_data);
  }
  else if(type == 'albumMore')
  {
    (window as any).HifiRose.webStreamAlbumMoreClick(json_album_data);
  }
  else if(type == 'trackMore')
  {
  //	console.log(json_track_data);
    (window as any).HifiRose.webStreamTrackMoreClick(json_track_data);
  }
  else if(type == 'trackPlay')
  {
    (window as any).HifiRose.webStreamTrackClick(json_track_data);
  }

};