import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CategoryList } from '../components/browse/CategoryList';
import { SingerGrid } from '../components/browse/SingerGrid';
import { useLanguage } from '../hooks/useLanguage';
import { Music } from 'lucide-react';
import type { Singer } from '../types/singer';

export function BrowsePage() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [isSearching, setIsSearching] = useState(false);
  const [searchTarget, setSearchTarget] = useState('');

  const handleSelectCategory = (category: 'all' | 'popular' | 'nostalgic' | 'ai') => {
    // Show a loading feedback overlay tailored for elder users
    let title = '';
    if (category === 'popular') title = t('browse.cat.popular');
    else if (category === 'nostalgic') title = t('browse.cat.nostalgic');
    else if (category === 'ai') title = t('browse.cat.ai');
    else title = language === 'zh' ? '全體好歌庫' : 'All Classics';

    setSearchTarget(title);
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      navigate(`/search-results?category=${category}&from=browse`);
    }, 850);
  };

  const handleSelectSinger = (singer: Singer | null) => {
    if (!singer) return;
    setSearchTarget(singer.name);
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      navigate(`/search-results?singer=${encodeURIComponent(singer.name)}&from=browse`);
    }, 850);
  };

  return (
    <div id="browse-page-viewport" className="w-full flex flex-col gap-6 pb-4 animate-fade-in overflow-hidden relative">
      {/* Search overlay loader for seniors */}
      {isSearching && (
        <div className="fixed inset-0 bg-[#FFFDFB]/95 z-50 flex flex-col items-center justify-center p-6 text-center animate-fade-in select-none">
          <div className="relative flex items-center justify-center mb-8">
            <div className="w-24 h-24 rounded-full border-[5px] border-primary/25 border-t-primary animate-spin" />
            <span className="absolute text-4xl">🎵</span>
          </div>
          
          <h3 className="text-[26px] font-black text-ink mb-4 tracking-wide">
            {language === 'zh' ? '樂聲伴唱 KTV' : 'LeSheng KTV'}
          </h3>
          
          <div className="flex flex-col gap-2 bg-primary/5 border-2 border-primary/20 p-5 rounded-[2.5rem] max-w-[320px] shadow-sm">
            <span className="text-[15px] font-bold text-ink-secondary leading-none">
              {language === 'zh' ? '正在為您熱切搜尋' : 'Searching for you'}
            </span>
            <span className="text-[22px] font-black text-primary leading-tight">
              「{searchTarget}」的好歌
            </span>
          </div>
          
          <p className="text-sm font-bold text-ink-secondary mt-12 animate-pulse">
            {language === 'zh' ? '正在比對經典曲庫，馬上就好喔！' : 'Matching from classic database, please wait...'}
          </p>
        </div>
      )}

      {/* 1. Page Header Title */}
      <h2 id="browse-page-title" className="text-[22px] sm:text-2.5xl font-black text-ink tracking-wide px-1 flex items-center gap-2 select-none">
        <Music className="w-7 h-7 text-primary stroke-[2.5] shrink-0" />
        <span>{t('browse.title')}</span>
      </h2>

      {/* 2. Horizontal Category Panels */}
      <CategoryList
        activeCategory="all"
        onSelectCategory={handleSelectCategory}
      />

      {/* 3. Three Column Singers grid */}
      <SingerGrid
        selectedSingerId={null}
        onSelectSinger={handleSelectSinger}
      />
    </div>
  );
}

export default BrowsePage;
