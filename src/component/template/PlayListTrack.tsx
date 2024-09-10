"use client";
import { useQuery } from "@tanstack/react-query";
import { getPlayListTrackListAxios } from "@/services/contents/PlayListTrackAxios";
import PlaylistDetailInfo from "../molecule/detailInfo/PlaylistDetailInfo";
import FuncPlayListButtonGroup from "../molecule/buttonGroup/FuncPlayListButtonGroup";
import PLTrackList from "../organism/trackList/PLTrackList";
import { getPLLIKEAxios } from "@/services/contents/PLLikeAxio";
import { useContext, useEffect, useState } from "react";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import Loading from "@/app/loading";

interface PlayListTrackProps {
	playList_id: string;
	func_type?: string;
	size: number;
}

export default function PlayListTrack({
	playList_id,
	func_type,
	size,
}: PlayListTrackProps) {
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정
	const [like, setLike] = useState(false);
	const { setSubTitle } = useContext(SubTitleContext);
	const { data, isError, isLoading } = useQuery({
		queryKey: ["ALBUM-ITEM"],
		queryFn: () => {
			const TrackList = getPlayListTrackListAxios(playList_id, size);
			return TrackList;
		},
	});

	useEffect(() => {
		getPLLIKEAxios(playList_id).then((data) =>
			data.code == "200" ? setLike(data.result) : alert(data.code)
		);
	}, []);

	if (isLoading) return <Loading />;
	if (isError || !data) return <div>Error occurred</div>;

	// data가 non-null임을 보장하기 위한 optional chaining
	const PlayList = data?.playlist; // 예시로 첫 번째 아이템 사용

	return (
		<>
			<PlaylistDetailInfo detailInfo={PlayList} />
			<FuncPlayListButtonGroup
				trackItem={PlayList}
				pageType={"PlayListPage"}
				like={like}
			/>
			{PlayList && <PLTrackList trackList={PlayList} />}
		</>
	);
}
