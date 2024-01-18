import React from "react";
import SubTitleProvider from "@/providers/SubTitleProvider";
import SingleList from "@/component/organism/singleList/SingleList";

export default function ExploreResultPage() {
	return (
		<>
			<SubTitleProvider>
				<div className="exploreResultPage">
					<SingleList showTitle={true} noScroll={false} />
				</div>
			</SubTitleProvider>
		</>
	);
}
