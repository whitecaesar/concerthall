import AlbumViewAll from "@/component/template/AlbumViewAll";
import Dropdown from "@/component/atom/dropdown/dropdown";
import { dropdownOptions } from "@/interface/DropdownType";

export default function PlayList() {
	return (
		<>
			<div className="playListPage" style={{ paddingBottom: "20px" }}>
				<Dropdown options={dropdownOptions} />
				<AlbumViewAll />
			</div>
		</>
	);
}
