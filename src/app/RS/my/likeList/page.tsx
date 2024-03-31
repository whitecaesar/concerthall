import SingleList from "@/component_RS/singleList/SingleList";

export default function LikeList() {
	return (
		<div className="likeListPage">
			<SingleList
				recommendList={{
					PATH: undefined,
					TYPE: "ALBUM",
					ID: 0,
					TITLE: "",
					TOTAL_NUM_ITEM: undefined,
					ITEM_INFO: [],
				}}
				isTitle={false}
			/>
		</div>
	);
}
