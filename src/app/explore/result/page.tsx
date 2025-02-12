"use client";
import React, { useContext, useEffect } from "react";
import ExploreResult from "@/component/template/ExploreResult";
import { useSearchParams } from "next/navigation";
import { SubTitleContext } from "@/providers/SubTitleProvider";

export default function ExploreResultPage() {
	const params = useSearchParams();
	const search = params.get("search");

	const { setSubTitle } = useContext(SubTitleContext);
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정
	useEffect(() => {
		setSubTitle(search);
	});
	return (
		<>
			{<div className="exploreResultPage">
				<ExploreResult exploreKey={search?search:""}/>
			</div>}
		</>
	);
}
