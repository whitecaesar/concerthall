"use client";
import { setPLLIKEAxios } from "@/services/contents/PLLikeAxio";
import React, { useEffect, useState } from "react";

interface thumbupProp {
	status: boolean;
	targetId : string;
}
const ThumbupButton = ({status,targetId} : thumbupProp) => {
	const [isActive, setIsActive] = useState('');
	useEffect(() => {
		if(status)
		{
			setIsActive('on');
		} 
	}, [status]);
	
	const toggleButton = () => {
		if(!isActive)
		{
			/* 안좋아요 */
			const param = {	targetId:targetId, 
							type:'PLAY_LIST',
							thumbup:true}
			setPLLIKEAxios(param).then(data => data.code == '200'? setIsActive('on'):alert('error'));
		}
		else
		{
			/* 좋아요 */
			const param = {	targetId:targetId, 
							type:'PLAY_LIST',
							thumbup:false}
			setPLLIKEAxios(param).then(data => data.code == '200'? setIsActive(''):alert('error'));
		}
	};

	return (
		<>
			<button
				onClick={toggleButton}
				className={`thumbupBtn ${isActive}`}
			></button>
			<style jsx>{`
				.thumbupBtn {
					display: inline-block;
					width: 22px;
					height: 22px;
					background-size: contain;
					background-position: center center;
					background-repeat: no-repeat;
					background-image: url(/images/icon/png/icon_thumbup.png);
					&.on {
						background-image: url(/images/icon/png/icon_thumbup_on.png);
					}
				}
			`}</style>
		</>
	);
};

export default ThumbupButton;
