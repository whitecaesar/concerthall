"use client";
import { ALBUM_DETAIL_TYPE, ALBUM_ITEM_TYPE } from "./contents/AlbumAxios";
import { setPaymentConfirmAxios } from "./contents/PayAxios";
import { PLAY_ITEM_RESPONSE, getPlayInfoAxios } from "./contents/PlayInfoAxios";
import { TRACK_PLAYLIST_TYPE } from "./contents/PlayListTrackAxios";
import { TRACK_RECENT_ITEM_TYPE, TRACK_RECENT_LIST_RESPONSE } from "./contents/RecentTrackListAxios";
import { TRACK_ITEM_TYPE } from "./contents/TrackAxios";
import { ITEM_INFO_TYPE, VIEWALL_LIST_TYPE } from "./contents/ViewAllAxios";

export const MediaType = 'CONCERT_HALL';
export const API_URL = 'https://dev.api.roseaudio.kr';
export const API_URL_CIP = 'http://cip.ontown.co.kr';

export function setCookie(name: string, value: string, days: number) {
    if (typeof window === 'undefined') {
        console.warn("는 클라이언트 사이드에서만 사용할 수 있습니다.");
        return;
    }

    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export const getCookie = (name: string): string | undefined => {
    if (typeof window === 'undefined') {
        return undefined;
    }

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
    return undefined;
};

export function deleteCookie(name: string): void {
    if (typeof window === 'undefined') {
        console.warn("deleteCookie는 클라이언트 사이드에서만 사용할 수 있습니다.");
        return;
    }

    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
}

function convertToMilliseconds(duration : string) {
  // 입력 문자열에서 초와 밀리초 분리
  const seconds = parseInt(duration.slice(0, -4));  // "010158.000"에서 초 부분 "010158" 추출
  const millisecondsPart = parseInt(duration.slice(-3));  // "010158.000"에서 밀리초 부분 "000" 추출

  // 밀리초로 변환
  return (seconds * 1000) + millisecondsPart;
}

export async function funcTrackPlayClick(type : string, track? : TRACK_ITEM_TYPE, tracklistInfo? : VIEWALL_LIST_TYPE, position? : number, albumTrackList? : ALBUM_ITEM_TYPE[]) {
  const appType = getCookie("app_type");
   // 버튼 클릭 시 실행할 로직
  if(type == 'trackMore')
  {
    const WebStreamTrackItem: any[] = [];
    const promises = (tracklistInfo?.ITEM_INFO || []).map(async (item :ITEM_INFO_TYPE) => {
      if(item.YN_PURCHASED =='Y' && item.YN_SALE == 'Y')
      {
        if (item.ID) {
          try {
            const result = await getPlayInfoAxios(item.ID);
            if (result && result.INFO && result.INFO.URL && result.INFO.PLAYABLE_CODE) {
              item.URL = result.INFO.URL;
              item.PLAYABLE_CODE = result.INFO.PLAYABLE_CODE;
              const PURCHASE_ID = result.INFO.PURCHASE_ID?result.INFO.PURCHASE_ID:'';

              if(PURCHASE_ID)
              {
                const purchaseResponse = await setPaymentConfirmAxios({
                  purchaseId : PURCHASE_ID,
                  reason : 'STREAMING_PLAY',
                  cpCode : 'test-01',
                  appType : 'CONCERTHALL'
                });
                /*
                if(purchaseResponse.code != '200.1' && purchaseResponse.code != '409.2')
                {
                  throw new Error('Purchase verification failed');
                }
                */
              }
            }
          } catch (error) {
            console.error(`Failed to fetch play info for ID ${item.ID}:`, error);
          }
        }

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
          duration : duratinon,
          isPreview : false
        };
        WebStreamTrackItem.push(trackItem);
      }
    });
    
    // 모든 비동기 작업이 완료될 때까지 기다림
    await Promise.all(promises || []);

    if (!Array.isArray(WebStreamTrackItem) || WebStreamTrackItem.length === 0) 
    {
      console.error(`No playable tracks available.`);

    } else {
      const trackData = {
        webstreamtrackitem : WebStreamTrackItem,
        position : position
      };

      let json_track_data: string = JSON.stringify(trackData);
      
      sendMessage("webStreamTrackMoreClick", json_track_data);
    }
  }
  else if(type == 'albumTrackMore')
  {
    const WebStreamTrackItem: any[] = [];
    const promises = albumTrackList?.map(async (item :ALBUM_ITEM_TYPE) => {
      if(item.YN_PURCHASED =='Y' && item.YN_SALE == 'Y')
      {
        if (item.ID) {
          try {
            const result = await getPlayInfoAxios(item.ID);
            if (result && result.INFO && result.INFO.URL && result.INFO.PLAYABLE_CODE) {
              item.URL = result.INFO.URL;
              item.PLAYABLE_CODE = result.INFO.PLAYABLE_CODE;
              const PURCHASE_ID = result.INFO.PURCHASE_ID?result.INFO.PURCHASE_ID:'';

              if(PURCHASE_ID)
              {
                const purchaseResponse = await setPaymentConfirmAxios({
                  purchaseId : PURCHASE_ID,
                  reason : 'STREAMING_PLAY',
                  cpCode : 'test-01',
                  appType : 'CONCERTHALL'
                });
                /*
                if(purchaseResponse.code != '200.1' && purchaseResponse.code != '409.2')
                {
                  throw new Error('Purchase verification failed');
                }
                */
              }
            }
          } catch (error) {
            console.error(`Failed to fetch play info for ID ${item.ID}:`, error);
          }
        }

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
          duration : duratinon,
          isPreview : false
        };
        WebStreamTrackItem.push(trackItem);
      }
    });

    // 모든 비동기 작업이 완료될 때까지 기다림
    await Promise.all(promises || []);

    if (!Array.isArray(WebStreamTrackItem) || WebStreamTrackItem.length === 0) 
    {
      console.error(`No playable tracks available.`);

    } else {
      const trackData = {
        webstreamtrackitem : WebStreamTrackItem,
        position : position
      };

      const json_track_data: string = JSON.stringify(trackData);
      if(appType == "mobile")
      {
        (window as any).HifiRose.webStreamTrackMoreClick(json_track_data);
      }
      else
      {
        const messageData = {
          type: "webStreamTrackMoreClick",
          data: json_track_data
        };
        (window as any).parent.postMessage(messageData, "*");
        if ((window as any).parent.ReactNativeWebView) {
            (window as any).parent.ReactNativeWebView.postMessage(JSON.stringify(messageData));
        }
      }
    }
  }
  else if(type == 'trackPlay' || type == 'trackShare')
  {
    if(track && track.YN_PURCHASED ==='Y' && track.YN_SALE === 'Y')
    {
      if (track.TRACK_ID) {
        try {
          const result = await getPlayInfoAxios(track.TRACK_ID);
          if (result && result.INFO && result.INFO.URL && result.INFO.PLAYABLE_CODE) {
            track.URL = result.INFO.URL;
            track.PLAYABLE_CODE = result.INFO.PLAYABLE_CODE;
            const PURCHASE_ID = result.INFO.PURCHASE_ID?result.INFO.PURCHASE_ID:'';
              if(PURCHASE_ID)
              {
                const purchaseResponse = await setPaymentConfirmAxios({
                  purchaseId : PURCHASE_ID,
                  reason : 'STREAMING_PLAY',
                  cpCode : 'test-01',
                  appType : 'CONCERTHALL'
                });
            
              /*
                if(purchaseResponse.code !== '200.1' && purchaseResponse.code !== '409.2')
                {
                  throw new Error('Purchase verification failed');
                }
              */
              }
              
          }
        } catch (error) {
          console.error(`Failed to fetch play info for ID ${track.TRACK_ID}:`, error);
        }
      }
      const duratinon = track?.DURATION && convertToMilliseconds(track.DURATION);

      const trackItem = {
        track_id : track?.TRACK_ID,
        title : track?.TITLE,
        album_thumbnail : track?.ALBUM_THUMBNAIL,
        thumbnail : track?.THUMBNAIL,
        url : track?.URL,
        playable : track?.PLAYABLE_CODE,
        media_type : track?.MEDIA_TYPE,
        album_id : track?.ALBUM_ID,
        album_name : track?.ALBUM_NAME,
        artist : track?.ARTIST,
        duration : duratinon,
        resolution : track?.data?.resolution,
        codec : track?.data?.codec,
        isPreview : false
      };
      const WebStreamTrackItem: any[] = [trackItem];
      
      if (!Array.isArray(WebStreamTrackItem) || WebStreamTrackItem.length === 0) 
      {
        console.error(`No playable tracks available.`);
      } else {
        const trackData = {
          webstreamtrackitem : WebStreamTrackItem
        }
      
        let json_track_data: string = JSON.stringify(trackData);
    
        if(type == 'trackPlay')
        {
          sendMessage("webStreamTrackClick", json_track_data);
        }
        else if(type == 'trackShare')
        {
          if(appType == "mobile")
          {
            (window as any).HifiRose.webStreamGotoShareTrack(json_track_data);
          }
          else
          {
            const messageData = {
              type: "webStreamGotoShareTrack", 
              data: json_track_data
            };
            (window as any).parent.postMessage(messageData, "*");
            if ((window as any).parent.ReactNativeWebView) {
                (window as any).parent.ReactNativeWebView.postMessage(JSON.stringify(messageData));
            }
          }
        }
      }
    } else {
      console.error(`No playable track available.`);
    }
  }
};


