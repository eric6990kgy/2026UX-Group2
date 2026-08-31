import React, { useState, useEffect } from 'react';
import { Search, Heart, Music, SearchCode } from 'lucide-react';
import { SongCard } from '../components/common/SongCard';
import { useLanguage } from '../hooks/useLanguage';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';
import { MOCK_SONGS } from '../mock/songs';
import type { Song } from '../types/song';

export function FavoritesPage() {
  const { favorites, toggle: toggleFavorite } = useFavorites();
  const { show } = useToast();
  const { t, language } = useLanguage();
  const [favoriteSongs, setFavoriteSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Collect songs matching the favorites ID list
    const filtered = MOCK_SONGS.filter((s) => favorites.includes(s.id));
    setFavoriteSongs(filtered);
  }, [favorites]);

  const handleRemoveFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(id);
    const targetSong = MOCK_SONGS.find((s) => s.id === id);
    if (language === 'zh') {
      show(`已將《${targetSong?.title || '此歌曲'}》從我的收藏移除`, 1500);
    } else {
      show(`Removed "${targetSong?.title || 'this song'}" from Favorites`, 1500);
    }
  };

  // Filter based on the local collection query on the page
  const displayedSongs = favoriteSongs.filter((song) => {
    const q = searchQuery.toLowerCase();
    return (
      song.title.toLowerCase().includes(q) ||
      song.artist.toLowerCase().includes(q)
    );
  });

  return (
    <div id="favorites-page-viewport" className="w-full flex flex-col gap-6 pb-4 animate-fade-in overflow-hidden">
      {/* 1. Page Title Header */}
      <h2 id="favorites-title" className="text-[22px] sm:text-2.5xl font-black text-ink tracking-wide px-1 flex items-center gap-2 select-none">
        <Heart className="w-7 h-7 text-red-500 fill-red-500 stroke-[2.5] shrink-0" />
        <span>{t('fav.title')}</span>
      </h2>

      {/* 2. Embedded Search box (With #EEF3F7 Background) */}
      <div id="collection-search-wrap" className="w-full relative">
        <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 text-ink-secondary w-5.5 h-5.5" />
        <input
          id="fav-search-input"
          type="text"
          placeholder={t('fav.search.placeholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full min-h-[52px] bg-[#EEF3F7] placeholder-ink-secondary/75 text-base sm:text-lg font-bold pl-12 pr-4 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 border-none transition-all leading-normal"
          aria-label={t('fav.search.aria')}
        />
      </div>

      {/* 3. Favorite lists */}
      <main className="flex flex-col gap-3.5 flex-1 w-full">
        {favoriteSongs.length === 0 ? (
          /* Empty collector state */
          <div className="text-center py-16 bg-white border border-warm-border/60 rounded-3xl flex flex-col items-center gap-4.5 p-6 animate-fade-in">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-primary border border-orange-200 shadow-sm">
              <Heart className="w-8 h-8 stroke-[2]" />
            </div>
            <div>
              <h3 className="text-xl font-black text-ink mb-1.5 leading-snug">
                {t('fav.empty.title')}
              </h3>
              <p className="text-sm font-bold text-ink-secondary leading-normal">
                {t('fav.empty.desc')}
              </p>
            </div>
            <div className="text-[17px] font-black text-primary mt-1 select-none flex items-center gap-1.5 leading-snug">
              <Music className="w-4.5 h-4.5 text-primary stroke-[2.5]" />
              <span>{t('fav.empty.continue')}</span>
            </div>
          </div>
        ) : displayedSongs.length === 0 ? (
          /* Query didn't match anything locally */
          <div className="text-center py-12 bg-white border border-warm-border/60 rounded-3xl p-5 flex flex-col items-center justify-center gap-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-ink-secondary">
              <SearchCode className="w-6 h-6 stroke-[2]" />
            </div>
            <p className="text-base font-bold text-ink-secondary leading-normal">
              {t('fav.search.empty')} "{searchQuery}"
            </p>
          </div>
        ) : (
          /* Render list elements */
          <div id="favorites-list" className="flex flex-col gap-3.5">
            {displayedSongs.map((song) => (
              <SongCard
                key={song.id}
                song={song}
                onRemove={handleRemoveFavorite}
              />
            ))}
          </div>
        )}
      </main>

      {/* Additional elder instructions */}
      {favoriteSongs.length > 0 && (
        <p className="text-center text-[15px] text-primary font-black mt-2 select-none flex justify-center items-center gap-1.5">
          <Music className="w-4 h-4 text-primary stroke-[2.5]" />
          <span>{t('fav.empty.continue')}</span>
        </p>
      )}
    </div>
  );
}

export default FavoritesPage;
