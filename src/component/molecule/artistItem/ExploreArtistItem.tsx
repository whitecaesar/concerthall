// 아티스트 아이템(동그란 것)
"use client";
import Image from "next/image";
import Link from "next/link";
import style from "./artistItem.module.css";
import { ARTIST_INFO_TYPE } from "@/services/contents/ViewAllAxios";

interface ExplireArtistItemProps {
	artistInfo: ARTIST_INFO_TYPE;
}

const ExplireArtistItem = ({ artistInfo }: ExplireArtistItemProps) => {

	return (
		<div className={style.artistItem}>
			<Link href={`/artist/${artistInfo.artist_id}`}>
				{artistInfo.thumbnail &&
				<Image
					src={artistInfo.thumbnail}
					alt={artistInfo.artist_name}
					width={130}
					height={130}
					priority={true}
					className={style.thumbnail}
				/>
				}
				<p className={style.title}>{artistInfo.artist_name}</p>
			</Link>
		</div>
	);
};

export default ExplireArtistItem;
