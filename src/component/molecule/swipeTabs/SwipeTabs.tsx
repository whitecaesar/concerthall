'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRouter } from 'next/navigation';
import 'swiper/css';

// 탭 아이템 타입 정의
export interface TabItem {
  id: string;
  name: string;
  path: string;
}

interface SwipeTabsProps {
  tabs: TabItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// 스와이프 가능한 탭 컴포넌트
const SwipeTabs: React.FC<SwipeTabsProps> = ({ tabs, activeTab, setActiveTab }) => {
  const router = useRouter();
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // 활성 탭이 변경되면 스와이퍼 인덱스 업데이트
  useEffect(() => {
    if (swiperInstance) {
      const newIndex = tabs.findIndex(tab => tab.id === activeTab);
      if (newIndex !== -1 && newIndex !== activeIndex) {
        swiperInstance.slideTo(newIndex);
        setActiveIndex(newIndex);
      }
    }
  }, [activeTab, tabs, swiperInstance, activeIndex]);

  // 탭 클릭 핸들러
  const handleTabClick = (tab: TabItem, index: number) => {
    setActiveTab(tab.id);
    if (swiperInstance && index !== activeIndex) {
      swiperInstance.slideTo(index);
    }
    router.push(tab.path);
  };

  return (
    <div className="swipe-tabs-container">
      {/* 탭 버튼 영역 */}
      <div className="tab-buttons">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab, index)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      
      {/* 스와이퍼 영역 */}
      <Swiper
        onSwiper={setSwiperInstance}
        slidesPerView={1}
        onSlideChange={(swiper) => {
          const newIndex = swiper.activeIndex;
          setActiveIndex(newIndex);
          setActiveTab(tabs[newIndex].id);
          router.push(tabs[newIndex].path);
        }}
        className="tab-swiper"
      >
        {tabs.map((tab) => (
          <SwiperSlide key={tab.id} className="tab-slide">
            <div className="slide-content">
              {/* 탭 컨텐츠를 여기에 넣을 수 있습니다 */}
              <div id={`content-${tab.id}`}></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx>{`
        .swipe-tabs-container {
          width: 100%;
          overflow: hidden;
        }
        .tab-buttons {
          display: flex;
          justify-content: space-around;
          border-bottom: 1px solid #242424;
          margin-bottom: 10px;
        }
        .tab-button {
          padding: 10px 15px;
          background: transparent;
          border: none;
          color: #fff;
          font-size: 14px;
          cursor: pointer;
          position: relative;
        }
        .tab-button.active {
          color: var(--mainColor);
        }
        .tab-button.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--mainColor);
        }
      `}</style>
      <style jsx global>{`
        .tab-swiper {
          width: 100%;
          height: calc(100vh - 120px);
        }
        .tab-slide {
          height: 100%;
          overflow-y: auto;
        }
        .slide-content {
          padding: 0 15px;
        }
      `}</style>
    </div>
  );
};

export default SwipeTabs;