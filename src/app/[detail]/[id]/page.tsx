import SubTitleProvider from "@/providers/SubTitleProvider";
import AlbumDetail from "@/component/template/AlbumTrack";

export default function page() {
	return (
		<SubTitleProvider>
			<div className="detailPage">
				<AlbumDetail />
			</div>
		</SubTitleProvider>
	);
}
