"use client";
import RecentAlbumViewAll from "@/component/template/RecentAlbumViewAll";
import { useSearchParams  } from 'next/navigation';
import { useContext, useEffect } from "react";
import SubTitleProvider, { SubTitleContext } from "@/providers/SubTitleProvider";

export default function RecentViewAllAlbum() {
    const params = useSearchParams();
    const cnt = params.get('totalcount');
		const title = params.get('title');
    const {setSubTitle, subTitle} = useContext(SubTitleContext);

		useEffect(() => {
			setSubTitle(title);
		});
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
