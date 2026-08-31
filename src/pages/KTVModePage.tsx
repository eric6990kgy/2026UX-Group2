import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { KTVFriendStrip } from '../components/ktv/KTVFriendStrip';
import { KTVLyrics } from '../components/ktv/KTVLyrics';
import { KTVProgressBar } from '../components/ktv/KTVProgressBar';
import { KTVControls } from '../components/ktv/KTVControls';
import { songService } from '../services/songService';
import { useKTVPlayer } from '../hooks/useKTVPlayer';
import { useToast } from '../hooks/useToast';
import { useLanguage } from '../hooks/useLanguage';
import { Toast } from '../components/common/Toast';
import { MOCK_SONGS } from '../mock/songs';
import type { Song, LyricLine } from '../types/song';

export function KTVModePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { show } = useToast();
  const { t, language } = useLanguage();

  const [song, setSong] = useState<Song | null>(null);
  const [lyrics, setLyrics] = useState<LyricLine[]>([]);

  // Find song position in mock list to facilitate standard previous & next buttons
  const songList = MOCK_SONGS;
  const currentIndex = songList.findIndex((s) => s.id === id);

  useEffect(() => {
    async function loadKTVData() {
      if (!id) return;
      const songData = await songService.getById(id);
      const lyricsData = await songService.getLyrics(id);
      
      if (songData) {
        setSong(songData);
      } else {
        // Fallback to first if not found
        setSong(songList[0]);
      }
      
      if (lyricsData && lyricsData.length > 0) {
        setLyrics(lyricsData);
      } else {
        // Keep a neat generic lyrics filler
        setLyrics([
          { id: 1, text: '第一句：好歌開場，長輩開懷唱！', startTime: 0, status: 'upcoming' },
          { id: 2, text: '第二句：大字高亮，字句看得清！', startTime: 8, status: 'upcoming' },
          { id: 3, text: '第三句：不打錯字，語音好幫手！', startTime: 16, status: 'upcoming' },
          { id: 4, text: '第四句：攜手合唱，生活更明亮！', startTime: 24, status: 'upcoming' },
        ]);
      }
    }
    loadKTVData();
  }, [id, songList]);

  // Launch timing player
  const { isPlaying, setIsPlaying, currentLine, setCurrentLine, progress, toggle, seek } = useKTVPlayer(
    song?.duration ?? 200,
    lyrics.length
  );

  useEffect(() => {
    // Show a polite helper prompt when arriving
    if (song) {
      show(t('ktv.toast.enter', { title: song.title }), 2200);
    }
  }, [song, show, t]);

  if (!song) {
    return (
      <div className="w-full max-w-[430px] min-h-screen bg-ktv-bg flex items-center justify-center p-5 mx-auto animate-fade-in">
        <span className="text-xl font-bold text-slate-400">
          {language === 'zh' ? '進入伴奏房中...' : 'Entering room...'}
        </span>
      </div>
    );
  }

  // Handle previous track selection
  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + songList.length) % songList.length;
    setIsPlaying(false);
    navigate(`/ktv/${songList[prevIdx].id}`);
  };

  // Handle next track selection
  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % songList.length;
    setIsPlaying(false);
    navigate(`/ktv/${songList[nextIdx].id}`);
  };

  // Handle exit session
  const handleExit = () => {
    setIsPlaying(false);
    if (location.state?.fromDetail) {
      navigate(-1);
    } else {
      navigate(`/song/${song.id}`, { replace: true });
    }
  };

  const handleSocialInvite = () => {
    navigate('/invite');
  };

  return (
    <div
      id="ktv-singing-room"
      className="w-full max-w-[430px] min-h-screen bg-gradient-to-b from-ktv-bg to-state-950 text-white flex flex-col justify-between p-5 pb-8 mx-auto shadow-2xl relative border-x border-slate-900 overflow-hidden animate-fade-in"
    >
      {/* 1. Header (Touch target >= 52px) */}
      <header id="ktv-header" className="flex items-center justify-between w-full py-2">
        <button
          id="btn-back-ktv"
          onClick={handleExit}
          className="flex items-center gap-1.5 px-4 h-13 min-h-[52px] bg-slate-800/60 border border-slate-700/60 hover:bg-slate-700 hover:text-white rounded-xl text-slate-200 font-bold text-lg select-none cursor-pointer"
        >
          <ChevronLeft className="w-5.5 h-5.5 stroke-[2.5]" />
          <span>{t('invite.back')}</span>
        </button>

        <div className="flex items-center gap-1.5 bg-orange-500/20 px-4 py-1.5 rounded-full border border-orange-400/40 text-orange-400">
          <Sparkles className="w-4.5 h-4.5 animate-pulse" />
          <span className="text-[14px] font-black uppercase tracking-wider">
            {t('ktv.tag')}
          </span>
        </div>
      </header>

      {/* 2. Singer Details Box */}
      <div id="ktv-ambient-info" className="text-center w-full my-3">
        <h2 id="ktv-song-title" className="text-[25px] font-black text-white leading-tight mb-1">
          {song.title}
        </h2>
        <p id="ktv-song-artist" className="text-[15px] text-slate-400 font-bold">
          {language === 'zh' ? `原唱：${song.artist} • 傳唱經典` : `Singer: ${song.artist} • Retro Classic`}
        </p>
      </div>

      {/* 3. Friend strip announcement */}
      <KTVFriendStrip />

      {/* 4. Giant glowing lyrics layout */}
      <div id="ktv-screen-middle" className="flex-1 flex items-center justify-center w-full py-4">
        <KTVLyrics
          lyrics={lyrics}
          currentLineIndex={currentLine}
        />
      </div>

      {/* 5. Timelines & Player Controllers */}
      <div id="ktv-footer-blocks" className="w-full flex flex-col gap-4">
        <KTVProgressBar
          progress={progress}
          duration={song.duration}
          onChange={seek}
        />

        <KTVControls
          isPlaying={isPlaying}
          onPlayToggle={toggle}
          onPrev={handlePrev}
          onNext={handleNext}
          onExit={handleExit}
          onSocialInvite={handleSocialInvite}
        />
      </div>

      {/* Toast box floating inside KTV room */}
      <Toast />
    </div>
  );
}

export default KTVModePage;
