"use client";
import RecentAlbumViewAll from "@/component/template/RecentAlbumViewAll";
import SubTitleProvider from "@/providers/SubTitleProvider";
import { useSearchParams  } from 'next/navigation';

export default function RecentViewAllAlbum() {
    const params = useSearchParams();
    const cnt = params.get('totalcount');
    
	return (
		<>
			<SubTitleProvider>
				<div className="datailAlbumPage">
					<RecentAlbumViewAll totalCnt={cnt}/>
				</div>
			</SubTitleProvider>
		</>
	);
}
