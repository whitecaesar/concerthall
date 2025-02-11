"use client";
import SubTitleProvider, { SubTitleContext } from "@/providers/SubTitleProvider";
import { useSearchParams  } from 'next/navigation';
import { TRACK_RECENT_LIST_RESPONSE, getRecentTrackListAxios } from "@/services/contents/RecentTrackListAxios";
import { useContext, useEffect, useState } from "react";
import RCTTrackList from "@/component/organism/trackList/RCTTrackList";

export default function RecentViewAllTrackList() {
  const searchParams = useSearchParams();
	const size = parseInt(searchParams.get("totalcnt") || "0", 10);
	const title = searchParams.get('title');
	const {setSubTitle, subTitle} = useContext(SubTitleContext);

	useEffect(() => {
		setSubTitle(title);
	});

  const [recentTrackList, setRecentTrackList] = useState<TRACK_RECENT_LIST_RESPONSE>();
    useEffect(() => {
			getRecentTrackListAxios("", size).then((trackdata) => setRecentTrackList(trackdata));
	}, [size]);

	return (
		<>
			<SubTitleProvider>
				<div className="datailSinglePage">
          {recentTrackList && <RCTTrackList trackList={recentTrackList}/>}
				</div>
			</SubTitleProvider>
		</>
	);
}
