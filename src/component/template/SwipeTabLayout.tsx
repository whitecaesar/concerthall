'use client';

import React, { ReactNode } from 'react';
import MainNavSwipe from '../molecule/navigation/MainNavSwipe';

interface SwipeTabLayoutProps {
  children: ReactNode;
}

export default function SwipeTabLayout({ children }: SwipeTabLayoutProps) {
  return (
    <div className="swipe-layout-container">
      <MainNavSwipe />
      <div className="swipe-content">
        {children}
      </div>

      <style jsx>{`
        .swipe-layout-container {
          display: flex;
          flex-direction: column;
          height: calc(100vh - 55px); /* Header의 높이를 고려 */
          overflow: hidden;
        }
        .swipe-content {
          flex: 1;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}