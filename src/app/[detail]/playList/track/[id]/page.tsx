'use client';

import SubTitleProvider from "@/providers/SubTitleProvider";
import AlbumTrack from "@/component/template/AlbumTrack";
import { usePathname, useRouter } from 'next/navigation';
import PlayListTrack from "@/component/template/PlayListTrack";

export default function trackPage({ params }: { params: { id: string } }) {

	return (
		<SubTitleProvider>
			<div className="trackPage">
				<PlayListTrack  playList_id={params.id}/>
			</div>
		</SubTitleProvider>
	);
}