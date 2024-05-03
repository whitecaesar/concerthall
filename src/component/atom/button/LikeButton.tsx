"use client";
import React, { useState, useEffect } from "react";

interface LikeButtonProps {
  starPoint: number;
}

const LikeButton = ({ starPoint } : LikeButtonProps) => {
  const likeClick = () => {
    // num 상태를 업데이트하는 함수, num 값이 0에서 3 사이를 순환
//    setNumber((likeNum) => (likeNum + 1) % 4);
  };

  return (
    <>
      <button onClick={likeClick} className={`likeBtn${starPoint}`}></button>
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

export default LikeButton;
