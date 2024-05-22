import AlbumViewAll from "@/component/template/AlbumViewAll";
import SubTitleProvider from "@/providers/SubTitleProvider";

export default function ViewAllAlbum({ params }: { params: { id: string } }) {

	return (
		<>
			<SubTitleProvider>
				<div className="datailAlbumPage">
					<AlbumViewAll list_id={params.id}/>
				</div>
			</SubTitleProvider>
		</>
	);
}