export async function funcAlbumTrackPlayClick(type : string, track : ALBUM_ITEM_TYPE, tracklistInfo? : VIEWALL_LIST_TYPE, position? : number) {
  const appType = getCookie("app_type");
  // 버튼 클릭 시 실행할 로직
  if(type == 'trackMore')
  {
    const WebStreamTrackItem: any[] = [];
    const promises = (tracklistInfo?.ITEM_INFO || []).map(async (item :ITEM_INFO_TYPE) => {
      if(item.YN_PURCHASED =='Y' && item.YN_SALE == 'Y')
      {
        if (item.ID) {
          try {
            const result = await getPlayInfoAxios(item.ID);
            if (result && result.INFO && result.INFO.URL && result.INFO.PLAYABLE_CODE) {
              item.URL = result.INFO.URL;
              item.PLAYABLE_CODE = result.INFO.PLAYABLE_CODE;
              const PURCHASE_ID = result.INFO.PURCHASE_ID?result.INFO.PURCHASE_ID:'';

              if(PURCHASE_ID)
              {
                const purchaseResponse = await setPaymentConfirmAxios({
                  purchaseId : PURCHASE_ID,
                  reason : 'STREAMING_PLAY',
                  cpCode : 'test-01',
                  appType : 'CONCERTHALL'
                });
                /*
                if(purchaseResponse.code != '200.1' && purchaseResponse.code != '409.2')
                {
                  throw new Error('Purchase verification failed');
                }
                */
              }
            }
          } catch (error) {
            console.error(`Failed to fetch play info for ID ${item.ID}:`, error);
          }
        }

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
          duration : duratinon,
          isPreview : false
        };
        WebStreamTrackItem.push(trackItem);
      }
    });

    // 모든 비동기 작업이 완료될 때까지 기다림
    await Promise.all(promises || []);

    if (!Array.isArray(WebStreamTrackItem) || WebStreamTrackItem.length === 0) 
    {
      console.error(`No playable tracks available.`);
    } else {
      const trackData = {
        webstreamtrackitem : WebStreamTrackItem,
        position : position
      };
      
      let json_track_data: string = JSON.stringify(trackData);
      sendMessage("webStreamTrackMoreClick", json_track_data);
      return true;
    }
  }
  else if(type == 'trackPlay' || type == 'trackShare')
  {
    const WebStreamTrackItem: any[] = [];
    if(track && track.YN_PURCHASED =='Y' && track.YN_SALE == 'Y')
    {
      if (track.ID) {
        try {
          const result = await getPlayInfoAxios(track.ID);
          if (result && result.INFO && result.INFO.URL && result.INFO.PLAYABLE_CODE) {
            track.URL = result.INFO.URL;
            track.PLAYABLE_CODE = result.INFO.PLAYABLE_CODE;
            const PURCHASE_ID = result.INFO.PURCHASE_ID?result.INFO.PURCHASE_ID:'';
              if(PURCHASE_ID)
              {
                const purchaseResponse = await setPaymentConfirmAxios({
                  purchaseId : PURCHASE_ID,
                  reason : 'STREAMING_PLAY',
                  cpCode : 'test-01',
                  appType : 'CONCERTHALL'
                });
                /*
                if(purchaseResponse.code != '200.1' && purchaseResponse.code != '409.2')
                {
                  throw new Error('Purchase verification failed');
                }
                */
              }
          }
        } catch (error) {
          console.error(`Failed to fetch play info for ID ${track.ID}:`, error);
        }
      }

      const duratinon = track.DURATION && convertToMilliseconds(track.DURATION);
      const trackItem = {
        track_id : track.ID,
        title : track.TITLE,
        album_thumbnail : track.ALBUM_THUMBNAIL,
        thumbnail : track.THUMBNAIL,
        url : track.URL,
        playable : track.PLAYABLE_CODE,
        media_type : track.MEDIA_TYPE,
        album_id : track.ALBUM_ID,
        album_name : track.ALBUM_NAME,
        artist : track.ARTIST,
        duration : duratinon,
        isPreview : false
      };
      
      console.log("trackItem", trackItem);
      WebStreamTrackItem.push(trackItem);
    }
    
    if (!Array.isArray(WebStreamTrackItem) || WebStreamTrackItem.length === 0) 
    {
      console.error(`No playable tracks available.`);
    } else {

      const trackData = {
        webstreamtrackitem : WebStreamTrackItem
      }
    
      let json_track_data: string = JSON.stringify(trackData);
      
      if(type == 'trackPlay')
      {
        sendMessage("webStreamTrackClick", json_track_data);
      }
      else if(type == 'trackShare')
      {
        sendMessage("webStreamGotoShareTrack", json_track_data);
      }
      return true;
    }
  }
};

