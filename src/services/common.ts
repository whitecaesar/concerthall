"use client";
import { useEffect, useState } from "react";
import { ALBUM_DETAIL_TYPE, ALBUM_ITEM_TYPE } from "./contents/AlbumAxios";
import { PLAY_ITEM_RESPONSE, getPlayInfoAxios } from "./contents/PlayInfoAxios";
import { TRACK_PLAYLIST_TYPE, TRACK_TRACKS_ITEM_TYPE } from "./contents/PlayListTrackAxios";
import { TRACK_RECENT_ITEM_TYPE, TRACK_RECENT_LIST_RESPONSE } from "./contents/RecentTrackListAxios";
import { TRACK_ITEM_TYPE } from "./contents/TrackAxios";
import { getRecentAlbumAxios } from "./contents/RecentAlbumAxios";
import { ITEM_INFO_TYPE, VIEWALL_LIST_TYPE } from "./contents/ViewAllAxios";

export const MediaType = 'CONCERT_HALL';

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

function convertToMilliseconds(duration : string) {
  // 입력 문자열에서 초와 밀리초 분리
  const seconds = parseInt(duration.slice(0, -4));  // "010158.000"에서 초 부분 "010158" 추출
  const millisecondsPart = parseInt(duration.slice(-3));  // "010158.000"에서 밀리초 부분 "000" 추출

  // 밀리초로 변환
  return (seconds * 1000) + millisecondsPart;
}

export function funcTrackPlayClick(type : string, playUrl:PLAY_ITEM_RESPONSE, track? : TRACK_ITEM_TYPE, tracklistInfo? : VIEWALL_LIST_TYPE, position? : number, albumTrackList? : ALBUM_ITEM_TYPE[]) {
  
   // 버튼 클릭 시 실행할 로직
  if(type == 'trackMore')
  {
    const WebStreamTrackItem: any[] = [];
    tracklistInfo?.ITEM_INFO.forEach(async (item :ITEM_INFO_TYPE) => {
      
      const duratinon = item.DURATION && convertToMilliseconds(item.DURATION);
      const trackItem = {
        track_id : item.ID,
        title : item.TITLE,
        thumbnail : item.THUMBNAIL,
        url : item.URL,
        playable_code : item.PLAYABLE_CODE,
        media_type : item.MEDIA_TYPE,
        album_id : item.ALBUM_ID,
        album_name : item.ALBUM_NAME,
        artist : item.ARTIST,
        duration : duratinon
      };
      WebStreamTrackItem.push(trackItem);
    });

    console.log(WebStreamTrackItem);

    const trackData = {
      webstreamtrackitem : WebStreamTrackItem,
      position : position
    };

    let json_track_data: string = JSON.stringify(trackData);
    (window as any).HifiRose.webStreamTrackMoreClick(json_track_data);
  }
  else if(type == 'albumTrackMore')
  {
    const WebStreamTrackItem: any[] = [];

    albumTrackList?.forEach(async (item :ALBUM_ITEM_TYPE) => {
      const duratinon = item.DURATION && convertToMilliseconds(item.DURATION);
      const trackItem = {
        track_id : item.ID,
        title : item.TITLE,
        thumbnail : item.THUMBNAIL,
        url : item.URL,
        playable_code : item.PLAYABLE_CODE,
        media_type : item.MEDIA_TYPE,
        album_id : item.ALBUM_ID,
        album_name : item.ALBUM_NAME,
        artist : item.ARTIST,
        duration : duratinon
      };
      WebStreamTrackItem.push(trackItem);
    });

    console.log(WebStreamTrackItem);

    const trackData = {
      webstreamtrackitem : WebStreamTrackItem,
      position : position
    };

    let json_track_data: string = JSON.stringify(trackData);
    (window as any).HifiRose.webStreamTrackMoreClick(json_track_data);
  }
  else if(type == 'trackPlay' || type == 'trackShare')
  {
     const duratinon = track?.DURATION && convertToMilliseconds(track.DURATION);
     const trackItem = {
      track_id : track?.TRACK_ID,
      title : track?.TITLE,
      album_thumbnail : track?.ALBUM_THUMBNAIL,
      thumbnail : track?.THUMBNAIL,
      url : playUrl?.INFO.URL,
      playable : playUrl?.RES_CODE,
      media_type : track?.MEDIA_TYPE,
      album_id : track?.ALBUM_ID,
      album_name : track?.ALBUM_NAME,
      artist : track?.ARTIST,
      duration : duratinon,
      resolution : track?.data?.resolution,
      codec : track?.data?.codec,
    };

    const WebStreamTrackItem: any[] = [trackItem];

    console.log(WebStreamTrackItem);
  
    const trackData = {
      webstreamtrackitem : WebStreamTrackItem
    }
  
    let json_track_data: string = JSON.stringify(trackData);

    if(type == 'trackPlay')
    {
      (window as any).HifiRose.webStreamTrackClick(json_track_data);
    }
    else if(type == 'trackShare')
    {
      (window as any).HifiRose.webStreamGotoShareTrack(json_track_data);
    }
  }
};


