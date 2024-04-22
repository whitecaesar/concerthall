'use client';

import SubTitleProvider from "@/providers/SubTitleProvider";
import AlbumTrack from "@/component/template/AlbumTrack";
import { usePathname, useRouter } from 'next/navigation';

export default function trackPage({ params }: { params: { id: string } }) {

	return (
		<SubTitleProvider>
			<div className="trackPage">
				<AlbumTrack  album_id={params.id}/>
			</div>
		</SubTitleProvider>
	);
}
