import React, { useState, useEffect } from "react";
import { ALBUM_ITEM_TYPE } from "@/services/contents/AlbumAxios";
import { REG_TRACK_REQEUST_TYPE, setPLTStarAxios, setRegTrackAxios } from "@/services/contents/PLTStarAxios";
import { STAR_TRACK_REQUEST_TYPE, getStarTrackAxios } from "@/services/contents/StarAxios";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";

interface LikeButtonProps {
  starPoint: number;
  track_info?: ITEM_INFO_TYPE;
}

const LikeButton = ({ starPoint, track_info }: LikeButtonProps) => {
  // 훅을 조건문 전에 호출합니다.
  const [star, setNumber] = useState(starPoint);

  // track_info가 없으면 아무 것도 렌더링하지 않습니다.
  if(!track_info) {
    return null;
  }

  const likeClick = async() => {
    try {
      const starTrackParam: STAR_TRACK_REQUEST_TYPE = {
        tracks: [{ type: 'CONCERT_HALL', clientKey: track_info.ID }]
      };
      const trackStarResponse = await getStarTrackAxios(starTrackParam);

      if (trackStarResponse.id !== null) {
        const param = { ratingInfo: { type: 'CONCERT_HALL', star: (star + 1) % 4 }, track: { id: trackStarResponse.id } };
        await setPLTStarAxios(param);
        setNumber((prevStar) => (prevStar + 1) % 4);
      } else {
        const duration = parseInt(track_info.DURATION || "0", 10);
        const setTrackParam: REG_TRACK_REQEUST_TYPE = {
          tracks: [{ clientKey: track_info.ID, duration, star: 1, thumbnailUrl: track_info.THUMBNAIL, title: track_info.TITLE, type: 'CONCERT_HALL' }]
        };
        await setRegTrackAxios(setTrackParam);
        const regstarparam = { ratingInfo: { type: 'CONCERT_HALL', star: 1 }, track: { id: track_info.ID } };
        await setPLTStarAxios(regstarparam);
        setNumber(1);
      }
    } catch (error) {
      console.error('Error fetching star rating', error);
    }
  };

  return (
    <>
      <button onClick={likeClick} className={`likeBtn${star}`}></button>
      <style jsx>{`
        .likeBtn0, .likeBtn1, .likeBtn2, .likeBtn3 {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .likeBtn0 { background-image: url(/images/icon/png/icon_heart_0.png); }
        .likeBtn1 { background-image: url(/images/icon/png/icon_heart_1.png); }
        .likeBtn2 { background-image: url(/images/icon/png/icon_heart_2.png); }
        .likeBtn3 { background-image: url(/images/icon/png/icon_heart_3.png); }
      `}</style>
    </>
  );
};

export default LikeButton;