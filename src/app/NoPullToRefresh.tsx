// components/NoPullToRefresh.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from 'next/navigation';

export default function NoPullToRefresh() {
	const pathname = usePathname();
  
  useEffect(() => {
    // 페이지 로드 후 약간의 지연을 두고 스크롤을 1px 내림
    const timer = setTimeout(() => {
      window.scrollTo(0, 1);
    }, 10);
    
    // 스크롤 이벤트를 감지하여 최상단일 경우 1px 아래로 조정
    const handleScroll = () => {
      if (window.scrollY === 0) {
        // 최상단(0px)일 때 1px 아래로 스크롤
        window.scrollTo(0, 1);
      }
    };
    
    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // 터치 이벤트 종료 시에도 확인
    const handleTouchEnd = () => {
      setTimeout(() => {
        if (window.scrollY === 0) {
          window.scrollTo(0, 1);
        }
      }, 10);
    };
    
    // 터치 이벤트 리스너 등록
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // 컴포넌트 언마운트 시 이벤트 리스너와 타이머 정리
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pathname]); // 경로가 변경될 때마다 실행
  
  return null; // 이 컴포넌트는 UI를 렌더링하지 않음
}
