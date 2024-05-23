'use client';

import SubTitleProvider from "@/providers/SubTitleProvider";
import {useSearchParams } from 'next/navigation';
import PlayListTrack from "@/component/template/PlayListTrack";

export default function PlayListtrackPage({ params }: { params: { id: string} }) {
	const searchParams = useSearchParams();
	const size = parseInt(searchParams.get("size") || "0", 10);

	return (
		<SubTitleProvider>
			<div className="trackPage">
				<PlayListTrack  playList_id={params.id} size={size}/>
			</div>
		</SubTitleProvider>
	);
}