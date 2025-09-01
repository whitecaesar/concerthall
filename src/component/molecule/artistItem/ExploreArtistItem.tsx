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
	// 썸네일 URL 조건부 처리
	const getThumbnailUrl = (url: string) => {
		if (!url) return '';
		
		// "/CHC_IMG/OTT_IMG/ARTIST"가 포함되어 있는지 확인
		if (url.includes('/CHC_IMG/OTT_IMG/ARTIST')) {
			return url;
		} else {
			// 포함되지 않은 경우 기본 URL 추가
			return `http://cip.ontown.co.kr/CHC_IMG/OTT_IMG/ARTIST${url}`;
		}
	};

	return (
		<div className={style.artistItem}>
			<Link href={`/artist/${artistInfo.artist_id}`}>
				{artistInfo.thumbnail &&
				<Image
					src={getThumbnailUrl(artistInfo.thumbnail)}
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