export function funcArtistTrackPlayClick(type : string, playUrl:PLAY_ITEM_RESPONSE, track : TRACK_ITEM_TYPE, tracklistInfo? : VIEWALL_LIST_TYPE, position? : number) {
  const appType = getCookie("app_type");
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
        duration : duratinon,
        isPreview : false
      };
      WebStreamTrackItem.push(trackItem);
    });

    const trackData = {
      webstreamtrackitem : WebStreamTrackItem,
      position : position
    };
    
    let json_track_data: string = JSON.stringify(trackData);
    sendMessage("webStreamTrackMoreClick", json_track_data);
  }
  else if(type == 'trackPlay' || type == 'trackShare')
  {
     const duratinon = track.DURATION && convertToMilliseconds(track.DURATION);
     const trackItem = {
      track_id : track.TRACK_ID,
      title : track.TITLE,
      album_thumbnail : track.ALBUM_THUMBNAIL,
      thumbnail : track.THUMBNAIL,
      url : playUrl?.INFO.URL,
      playable : playUrl?.RES_CODE,
      media_type : track.MEDIA_TYPE,
      album_id : track.ALBUM_ID,
      album_name : track.ALBUM_NAME,
      artist : track.ARTIST,
      duration : duratinon,
      isPreview : false
    };

    const WebStreamTrackItem: any[] = [trackItem];

    const trackData = {
      webstreamtrackitem : WebStreamTrackItem
    }
  
    let json_track_data: string = JSON.stringify(trackData);
    
    if(type == 'trackPlay')
    {
      sendMessage("webStreamTrackClick", json_track_data);
    }
    else if(type == 'trackShare')
    {
      sendMessage("webStreamGotoShareTrack", json_track_data);
    }
  }
};

