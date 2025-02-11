'use client';

import SubTitleProvider, { SubTitleContext } from "@/providers/SubTitleProvider";
import {useSearchParams } from 'next/navigation';
import PlayListTrack from "@/component/template/PlayListTrack";
import { useContext, useEffect } from "react";

export default function PlayListtrackPage({ params }: { params: { id: string} }) {
	const searchParams = useSearchParams();
	const size = parseInt(searchParams.get("size") || "0", 10);
	const title = searchParams.get('title') || '';

	const { setSubTitle } = useContext(SubTitleContext);
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정
	useEffect(() => {
		setSubTitle(title);
	});

	return (
		<SubTitleProvider>
			<div className="trackPage">
				<PlayListTrack  playList_id={params.id} size={size}/>
			</div>
		</SubTitleProvider>
	);
}