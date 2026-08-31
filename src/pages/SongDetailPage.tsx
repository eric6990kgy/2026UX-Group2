import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Volume2 } from 'lucide-react';
import { SongHero } from '../components/song/SongHero';
import { ProgressBar } from '../components/common/ProgressBar';
import { FontSizeControl } from '../components/song/FontSizeControl';
import { LyricsBox } from '../components/song/LyricsBox';
import { SongActions } from '../components/song/SongActions';
import { songService } from '../services/songService';
import { useKTVPlayer } from '../hooks/useKTVPlayer';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';
import { useLanguage } from '../hooks/useLanguage';
import type { Song, LyricLine } from '../types/song';

export function SongDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { show } = useToast();
  const { isFavorited, toggle: toggleFavorite } = useFavorites();
  const { t, language } = useLanguage();

  const [song, setSong] = useState<Song | null>(null);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [autoScroll, setAutoScroll] = useState(true);

  // Load the song & lyric details
  useEffect(() => {
    async function loadData() {
      if (!id) return;
      const songData = await songService.getById(id);
      const lyricsData = await songService.getLyrics(id);
      
      if (songData) {
        setSong(songData);
      }
      if (lyricsData) {
        setLyrics(lyricsData);
      }
    }
    loadData();
  }, [id]);

  // Hook into our live synchronized playback engine
  const { isPlaying, currentLine, progress, toggle, seek } = useKTVPlayer(
    song?.duration ?? 200,
    lyrics.length
  );

  if (!song) {
    return (
      <div className="w-full max-w-[430px] min-h-screen bg-warm-bg flex flex-col items-center justify-center p-5 mx-auto animate-fade-in">
        <p className="text-xl font-bold text-ink-secondary text-center leading-normal">
          {language === 'zh' ? '正在努力載入歌曲中，請阿婆稍候...' : 'Loading song lyrics, please wait...'}
        </p>
      </div>
    );
  }

  const handleFavoriteClick = () => {
    toggleFavorite(song.id);
    const fav = isFavorited(song.id);
    if (!fav) {
      if (language === 'zh') {
        show(`已成功將《${song.title}》加入您的珍藏歌單！`, 2000);
      } else {
        show(`Added "${song.title}" to Favorites!`, 2000);
      }
    } else {
      if (language === 'zh') {
        show(`已將《${song.title}》從珍藏中移除`, 1500);
      } else {
        show(`Removed "${song.title}" from Favorites`, 1500);
      }
    }
  };

  const handleKTVClick = () => {
    navigate(`/ktv/${song.id}`, { state: { fromDetail: true } });
  };

  const handleSocialInviteClick = () => {
    navigate('/invite');
  };

  return (
    <div
      id="song-details-viewport"
      className="w-full max-w-[430px] min-h-screen bg-warm-bg flex flex-col p-5 pb-8 mx-auto shadow-2xl relative border-x border-warm-border/60 gap-5 animate-fade-in"
    >
      {/* 1. Page Header */}
      <header id="sdetail-header" className="flex items-center justify-between w-full select-none">
        <button
          id="btn-back-sdetail"
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 px-3 h-13 min-h-[52px] bg-white border border-warm-border hover:bg-orange-50 text-ink font-bold text-lg rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
        >
          <ChevronLeft className="w-5.5 h-5.5 stroke-[2.5]" />
          <span>{t('invite.back')}</span>
        </button>
        
        <div className="flex items-center gap-1 bg-primary/10 px-3.5 py-1.5 rounded-full border border-primary/20 text-primary shrink-0">
          <Volume2 className="w-4.5 h-4.5 animate-bounce shrink-0" />
          <span className="text-xs sm:text-sm font-black tracking-wider whitespace-nowrap">
            {language === 'zh' ? '原音導唱中' : 'Vocal Guide'}
          </span>
        </div>
      </header>

      {/* 2. Hero banner */}
      <SongHero
        song={song}
        isPlaying={isPlaying}
        onPlayToggle={toggle}
      />

      {/* 3. Drag-enabled Progress Bar */}
      <div id="playback-timeline-block" className="w-full bg-white p-3.5 rounded-2xl border border-warm-border shadow-sm">
        <ProgressBar
          progress={progress}
          duration={song.duration}
          onChange={seek}
        />
      </div>

      {/* 4. Font scale control board */}
      <FontSizeControl
        fontSize={fontSize}
        setFontSize={setFontSize}
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
      />

      {/* 5. Synchronized lyrics block */}
      <div id="song-lyrics-viewer" className="w-full flex flex-col gap-2">
        <h3 id="lyrics-section-title" className="text-sm sm:text-md font-black text-ink-secondary px-1 flex justify-between items-center flex-wrap gap-2">
          <span className="leading-snug">{t('detail.lyrics.auto')}</span>
          <span className="text-[11px] sm:text-[12px] bg-slate-200 text-slate-700 px-2.5 py-1 rounded-md font-bold select-none shrink-0">
            {t('detail.lyrics.count', { count: lyrics.length })}
          </span>
        </h3>
        <LyricsBox
          lyrics={lyrics}
          currentLineIndex={currentLine}
          fontSize={fontSize}
          autoScroll={autoScroll}
        />
      </div>

      {/* 6. Primary and secondary direct triggers */}
      <SongActions
        isFavorited={isFavorited(song.id)}
        onKTVStart={handleKTVClick}
        onSocialInvite={handleSocialInviteClick}
        onFavoriteToggle={handleFavoriteClick}
      />
    </div>
  );
}

export default SongDetailPage;
