import { Play, Pause } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import type { Song } from '../../types/song';

interface SongHeroProps {
  song: Song;
  isPlaying: boolean;
  onPlayToggle: () => void;
}

export function SongHero({ song, isPlaying, onPlayToggle }: SongHeroProps) {
  const { language } = useLanguage();

  return (
    <div
      id="song-hero-banner"
      className={`relative w-full bg-slate-900 overflow-hidden rounded-[2rem] p-6 text-white flex flex-col items-center justify-center border-2 border-slate-800 shadow-md min-h-[300px]`}
    >
      {/* Background ambient gradient blur */}
      <div className={`absolute inset-0 bg-gradient-to-br ${song.coverGradient} opacity-20 filter blur-xl`} />

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Rotating Retro Vinyl Record Artwork */}
        <div
          id="hero-vinyl-cover"
          style={isPlaying ? { animation: 'spin 12s linear infinite' } : {}}
          className="relative w-[130px] h-[130px] rounded-full bg-slate-950 flex items-center justify-center shadow-2xl border-4 border-slate-700/80 mb-5 select-none transition-transform duration-500 hover:scale-105"
        >
          {/* Retro Grooves */}
          <div className="absolute inset-2 rounded-full border border-slate-900/45 pointer-events-none"></div>
          <div className="absolute inset-5 rounded-full border border-slate-900/35 pointer-events-none"></div>
          <div className="absolute inset-8 rounded-full border border-slate-900/25 pointer-events-none"></div>
          <div className="absolute inset-11 rounded-full border border-slate-900/15 pointer-events-none"></div>
          
          {/* Colorful Center Sticker Label */}
          <div className={`absolute w-15 h-15 rounded-full bg-gradient-to-br ${song.coverGradient} flex items-center justify-center text-3.5xl border-[3px] border-slate-950 shadow-inner z-10 animate-fade-in`}>
            {song.cover}
          </div>
        </div>

        {/* Name and Artist text details */}
        <h2 id="hero-song-title" className="text-2.5xl font-black mb-1.5 tracking-wide text-white leading-tight">
          {song.title}
        </h2>
        <p id="hero-song-artist" className="text-base text-slate-300 font-bold mb-6">
          {song.artist} • {language === 'zh' ? `${song.year}年 經典金曲` : `${song.year} Classic Hit`}
        </p>

        {/* Giant Circle Play Controls Button */}
        <button
          id="hero-playback-trigger"
          onClick={onPlayToggle}
          className="w-[72px] h-[72px] min-h-[72px] rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center transition-transform hover:scale-110 active:scale-95 shadow-xl cursor-pointer"
          aria-label={isPlaying ? (language === 'zh' ? '暫停播放' : 'Pause Playback') : (language === 'zh' ? '開始播放' : 'Start Playback')}
        >
          {isPlaying ? (
            <Pause className="w-10 h-10 fill-white stroke-white" />
          ) : (
            <Play className="w-10 h-10 fill-white stroke-white ml-1.5" />
          )}
        </button>
      </div>
    </div>
  );
}

export default SongHero;
