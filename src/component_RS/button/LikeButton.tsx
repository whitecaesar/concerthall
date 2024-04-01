"use client";
import React, { useState } from "react";
import style from "./button.module.css";

const LikeButton = () => {
	const [number, setNumber] = useState<number>(0);

	const likeClick = () => {
		setNumber((likeNum) => (likeNum + 1) % 4);
	};

	return (
		<button onClick={likeClick} className={style[`likeBtn${number}`]}></button>
	);
};

export default LikeButton;
