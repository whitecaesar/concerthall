"use client";
import SubTitleProvider, { SubTitleContext } from "@/providers/SubTitleProvider";
import { useSearchParams } from "next/navigation";
import MyPlayViewAll from "@/component/template/MyPlayList";
import { useContext, useEffect } from "react";

export default function RecentViewAllPlayList() {
	const params = useSearchParams();
	const cnt = params.get("totalcount");
	const title = params.get('title');

	const { setSubTitle } = useContext(SubTitleContext);
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정
	useEffect(() => {
		setSubTitle(title);
	});

	return (
		<>
			<SubTitleProvider>
				<div className="datailSinglePage">
					<MyPlayViewAll totalCnt={cnt} />
				</div>
			</SubTitleProvider>
		</>
	);
}
