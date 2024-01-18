"use client";
import TextBanner from "../organism/textBanner/TextBanner";
import ImageBanner from "../organism/imageBanner/ImageBanner";
import SingleList from "../organism/singleList/SingleList";
import AlbumList from "../organism/albumList/AlbumList";
import { useQuery } from "@tanstack/react-query";
import {
	TRECOMMEND_LIST_RES,
	getBannersAxios,
} from "@/services/banner/MainInfoAxios";

export default function Main() {
	// 여기1
	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: () => {
			const list = getBannersAxios();
			return list;
		},
	});
	console.log(data?.RECOMMEND_LIST);

	return (
		<>
			<ImageBanner list={data?.IMG_BANNER} isFetched={isFetched} />
			<TextBanner list={data?.TXT_BANNER} isFetched={isFetched} />

			{data?.RECOMMEND_LIST.map((content: TRECOMMEND_LIST_RES) => {
				console.log(content);
				return (
					<>
						{content.TYPE === "SINGLE" ? (
							<SingleList showTitle={true} recommendList={content} />
						) : (
							<AlbumList showTitle={true} recommendList={content} />
						)}
					</>
				);
			})}
		</>
	);
}