export async function funcAlbumPlayClick(type : string,  album : ALBUM_DETAIL_TYPE) {
  const appType = getCookie("app_type");
  const WebStreamTrackItem: any[] = [];

  console.log("album", album);

  const promises = album?.ITEM_INFO?.map(async (item: ALBUM_ITEM_TYPE) => {
    if (item.YN_PURCHASED == 'Y' && item.YN_SALE == 'Y') {
      if (item.ID) {
        try {
          const result = await getPlayInfoAxios(item.ID);
          if (result && result.INFO && result.INFO.URL && result.INFO.PLAYABLE_CODE) {
            item.URL = result.INFO.URL;
            item.PLAYABLE_CODE = result.INFO.PLAYABLE_CODE;
            const PURCHASE_ID = result.INFO.PURCHASE_ID ? result.INFO.PURCHASE_ID : '';

            if (PURCHASE_ID) {
              const purchaseResponse = await setPaymentConfirmAxios({
                purchaseId: PURCHASE_ID,
                reason: 'STREAMING_PLAY',
                cpCode: 'test-01',
                appType: 'CONCERTHALL'
              });
              /*
              if(purchaseResponse.code != '200.1' && purchaseResponse.code != '409.2')
              {
                throw new Error('Purchase verification failed');
              }
              */
            }
          }
        } catch (error) {
          console.error(`Failed to fetch play info for ID ${item.ID}:`, error);
        }
      }

      const duration = item.DURATION && convertToMilliseconds(item.DURATION);
      const trackItem = {
        track_id: item.ID,
        title: item.TITLE,
        album_thumbnail: album.THUMBNAIL,
        thumbnail: item.THUMBNAIL,
        url: item.URL,
        playable_code: item.PLAYABLE_CODE,
        media_type: item.MEDIA_TYPE,
        album_id: item.ALBUM_ID,
        album_name: item.ALBUM_NAME,
        artist: item.ARTIST,
        duration: duration,
        resolution: item.DATA?.resolution,
        codec: item.DATA?.codec,
        isPreview : false
      };
      console.log("trackItem", trackItem);
      WebStreamTrackItem.push(trackItem);
    }
  });

  // 모든 비동기 작업이 완료될 때까지 기다림
  await Promise.all(promises || []);

  console.log("WebStreamTrackItem", WebStreamTrackItem);

  if (!Array.isArray(WebStreamTrackItem) || WebStreamTrackItem.length === 0) {
    console.error(`No playable tracks available.`);
  } else {
    const WebStreamAlbumItem = {
      album_id: album.ID,
      album_name: album.TITLE,
      thumbnail: album.THUMBNAIL,
      tracks: WebStreamTrackItem,
      artist: album.ARTIST
    };

    const albumData = {
      webstreamalbumitem: WebStreamAlbumItem
    };

    let allData = {};
    let json_album_data: string = JSON.stringify(albumData);

    // 버튼 클릭 시 실행할 로직
    if (type == 'albumMore') {
      sendMessage("webStreamAlbumMoreClick", json_album_data);
    } else if (type == 'AlbumPlay') {
      allData = {
        webstreamtrackitem: WebStreamTrackItem,
        webstreamalbumitem: WebStreamAlbumItem,
        isShufflePlay: false
      };
      let All_data: string = JSON.stringify(allData);
      sendMessage("webStreamAlbumClick", All_data);
    } else if (type == 'SufflePlay') {
      allData = {
        webstreamtrackitem: WebStreamTrackItem,
        webstreamalbumitem: WebStreamAlbumItem,
        isShufflePlay: true
      };
      let All_data: string = JSON.stringify(allData);
      sendMessage("webStreamAlbumClick", All_data);
    } else if (type == 'AlbumShare') {
      sendMessage("webStreamGotoShareAlbum", json_album_data);
    }
  }
};

