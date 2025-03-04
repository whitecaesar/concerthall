import React, {useEffect, useState } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import SingleItem from "@/component/molecule/singleItem/SingleItem";
import style from "./singleList.module.css";
import {
  ITEM_INFO_TYPE,
  VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";
import { STAR_TRACK_LIST_RESPONSE_TYPE, TRACK_REG_ITEM_TYPE, TRACK_REG_REQUEST_TYPE, TRACK_REG_RESPONSE_ITEM_TYPE, getRegCheckListAxios, getStarTrackListAxios } from "@/services/contents/StarAxios";

interface SingleListProps {
  recommendList: VIEWALL_LIST_TYPE;
  showTitle: boolean;
  noScroll?: boolean;
}

export default function SingleList({
  recommendList
}: SingleListProps) {
  const [isFetch, setIsFetch] = useState<boolean>(false);

  useEffect(() => {
    fetchStarRatings();
  }, []);

  const fetchStarRatings = async () => {
		const RegTrackItem: TRACK_REG_ITEM_TYPE[] = [];

		const promises = recommendList.ITEM_INFO.map(async (track: ITEM_INFO_TYPE) => {
			const trackItem = {
				mediaType : "CONCERT_HALL",
				clientKey : track.ID,
			};
			RegTrackItem.push(trackItem);
		});

		await Promise.all(promises);

		const RegTrackParam: TRACK_REG_REQUEST_TYPE = {
			tracks: RegTrackItem
		};

		const regList = await getRegCheckListAxios(RegTrackParam);
		if(regList.code === '200')
		{
			const roseId: any[] = [];
			const promises = regList.tracks.map(async (track: TRACK_REG_RESPONSE_ITEM_TYPE) => {
				if(track.id)
				{
					roseId.push(track.id);
				}
				else{
					roseId.push(0);
				}
			});

			await Promise.all(promises);
			const StarParam: STAR_TRACK_LIST_RESPONSE_TYPE = {
				ids : roseId
			};

			const starList = await getStarTrackListAxios(StarParam);
			if (regList.code === '200' && starList && Array.isArray(starList.data)) {
				const promises = recommendList.ITEM_INFO.map(async (track: ITEM_INFO_TYPE) => {
					// 1. regList에서 track.ID와 일치하는 항목 찾기 (clientKey 기준)
					const regEntry = regList.tracks.find((entry: TRACK_REG_RESPONSE_ITEM_TYPE) => entry.clientKey === track.ID);
					// 2. regEntry의 id가 존재하면
					if (regEntry && regEntry.id) {
						// 3. starList.data에서 regEntry.id와 동일한 id를 가진 항목 찾기
						const starEntry = starList.data.find((item: any) => item.id === regEntry.id);
						// 4. 일치하는 항목이 있으면 해당 star 값을 할당, 없으면 0 할당
						if (starEntry) {
							track.STAR = starEntry.star;
						} else {
							track.STAR = 0;
						}
					} else {
						// regList에 일치하는 항목이 없거나 id가 null이면 바로 0 할당
						track.STAR = 0;
					}
				});
				await Promise.all(promises);
				setIsFetch(true);
			}
		}
	};

  return isFetch &&
    <div style={{ paddingBottom: "10px" }}>
      <ItemListTitle.ViewAll
        isPresent={false}
        text={recommendList.TITLE}
        count={recommendList.TOTAL_NUM_ITEM}
        href={`/detail/single/${recommendList.ID}?title=${encodeURIComponent(recommendList.TITLE)}`}
      />
      <ul className={style.singleList}>
        {recommendList.ITEM_INFO.map((item, index) => (
          <li key={item.ID}>
            <SingleItem
              singleInfo={item}
              trackListInfo={recommendList}
              position={index}
              star={item.STAR || 0}
            />
          </li>
        ))}
      </ul>
    </div>
}