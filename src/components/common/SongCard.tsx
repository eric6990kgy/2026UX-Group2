import React from 'react';
import { Play, X, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import type { Song } from '../../types/song';

interface SongCardProps {
  key?: string | number;
  song: Song;
  onRemove?: (id: string, e: React.MouseEvent) => void;
  showSimilarity?: boolean;
}

export function SongCard({ song, onRemove, showSimilarity = false }: SongCardProps) {
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const handleCardClick = () => {
    navigate(`/song/${song.id}`);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/song/${song.id}`);
  };

  return (
    <div
      id={`song-card-${song.id}`}
      onClick={handleCardClick}
      className="flex items-center gap-3 bg-white p-4 rounded-2xl border-2 border-warm-border/60 hover:border-primary/40 active:bg-orange-50/40 transition-all shadow-sm cursor-pointer min-h-[88px] w-full min-w-0"
    >
      {/* Retro Vinyl Record Cover */}
      <div
        id={`cover-vinyl-${song.id}`}
        className="relative w-15 h-15 rounded-full bg-slate-100 flex items-center justify-center shrink-0 shadow border-[3px] border-slate-700/80 overflow-hidden select-none"
      >
        {/* Retro Groves */}
        <div className="absolute inset-1 rounded-full border border-slate-800/60 pointer-events-none"></div>
        <div className="absolute inset-2.5 rounded-full border border-slate-800/40 pointer-events-none"></div>
        <div className="absolute inset-4 rounded-full border border-slate-800/20 pointer-events-none"></div>
        {/* Center label with subtle gradient of the song */}
        <div className={`absolute w-7 h-7 rounded-full bg-gradient-to-br ${song.coverGradient} flex items-center justify-center z-10 border border-slate-900 shadow-inner`}>
          <Music className="w-4 h-4 text-white fill-white/10" />
        </div>
      </div>

      {/* Info Block */}
      <div id={`info-block-${song.id}`} className="flex-1 min-w-0 flex flex-col justify-center">
        <h3 className="text-[19px] font-black text-ink truncate leading-tight mb-1">
          {song.title}
        </h3>
        
        <div className="flex flex-wrap items-center gap-x-1.5 text-sm font-bold text-ink-secondary">
          <span className="truncate">{song.artist}</span>
          <span className="shrink-0">•</span>
          <span className="shrink-0">{language === 'zh' ? `${song.year}年` : song.year}</span>
        </div>

        {/* Dynamic Voice Match Badge (No AI slop jargon) */}
        {showSimilarity && song.similarity !== undefined && (
          <div className="flex items-center gap-x-1.5 mt-1.5 text-[14px] font-black text-social">
            <span className="w-2.5 h-2.5 rounded-full bg-social inline-block animate-pulse shrink-0"></span>
            <span>{t('song.similarity')} {song.similarity}%</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div id={`actions-block-${song.id}`} className="flex items-center gap-2 max-h-[52px] shrink-0">
        {/* Play Button */}
        <button
          id={`play-btn-${song.id}`}
          onClick={handlePlayClick}
          className="w-13 h-13 min-h-[52px] rounded-full bg-primary flex items-center justify-center text-white active:bg-primary-dark transition-colors shadow-md cursor-pointer hover:scale-105 animate-fade-in"
          aria-label={language === 'zh' ? `播放 ${song.title}` : `Play ${song.title}`}
        >
          <Play className="w-6 h-6 fill-white ml-0.5" />
        </button>

        {/* Optional Remove Button for Favorites */}
        {onRemove && (
          <button
            id={`remove-btn-${song.id}`}
            onClick={(e) => onRemove(song.id, e)}
            className="w-11 h-11 min-h-[44px] rounded-full bg-rose-50 border-2 border-rose-200 text-rose-600 flex items-center justify-center hover:bg-rose-100 active:bg-rose-200 transition-colors cursor-pointer"
            aria-label={language === 'zh' ? `移除 ${song.title}` : `Remove ${song.title}`}
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SongCard;
