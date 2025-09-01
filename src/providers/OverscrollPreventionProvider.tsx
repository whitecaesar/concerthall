'use client';

import { useEffect } from 'react';

// 수평 스크롤 새로고침 방지를 위한 Provider 컴포넌트
export default function OverscrollPreventionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    
    // 터치 시작 시 위치 기록
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].screenX;
      startY = e.touches[0].screenY;
    };
    
    // 터치 이동 시 처리
    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches || e.touches.length === 0) return;
      
      const moveX = e.touches[0].screenX - startX;
      const moveY = e.touches[0].screenY - startY;
      
      // 수평 스크롤이 수직 스크롤보다 크고, 오른쪽에서 왼쪽으로 스와이프하는 경우
      // 또는 왼쪽에서 오른쪽으로 과도하게 스와이프하는 경우
      if (Math.abs(moveX) > Math.abs(moveY) && 
         (moveX < -10 || moveX > 30)) {
        e.preventDefault();
      }
    };
    
    // 이벤트 리스너 등록
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);
  
  return <>{children}</>;
}