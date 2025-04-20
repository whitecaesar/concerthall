// 싱글 리스트에서 view All을 클릭했을 때 나오는 페이지.
//가로 스크롤 없이 해당 리스트의 컨텐츠들만 나열

import React, { useEffect, useState } from "react";
import SingleItem from "@/component/molecule/singleItem/SingleItem";
import style from "./singleList.module.css";
import {
	ITEM_INFO_TYPE,
	VIEWALL_LIST_TYPE,
} from "@/services/contents/ViewAllAxios";

interface SingleListViewAllProps {
	viewAllList: VIEWALL_LIST_TYPE;
}

export default function SingleListViewAll({
	viewAllList
}: SingleListViewAllProps) {

	const [isFetch, setIsFetch] = useState<boolean>(false);

  function addPropertyToItemInfo(id :string, propertyName:string, propertyValue:number) {
		const item = viewAllList.ITEM_INFO.find(item => item.ID === id);
		if (item) {
		// 속성 추가
			(item as any)[propertyName] = propertyValue;
		}
	}

	useEffect(() => {
    fetchStarRatings();
  }, []);

  const fetchStarRatings = async () => {
    viewAllList.ITEM_INFO.map(async (track :ITEM_INFO_TYPE) => {
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
	
	return (
		<div style={{ paddingBottom: "10px" }}>
			<ul className={`${style.singleList} ${style.noScroll}`}>
				{viewAllList.ITEM_INFO.map((item, index) => (
          <li key={item.ID}>

          </li>
        ))}
			</ul>
		</div>
	);
}
