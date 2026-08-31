import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { VoiceCTA } from '../components/home/VoiceCTA';
import { QuickGrid } from '../components/home/QuickGrid';
import { SocialBanner } from '../components/home/SocialBanner';
import { RecentSongs } from '../components/home/RecentSongs';
import { Avatar } from '../components/common/Avatar';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from '../hooks/useToast';
import { MOCK_USER } from '../mock/user';

export function HomePage() {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const { show } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      show(language === 'zh' ? '請輸入歌名或歌詞片段！' : 'Please enter song name or keywords!', 2000);
      return;
    }
    navigate(`/search-results?q=${encodeURIComponent(searchQuery)}`);
  };

  return (
    <div id="home-view-container" className="flex flex-col gap-6 w-full animate-fade-in pb-4">
      {/* 1. Senior Greeting Header */}
      <header id="greeting-header" className="flex items-center justify-between bg-white px-5 py-4 rounded-[2rem] border border-warm-border/50 shadow-sm min-h-[72px]">
        <div className="flex flex-col flex-1 min-w-0 pr-2">
          <span className="text-xl font-black text-ink tracking-wide leading-snug">
            {language === 'zh' ? '吃飽沒？美娟' : 'Eaten yet? Mei-juan'}
          </span>
          <span className="text-xs font-bold text-ink-secondary mt-0.5 leading-tight">
            {t('home.subtitle')}
          </span>
        </div>
        
        {/* Avatar */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Avatar name={MOCK_USER.displayName} size="md" />
        </div>
      </header>

      {/* 2. Senior-friendly Keyboard/Text Search Card */}
      <section id="manual-text-search-section" className="bg-white p-5 rounded-[2rem] border border-warm-border/50 shadow-sm flex flex-col gap-4">
        <div className="flex flex-col min-w-0">
          <span className="text-[17px] sm:text-[19px] font-black text-ink flex items-center gap-2">
            <span className="p-1 rounded-lg bg-orange-100 text-primary text-xl">⌨️</span>
            <span>{t('voice.manual.title')}</span>
          </span>
          <span className="text-xs font-bold text-ink-secondary mt-1 leading-snug">
            {t('voice.manual.desc')}
          </span>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <input
            id="home-text-search-input"
            type="text"
            placeholder={t('voice.manual.placeholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-13 min-h-[52px] bg-slate-50 border-2 border-warm-border focus:border-primary text-base sm:text-lg font-black text-ink pl-5 pr-14 rounded-full outline-none placeholder-ink-secondary/50 transition-all"
          />
          <button
            id="btn-home-search-submit"
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10.5 h-10.5 rounded-full bg-primary hover:bg-primary-dark active:scale-[0.93] text-white flex items-center justify-center transition-all cursor-pointer shadow-md hover:shadow-lg active:bg-orange-600"
            aria-label={t('voice.manual.button')}
          >
            <Search className="w-5 h-5 stroke-[2.5]" />
          </button>
        </form>
      </section>

      {/* 3. Full-scale voice control card (Primary Action - 1/3 layout) */}
      <VoiceCTA />

      {/* 3. Community Livestream box */}
      <SocialBanner />

      {/* 4. Directory Quick Links */}
      <QuickGrid />

      {/* 5. Historical / Recommended songs */}
      <RecentSongs />
    </div>
  );
}

export default HomePage;