export async function funcPlayListTrackClick(type:string, trackItem:TRACK_RECENT_ITEM_TYPE, tracksItem:TRACK_RECENT_LIST_RESPONSE | TRACK_PLAYLIST_TYPE, position:number) {
  const appType = getCookie("app_type");
  if(trackItem)
  {
    if(type == 'play'){
      const result = await getPlayInfoAxios(trackItem.clientKey);
      if (result && result.INFO && result.INFO.URL) {
        trackItem.playUrl = result.INFO.URL;
      }
  
      const RoseMemberTrackItem: any[] = [trackItem];
      const trackData = {
        rosemembertrackitem : RoseMemberTrackItem
      }
      let json_track_data: string = JSON.stringify(trackData);
      sendMessage("webStreamTotalHomeTrackClick", json_track_data);
    }
    else if(type == 'option')
    {
      if (tracksItem && Array.isArray(tracksItem.tracks)) {
        await Promise.all(
          tracksItem.tracks.map(async (track) => {
            if (track.clientKey) {
              try {
                const result = await getPlayInfoAxios(track.clientKey);
                if (result && result.INFO && result.INFO.URL) {
                  track.playUrl = result.INFO.URL;
                }
              } catch (error) {
                console.error(`Failed to fetch play info for clientKey ${track.clientKey}:`, error);
              }
            }
          })
        );
      }

      const trackData = {
        rosemembertrackitem : tracksItem.tracks,
        position:position,
        isrecent:true
      }
      let json_track_data: string = JSON.stringify(trackData);
      sendMessage("webStreamTotalHomeMoreClick", json_track_data);
    }
  }
};

