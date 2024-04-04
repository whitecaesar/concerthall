"use client";
import SubTitleProvider from "@/providers/SubTitleProvider";
import RecentPlayViewAll from "@/component/template/RecentPlayViewAll";
import { useSearchParams  } from 'next/navigation';

export default function RecentViewAllPlayList() {
    const params = useSearchParams();
    const cnt = params.get('totalcount');

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
