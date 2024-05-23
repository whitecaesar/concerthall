// 아티스트에 관한 설명
import React from "react";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";
import ItemListTitle from "../itemListTitle/ItemListTitle";
import style from "./artistAbout.module.css";

interface ArtistItemProps {
	artistInfo: ITEM_INFO_TYPE;
}

const ArtistAbout = ({ artistInfo }: ArtistItemProps) => {
	return (
		<div className="artistAbout">
			<ItemListTitle text={"About"} />
			<div className={style.aboutContent}>
				<p>
					Alicia Augello Cook (born January 25, 1981), known professionally as
					Alicia Keys, is an American singer and songwriter. A classically
					trained pianist, Keys began composing songs when she was the age of 12
					and was signed by Columbia Records at the age of 15. After disputes
					with the label, she signed with J Records to release her debut studio
					album, Songs in A Minor (2001). Met with critical acclaim and
					commercial success, the album sold over 12 million copies worldwide
					and won five awards at the 44th Annual Grammy Awards.
				</p>
			</div>
		</div>
	);
};

export default ArtistAbout;
