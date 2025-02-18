"use client";
import LikeList from "@/component/organism/likeList/LikeList";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function LikeListPage() {
	const params = useSearchParams();
	const title = params.get('title');

	const { setSubTitle } = useContext(SubTitleContext);
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정
	useEffect(() => {
		setSubTitle(title);
	});
	
	return (
		<>
			<div className="playListPage" style={{ paddingBottom: "20px" }}>
				<LikeList />
			</div>
		</>
	);
}