export function funcAlbumTrackPlayClick(type : string, playUrl:PLAY_ITEM_RESPONSE, track : ALBUM_ITEM_TYPE, tracklistInfo? : VIEWALL_LIST_TYPE, position? : number) {
       
  // 버튼 클릭 시 실행할 로직
  if(type == 'trackMore')
  {
    const WebStreamTrackItem: any[] = [];

    tracklistInfo?.ITEM_INFO.forEach(async (item :ITEM_INFO_TYPE) => {
      const duratinon = item.DURATION && convertToMilliseconds(item.DURATION);
      const trackItem = {
        track_id : item.ID,
        title : item.TITLE,
        thumbnail : item.THUMBNAIL,
        url : item.URL,
        playable_code : item.PLAYABLE_CODE,
        media_type : item.MEDIA_TYPE,
        album_id : item.ALBUM_ID,
        album_name : item.ALBUM_NAME,
        artist : item.ARTIST,
        duration : duratinon
      };
      WebStreamTrackItem.push(trackItem);
    });

    console.log(WebStreamTrackItem);

    const trackData = {
      webstreamtrackitem : WebStreamTrackItem,
      position : position
    };

    let json_track_data: string = JSON.stringify(trackData);
    (window as any).HifiRose.webStreamTrackMoreClick(json_track_data);
  }
  else if(type == 'trackPlay' || type == 'trackShare')
  {
     const duratinon = track.DURATION && convertToMilliseconds(track.DURATION);
     const trackItem = {
      track_id : track.ID,
      title : track.TITLE,
      album_thumbnail : track.ALBUM_THUMBNAIL,
      thumbnail : track.THUMBNAIL,
      url : playUrl?.INFO.URL,
      playable : playUrl?.RES_CODE,
      media_type : track.MEDIA_TYPE,
      album_id : track.ALBUM_ID,
      album_name : track.ALBUM_NAME,
      artist : track.ARTIST,
      duration : duratinon
    };

    const WebStreamTrackItem: any[] = [trackItem];

    console.log(WebStreamTrackItem);
  
    const trackData = {
      webstreamtrackitem : WebStreamTrackItem
    }
  
    let json_track_data: string = JSON.stringify(trackData);
    
    if(type == 'trackPlay')
    {
      (window as any).HifiRose.webStreamTrackClick(json_track_data);
    }
    else if(type == 'trackShare')
    {
      (window as any).HifiRose.webStreamGotoShareTrack(json_track_data);
    }
  }
};

