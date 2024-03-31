import SubTitleProvider from "@/providers/SubTitleProvider";
import SingleListViewAll from "@/component_RS/singleList/SingleViewAll";

export default function ViewAllSingle() {
	return (
		<>
			<SubTitleProvider>
				<div className="datailSinglePage">
					<SingleListViewAll
						viewAllList={{
							TYPE: "ALBUM",
							ID: 0,
							TITLE: "",
							TOTAL_NUM_ITEM: undefined,
							ITEM_INFO: [],
						}}
					/>
				</div>
			</SubTitleProvider>
		</>
	);
}
