"use client";
import { ALBUM_DETAIL_TYPE } from "@/services/contents/AlbumAxios";
import { REG_ALBUM_REQEUST_TYPE, REG_TRACK_REQEUST_TYPE, setAlbumStarAxios, setPLTStarAxios, setRegAlbumAxios } from "@/services/contents/PLTStarAxios";
import { STAR_ALBUM_REQUEST_TYPE, STAR_TRACK_REQUEST_TYPE, getStarAlbumAxios, getStarTrackAxios } from "@/services/contents/StarAxios";
import React, { useState, useEffect } from "react";

interface LikeButtonProps {
  starPoint: number;
  album_info:ALBUM_DETAIL_TYPE;
}

const AlbumLikeButton = ({ starPoint, album_info } : LikeButtonProps) => {
  const [star, setNumber] = useState(starPoint);
  const likeClick = async() => {
    try {
      const starTrackParam: STAR_ALBUM_REQUEST_TYPE = {
        album: { type: 'CONCERT_HALL', clientKey: album_info.ID }
      };
      const albumStarResponse = await getStarAlbumAxios(starTrackParam);

      if (albumStarResponse.id !== null) {
        const param = { ratingInfo: { type: 'CONCERT_HALL', star: (star + 1) % 4 }, album: { id: albumStarResponse.id } };
        await setAlbumStarAxios(param);
        setNumber(prevStar => (prevStar + 1) % 4);
      } else {
        const setTrackParam: REG_ALBUM_REQEUST_TYPE = {
          album: { clientKey: album_info.ID, star: 1, thumbnail: album_info.THUMBNAIL, title: album_info.TITLE, type: 'CONCERT_HALL' }
        };
        await setRegAlbumAxios(setTrackParam);
        const regstarparam = { ratingInfo: { type: 'CONCERT_HALL', star: 1 }, album: { id: album_info.ID } };
        await setAlbumStarAxios(regstarparam);
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
        .likeBtn0,
        .likeBtn1,
        .likeBtn2,
        .likeBtn3 {
          display: inline-block;
          width: 20px;
          height: 20px;
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
        }
        .likeBtn0 {
          background-image: url(/images/icon/png/icon_heart_0.png);
        }
        .likeBtn1 {
          background-image: url(/images/icon/png/icon_heart_1.png);
        }
        .likeBtn2 {
          background-image: url(/images/icon/png/icon_heart_2.png);
        }
        .likeBtn3 {
          background-image: url(/images/icon/png/icon_heart_3.png);
        }
      `}</style>
    </>
  );
};

export default AlbumLikeButton;
