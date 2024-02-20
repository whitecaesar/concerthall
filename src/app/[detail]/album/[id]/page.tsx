import AlbumViewAll from "@/component/template/AlbumViewAll";
import SubTitleProvider from "@/providers/SubTitleProvider";

export default function ViewAllAlbum() {
	return (
		<>
			<SubTitleProvider>
				<div className="datailAlbumPage">
					<AlbumViewAll />
				</div>
			</SubTitleProvider>
		</>
	);
}
