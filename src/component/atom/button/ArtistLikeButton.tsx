"use client";
import { ARTISTINFO_INFO_TYPE } from "@/services/contents/ArtistInfoAxios";
import { ARTIST_REG_REQUEST_TYPE, ARTIST_SETREG_REQUEST_TYPE, ARTIST_STAR_REQUEST_TYPE, getRegArtistInfoAxios, setArtistStarAxios, setRegArtistAxios } from "@/services/contents/LikeArtistAxios";
import React, { useState} from "react";

interface ArtistLikeButtonProps {
  starPoint: number;
  artistInfo : ARTISTINFO_INFO_TYPE;
}

const ArtistLikeButton = ({ starPoint, artistInfo } : ArtistLikeButtonProps) => {
  const [star, setNumber] = useState(starPoint);
  const likeClick = async() => {
    try {
      
      const starTrackParam: ARTIST_REG_REQUEST_TYPE = {
        artist: { type: 'CONCERT_HALL', clientKey: artistInfo.ID_ARTIST}
      };
      const artistStarResponse = await getRegArtistInfoAxios(starTrackParam);
      console.log("artistStarResponse", artistStarResponse);

      if (artistStarResponse.id !== null) {
        const param : ARTIST_STAR_REQUEST_TYPE = { ratingInfo: { star: (star + 1) % 4 }, artist: { id: artistStarResponse.id } };
        await setArtistStarAxios(param);
        setNumber(prevStar => (prevStar + 1) % 4);
      } else {
        const setTrackParam: ARTIST_SETREG_REQUEST_TYPE = {
          artist: { name: artistInfo.NM_ARTIST, comment: artistInfo.DESC_ARTIST, thumbnail: [artistInfo.IMG_ARTIST], clientKey: artistInfo.ID_ARTIST ? String(artistInfo.ID_ARTIST) : "", type: 'CONCERT_HALL' }
        };
        console.log("setTrackParam", setTrackParam);
        const artistRegResponse = await setRegArtistAxios(setTrackParam);

        if(artistRegResponse.id)
        {
            const regstarparam : ARTIST_STAR_REQUEST_TYPE = { ratingInfo: { star: (star + 1) % 4 }, artist: { id: artistRegResponse.id } };
            await setArtistStarAxios(regstarparam);
        }
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

export default ArtistLikeButton;