export async function funcPlayListPlayClick(type:string, playlist:TRACK_RECENT_LIST_RESPONSE | TRACK_PLAYLIST_TYPE, position?:number) {
  const appType = getCookie("app_type");
  // playlist.tracks가 존재하는 경우 각 트랙의 playUrl 업데이트
  if (playlist && Array.isArray(playlist.tracks)) {
    await Promise.all(playlist.tracks.map(async (track) => {
      if (track.clientKey) {
        try {
          const result = await getPlayInfoAxios(track.clientKey);
          if (result && result.INFO && result.INFO.URL) {
            track.playUrl = result.INFO.URL;
          }
        } catch (error) {
          console.error(`Failed to fetch play info for clientKey ${track.clientKey}:`, error);
        }
      }
    }));
  }

  if(playlist)
  {
    if(type == 'allPlay'){
      const trackData = {
        rosememberplaylistitem : playlist,
        isShufflePlay:false
      }
      const json_playList_data: string = JSON.stringify(trackData);
      sendMessage("webStreamTotalHomePlaylistClick", json_playList_data);
    }
    else if(type == 'sufflePlay'){
      const trackData = {
        rosememberplaylistitem : playlist,
        isShufflePlay:true
      }
      const json_playList_data: string = JSON.stringify(trackData);
      sendMessage("webStreamTotalHomePlaylistClick", json_playList_data);
    }
    else if(type === 'share'){
      const json_playList_data: string = JSON.stringify(playlist);
      sendMessage("webStreamTotalHomeGotoShare", json_playList_data);
    }
    else if(type === 'option'){
      const json_playList_data: string = JSON.stringify(playlist);
      sendMessage("webStreamTotalHomePlaylistMoreClick", json_playList_data);
    }
    else if(type === 'trackoption'){
      const trackData = {
        rosememberplaylistitem : playlist,
        position: position
      }
      const json_playList_data: string = JSON.stringify(trackData);
      sendMessage("webStreamTotalHomePlaylistTrackMoreClick", json_playList_data);
    }
  }
};

export function funcPreviewClick(url : string, playable_code: string, item : ALBUM_ITEM_TYPE, duration?: string) {
  const appType = getCookie("app_type");
  const WebStreamTrackItem: any[] = [];
  const duratinon = convertToMilliseconds(duration?duration:'0');
  const trackItem = {
    track_id : item.ID,
    title : item.TITLE,
    thumbnail : item.THUMBNAIL,
    url : url,
    playable_code : playable_code,
    media_type : item.MEDIA_TYPE,
    album_id : item.ALBUM_ID,
    album_name : item.ALBUM_NAME,
    artist : item.ARTIST,
    duration : duratinon,
    resolution : item.DATA?.resolution,
    codec : item.DATA?.codec,
    isPreview : true
  };
  WebStreamTrackItem.push(trackItem);

  const trackData = {
    webstreamtrackitem : WebStreamTrackItem
  }

  let json_track_data: string = JSON.stringify(trackData);
  sendMessage("webStreamTrackClick", json_track_data);
}


export function generateClientRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const array = new Uint32Array(10);
  (window as any).crypto.getRandomValues(array);

  return Array.from(array, (num) => characters[num % characters.length]).join('');
}

export function sendMessage(type: string, data: any) {
  console.log("sendMessage : ", type, data);
  const appType = getCookie("app_type");
  console.log("appType : ", appType);
  const messageData = {
    type: type,
    data: typeof data === 'string' ? data : JSON.stringify(data)
  };
  
  if (appType === "mobile" && (window as any).HifiRose && typeof (window as any).HifiRose[type] === 'function') {
    // 모바일 앱에서 호출
    (window as any).HifiRose[type](typeof data === 'string' ? data : JSON.stringify(data));
    if ((window as any).ReactNativeWebView) {
      (window as any).ReactNativeWebView.postMessage(JSON.stringify(messageData));
    }
  } 
  else if (type === "close") {
    const messageData = {
      type: "close"
    };
    if (appType === "mobile") {
      if((window as any).ReactNativeWebView){
        (window as any).ReactNativeWebView.postMessage(JSON.stringify(messageData));
      }else{
        (window as any).HifiRose.close();
      }
    }
    else if (appType === "pc") {
      (window as any).parent.postMessage(messageData, "*");
    }
  } else if (type === "reload") {
    const messageData = {
      type: "reload"
    };

    if((window as any).ReactNativeWebView){
      (window as any).ReactNativeWebView.postMessage(JSON.stringify(messageData));
    }else{
      (window as any).HifiRose.reload();
    }
  } else {

    // 일반 웹뷰에서 호출
    (window as any).parent.postMessage(messageData, "*");
    /*
    if ((window as any).parent.ReactNativeWebView) {
      (window as any).parent.ReactNativeWebView.postMessage(JSON.stringify(messageData));
    }
    */
  }
  
  return true;
}

