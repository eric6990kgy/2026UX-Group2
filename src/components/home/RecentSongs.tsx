import { useEffect, useState } from 'react';
import { SongCard } from '../common/SongCard';
import { MOCK_SONGS } from '../../mock/songs';
import { Clock, Star } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import type { Song } from '../../types/song';

export function RecentSongs() {
  const [songs, setSongs] = useState<Song[]>([]);
  const { t } = useLanguage();

  useEffect(() => {
    // Return a curated short list for recent songs
    setSongs(MOCK_SONGS.slice(0, 3));
  }, []);

  return (
    <div id="recent-songs-section" className="w-full flex flex-col gap-4">
      {/* Header title */}
      <h3 id="recent-songs-title" className="text-[20px] font-black text-ink tracking-wide px-1 flex items-center gap-2">
        <Clock className="w-5.5 h-5.5 text-primary stroke-[2.5]" />
        <span>{t('recent.title')}</span>
      </h3>
      
      {/* List Container */}
      <div id="recent-songs-list" className="flex flex-col gap-3">
        {songs.map((song, index) => {
          // Add a custom recommended tag visually for specific rows
          const isSpecialRecommended = index === 1;
          
          return (
            <div id={`recent-song-${song.id}`} key={song.id} className="relative group">
              {isSpecialRecommended && (
                <div
                  id={`recommend-tag-${song.id}`}
                  className="absolute -top-2.5 left-4 z-10 bg-gradient-to-r from-amber-500 to-primary text-white text-xs font-black px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1 tracking-wider border border-white"
                >
                  <Star className="w-3 h-3 fill-white text-white" />
                  <span>{t('recent.tag')}</span>
                </div>
              )}
              <SongCard song={song} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RecentSongs;
