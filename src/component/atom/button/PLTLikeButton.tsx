"use client";
import { setPLTStarAxios } from "@/services/contents/PLTStarAxios";
import React, { useState, useEffect } from "react";

interface LikeButtonProps {
  starPoint: number;
  track_id:string;
}

const PLTLikeButton = ({ starPoint, track_id } : LikeButtonProps) => {
  const [star, setNumber] = useState(starPoint);
  const likeClick = () => {
    // num 상태를 업데이트하는 함수, num 값이 0에서 3 사이를 순환
    setNumber((star) => (star + 1) % 4);
    const param = {ratingInfo:{type:'QOBUZ', star:(star + 1) % 4},track:{id:track_id}};
    setPLTStarAxios(param);
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

export default PLTLikeButton;
