// 아티스트에 관한 설명
import React from "react";
import { ITEM_INFO_TYPE } from "@/services/contents/ViewAllAxios";
import ItemListTitle from "../itemListTitle/ItemListTitle";
import style from "./artistAbout.module.css";

interface ArtistItemProps {
	artist_desc: string;
}

const ArtistAbout = ({ artist_desc }: ArtistItemProps) => {
	return (
		<div className="artistAbout">
			<ItemListTitle text={"About"} />
			<div className={style.aboutContent}>
				<p>
					{artist_desc}
				</p>
			</div>
		</div>
	);
};

export default ArtistAbout;
