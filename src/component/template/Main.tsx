"use client";
import TextBanner from "../organism/textBanner/TextBanner";
import ImageBanner from "../organism/imageBanner/ImageBanner";
import SingleList from "../organism/singleList/SingleList";
import AlbumList from "../organism/albumList/AlbumList";
import { useQuery } from "@tanstack/react-query";
import { getBannersAxios } from "@/services/main/MainInfoAxios";
import { VIEWALL_LIST_TYPE } from "@/services/contents/ViewAllAxios";

export default function Main() {
	const { data, isFetched } = useQuery({
		queryKey: ["MAIN-BANNER"],
		queryFn: () => {
			const list = getBannersAxios();
			return list;
		},
	});

	return (
		<>
			<ImageBanner list={data?.IMG_BANNER} isFetched={isFetched} />
			<TextBanner banner={data?.TXT_BANNER[0]} isFetched={isFetched} />
			{/* 나중에 [0]빼야함 */}

			{data?.RECOMMEND_LIST.map((content: VIEWALL_LIST_TYPE) => {
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
