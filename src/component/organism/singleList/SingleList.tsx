// 단일 컨텐츠 리스트
import React, { useContext, useEffect, useState } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import SingleItem from "@/component/molecule/singleItem/SingleItem";
import { SubTitleContext } from "@/providers/SubTitleProvider";
import style from "./singleList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";
import { STAR_REQUEST_ITEM_TYPE, STAR_REQUEST_TYPE, STAR_TRACK_REQUEST_TYPE, getStarAxios, getStarTrackAxios } from "@/services/contents/StarAxios";

interface SingleListProps {
	// recommendList: TITEM_INFO[];
	recommendList: VIEWALL_LIST_TYPE;
	showTitle: boolean;
	noScroll?: boolean;
}
// TYPE, ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO[]

export default function SingleList({
	recommendList: { ID, TITLE, TOTAL_NUM_ITEM, ITEM_INFO },
}: SingleListProps) {
	const { setSubTitle } = useContext(SubTitleContext);
	const [itemsWithStar, setItemsWithStar] = useState<ITEM_INFO_TYPE[]>([]);
	
	useEffect(() => {
		// 각 항목에 대해 별점 정보를 가져옵니다.
		async function fetchStarRatings() {
			const updatedItems = await Promise.all(
				ITEM_INFO.map(async item => {
					try {
						const starTrackParam: STAR_TRACK_REQUEST_TYPE = {
							track : [
								{type : 'QOBUZ', clientKey: item.ID}
							]
						}
						console.log(starTrackParam);
						const trackStartResponse = getStarTrackAxios(starTrackParam);
						
						const contentParam: STAR_REQUEST_ITEM_TYPE[] = [
							{
								id: (await trackStartResponse).id,
								clientKey: item.ID
							}
						];

						const params: STAR_REQUEST_TYPE = {
							contents : contentParam,
							mediaType : 'QOBUZ'
						}

						const response = getStarAxios('Track', params);
						if((await response).code != '200')
						{
							return { ...item, star: 0 }; 
						}
						else{
							return { ...item, star: (await response).contents[0].star };  // star 정보를 항목에 추가
						}
					} catch (error) {
						console.error('Error fetching star rating', error);
						return { ...item, star: 0 };  // 에러가 나면 star를 0으로 설정
					}
				})
			);
			setItemsWithStar(updatedItems);
		}

		 fetchStarRatings();
	}, [ITEM_INFO]);

	//console.log(itemsWithStar);
	
	return (
		<div style={{ paddingBottom: "10px" }}>
			<ItemListTitle.ViewAll
				isPresent={true}
				text={TITLE}
				count={TOTAL_NUM_ITEM}
				href={`/detail/single/${ID}`}
				onClick={() => {
					setSubTitle(TITLE);
				}}
			/>
			<ul className={style.singleList}>
				{itemsWithStar.map((item: ITEM_INFO_TYPE) => (
					<li key={item.ID}>
						<SingleItem singleInfo={item}/>
					</li>
				))}
			</ul>
		</div>
	);
}
