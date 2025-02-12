import React, {useEffect, useState } from "react";
import ItemListTitle from "@/component/molecule/itemListTitle/ItemListTitle";
import SingleItem from "@/component/molecule/singleItem/SingleItem";
import style from "./singleList.module.css";
import {
  ITEM_INFO_TYPE,
  VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";
import { STAR_REQUEST_ITEM_TYPE, STAR_REQUEST_TYPE, STAR_TRACK_REQUEST_TYPE, getStarAxios, getStarTrackAxios } from "@/services/contents/StarAxios";

interface SingleListProps {
  recommendList: VIEWALL_LIST_TYPE;
  showTitle: boolean;
  noScroll?: boolean;
}

export default function SingleList({
  recommendList
}: SingleListProps) {
  const [isFetch, setIsFetch] = useState<boolean>(false);

  function addPropertyToItemInfo(id :string, propertyName:string, propertyValue:number) {
		const item = recommendList.ITEM_INFO.find(item => item.ID === id);
		if (item) {
		// 속성 추가
			(item as any)[propertyName] = propertyValue;
		}
	}

  useEffect(() => {
    fetchStarRatings();
  }, []);

  const fetchStarRatings = async () => {
    recommendList.ITEM_INFO.map(async (track :ITEM_INFO_TYPE) => {
    try {
      /*
      const starTrackParam: STAR_TRACK_REQUEST_TYPE = {
        tracks: [{ type: 'CONCERT_HALL', clientKey: track.ID }]
      };
      const trackStarResponse = await getStarTrackAxios(starTrackParam);

      if (trackStarResponse.id !== null) {
          const contentParam: STAR_REQUEST_ITEM_TYPE[] = [{
          id: trackStarResponse.id,
          clientKey: track.ID
        }];
        const params: STAR_REQUEST_TYPE = {
          contents: contentParam,
          mediaType: 'CONCERT_HALL'
        };
        const response = await getStarAxios('TRACK', params);
        addPropertyToItemInfo(track.ID, 'STAR', response.code === '200' ? response.contents[0].star: 0);
      } else {
        addPropertyToItemInfo(track.ID, 'STAR', 0);
      }*/
      setIsFetch(true);
    } catch (error) {
    console.error('Error fetching star rating', error);
      addPropertyToItemInfo(track.ID, 'STAR', 0);
    }
      });
  };

  return isFetch &&
    <div style={{ paddingBottom: "10px" }}>
      <ItemListTitle.ViewAll
        isPresent={true}
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