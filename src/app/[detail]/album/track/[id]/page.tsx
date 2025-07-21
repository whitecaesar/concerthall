"use client";

import SubTitleProvider, { SubTitleContext } from "@/providers/SubTitleProvider";
import AlbumTrack from "@/component/template/AlbumTrack";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function TrackPage({ params }: { params: { id: string} }) {
	const searchParams = useSearchParams();
	const title = searchParams.get('title') || '';
	const type = searchParams.get('type') || '';

	const { setSubTitle } = useContext(SubTitleContext);
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정
	useEffect(() => {
		setSubTitle(title);
	});

	return (
		<SubTitleProvider>
			<div className="trackPage">
				<AlbumTrack album_id={params.id}/>
			</div>
		</SubTitleProvider>
	);
}
