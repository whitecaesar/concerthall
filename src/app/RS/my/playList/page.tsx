import AlbumList from "@/component_RS/albumList/AlbumList";

export default function PlayList() {
	return (
		<>
			<div className="playListPage" style={{ paddingBottom: "20px" }}>
				<AlbumList
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
		</>
	);
}
