import AlbumListViewAll from "@/component_RS/albumList/AlbumViewAll";
import SubTitleProvider from "@/providers/SubTitleProvider";

export default function ViewAllAlbum() {
	return (
		<>
			<SubTitleProvider>
				<div className="datailAlbumPage">
					<AlbumListViewAll
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
