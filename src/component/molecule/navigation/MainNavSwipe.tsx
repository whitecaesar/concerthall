'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import SwipeTabs, { TabItem } from '../swipeTabs/SwipeTabs';
import { getCookie } from '@/services/common';
import { texts } from './MainNav';

export default function MainNavSwipe() {
  const pathname = usePathname();
  const router = useRouter();

  const [home, setHome] = useState<string>(texts.en.home);
  const [explore, setExplore] = useState<string>(texts.en.explore);
  const [my, setMy] = useState<string>(texts.en.my);
  
  const [activeTab, setActiveTab] = useState<string>('main');

  // 언어 설정에 따른 텍스트 업데이트
  useEffect(() => {
    const lang = getCookie('lang') || 'en';
    setHome(texts[lang]?.home || texts.en.home);
    setExplore(texts[lang]?.explore || texts.en.explore);
    setMy(texts[lang]?.my || texts.en.my);
  }, []);

  // 현재 경로에 따른 활성 탭 설정
  useEffect(() => {
    if (pathname.startsWith('/main')) {
      setActiveTab('main');
    } else if (pathname.startsWith('/explore')) {
      setActiveTab('explore');
    } else if (pathname.startsWith('/my')) {
      setActiveTab('my');
    }
  }, [pathname]);

  // 탭 정의
  const tabs: TabItem[] = [
    { id: 'main', name: home, path: '/main' },
    { id: 'explore', name: explore, path: '/explore' },
    { id: 'my', name: my, path: '/my' }
  ];

  return (
    <SwipeTabs 
      tabs={tabs} 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
    />
  );
}