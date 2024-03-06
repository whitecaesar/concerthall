"use client";
import React from "react";
import SubTitleProvider from "@/providers/SubTitleProvider";
import SingleList from "@/component/organism/singleList/SingleList";
import { useQuery } from "@tanstack/react-query";
import {
	getExploreResults,
	TRESULT_LIST_RESPONSE,
} from "@/services/explore/ExploreResultAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";

export default function ExploreResult() {
	const { data, isFetched, isLoading, isError, error } = useQuery<
		TRESULT_LIST_RESPONSE,
		Error
	>({
		queryKey: ["KEYWORD-RESRULT"],
		queryFn: getExploreResults,
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error: {error?.message}</div>;
	}

	return (
		<SubTitleProvider>
			<div className="exploreResultPage">
				{isFetched &&
					data?.RESULT_LIST?.map((content: VIEWALL_LIST_TYPE) => (
						<React.Fragment key={content.ID}>
							<SingleList showTitle={true} recommendList={content} />
						</React.Fragment>
					))}
			</div>
		</SubTitleProvider>
	);
}
