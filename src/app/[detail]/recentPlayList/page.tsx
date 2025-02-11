"use client";
import SubTitleProvider, { SubTitleContext } from "@/providers/SubTitleProvider";
import RecentPlayViewAll from "@/component/template/RecentPlayViewAll";
import { useSearchParams  } from 'next/navigation';
import { useContext, useEffect } from "react";
export default function RecentViewAllPlayList() {
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
				<div className="datailSinglePage">
					<RecentPlayViewAll totalCnt={cnt}/>
				</div>
			</SubTitleProvider>
		</>
	);
}