export function funcAlbumPlayClick(type : string,  album : ALBUM_DETAIL_TYPE) {
  const WebStreamTrackItem: any[] = [];

  album?.ITME_INFO?.forEach(async (item :ALBUM_ITEM_TYPE) => {
    const duratinon = item.DURATION && convertToMilliseconds(item.DURATION);
    const trackItem = {
      track_id : item.ID,
      title : item.TITLE,
      album_thumbnail : album.THUMBNAIL,
      thumbnail : item.THUMBNAIL,
      url : item.URL,
      playable_code : item.PLAYABLE_CODE,
      media_type : item.MEDIA_TYPE,
      album_id : item.ALBUM_ID,
      album_name : item.ALBUM_NAME,
      artist : item.ARTIST,
      duration : duratinon,
      resolution : item.DATA?.resolution,
      codec : item.DATA?.codec,
    };
    WebStreamTrackItem.push(trackItem);
  });

  const WebStreamAlbumItem  = {   
    album_id : album.ID,           
    album_name : album.TITLE,       
    thumbnail : album.THUMBNAIL,
    tracks  : WebStreamTrackItem, 
    artist  : album.ARTIST 
  }

  const albumData = {
    webstreamalbumitem : WebStreamAlbumItem
  }

  let allData = {}

  let json_album_data: string = JSON.stringify(albumData);

  // 버튼 클릭 시 실행할 로직
  if(type == 'albumMore')
  {
    (window as any).HifiRose.webStreamAlbumMoreClick(json_album_data);
  }
  else if(type == 'AlbumPlay')
  {
    allData = { 
      webstreamtrackitem : WebStreamTrackItem,
      webstreamalbumitem : WebStreamAlbumItem,
      isShufflePlay : false
    };
    let All_data: string = JSON.stringify(allData);
    console.log(All_data);
    (window as any).HifiRose.webStreamAlbumClick(All_data);
  }
  else if(type == 'SufflePlay')
  {
    console.log('shuffle');
    allData = {
      webstreamtrackitem : WebStreamTrackItem,
      webstreamalbumitem : WebStreamAlbumItem,
      isShufflePlay : true
    };
    let All_data: string = JSON.stringify(allData);
    (window as any).HifiRose.webStreamAlbumClick(All_data);
  }
  else if(type == 'AlbumShare')
  {
    (window as any).HifiRose.webStreamGotoShareAlbum(json_album_data);
  }
};

export function funcPlayListTrackClick(type:string, trackItem:TRACK_RECENT_ITEM_TYPE, tracksItem:TRACK_RECENT_LIST_RESPONSE | TRACK_PLAYLIST_TYPE, position:number) {
  if(trackItem)
  {
    const RoseMemberTrackItem: any[] = [trackItem];
    if(type == 'play'){
      const trackData = {
        rosemembertrackitem : RoseMemberTrackItem
      }
      let json_track_data: string = JSON.stringify(trackData);
      (window as any).HifiRose.webStreamTotalHomeTrackClick(json_track_data);
    }
    else if(type == 'option')
    {
      const trackData = {
        rosemembertrackitem : tracksItem.tracks,
        position:position,
        isrecent:true
      }
      let json_track_data: string = JSON.stringify(trackData);
      (window as any).HifiRose.webStreamTotalHomeMoreClick(json_track_data);
    }
  }
};

export function funcPlayListPlayClick(type:string, playlist:TRACK_RECENT_LIST_RESPONSE | TRACK_PLAYLIST_TYPE, position?:number) {
  if(playlist)
  {
    if(type == 'allPlay'){
      const trackData = {
        rosememberplaylistitem : playlist,
        isShufflePlay:false
      }
      const json_playList_data: string = JSON.stringify(trackData);
      (window as any).HifiRose.webStreamTotalHomePlaylistClick(json_playList_data);
    }
    else if(type == 'sufflePlay'){
      const trackData = {
        rosememberplaylistitem : playlist,
        isShufflePlay:true
      }
      const json_playList_data: string = JSON.stringify(trackData);
      (window as any).HifiRose.webStreamTotalHomePlaylistClick(json_playList_data);
    }
    else if(type == 'share'){
      const json_playList_data: string = JSON.stringify(playlist);
      (window as any).HifiRose.webStreamTotalHomeGotoShare(json_playList_data);
    }
    else if(type == 'option'){
      const json_playList_data: string = JSON.stringify(playlist);
      (window as any).HifiRose.webStreamTotalHomePlaylistMoreClick(json_playList_data);
    }
    else if(type == 'trackoption'){
      const trackData = {
        rosememberplaylistitem : playlist,
        position: position
      }
      const json_playList_data: string = JSON.stringify(trackData);
      (window as any).HifiRose.webStreamTotalHomePlaylistTrackMoreClick(json_playList_data);
    }
  }
};
