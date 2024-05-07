import LikeList from "@/component/organism/likeList/LikeList";

export default function LikeListPage() {
	return (
		<>
			<div className="playListPage" style={{ paddingBottom: "20px" }}>
				<LikeList album_id={"0"} />
			</div>
		</>
	);
}
