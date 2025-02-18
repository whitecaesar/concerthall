"use client";

import SubTitleProvider, { SubTitleContext } from "@/providers/SubTitleProvider";
import SingleViewAll from "@/component/template/SingleViewAll";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect } from "react";

export default function ViewAllSingle({ params }: { params: { id: string} }) {
	const searchParams = useSearchParams();
	const title = searchParams.get('title') || '';

	const { setSubTitle } = useContext(SubTitleContext);
	// useQuery 호출을 옵션 객체를 사용하는 형태로 수정
	useEffect(() => {
		setSubTitle(title);
	});
	
	return (
		<>
			<SubTitleProvider>
				<div className="datailSinglePage">
					<SingleViewAll list_id={params.id}/>
				</div>
			</SubTitleProvider>
		</>
	);
}
