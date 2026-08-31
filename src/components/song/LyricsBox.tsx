import { useEffect, useRef } from 'react';
import type { LyricLine } from '../../types/song';

interface LyricsBoxProps {
  lyrics: LyricLine[];
  currentLineIndex: number;
  fontSize: 'small' | 'medium' | 'large';
  autoScroll: boolean;
}

export function LyricsBox({ lyrics, currentLineIndex, fontSize, autoScroll }: LyricsBoxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && activeLineRef.current && containerRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest'
      });
    }
  }, [currentLineIndex, autoScroll]);

  // Map font classes for readability (senior-friendly)
  const fontSizes = {
    small: 'text-[18px]',
    medium: 'text-[22px]',
    large: 'text-[26px]',
  };

  return (
    <div
      id="lyrics-scroll-box"
      ref={containerRef}
      className="w-full bg-slate-50 border-2 border-warm-border/60 rounded-3xl p-5 overflow-y-auto max-h-[220px] no-scrollbar flex flex-col gap-4 text-center select-none"
    >
      {lyrics.length === 0 ? (
        <div className="py-12 text-ink-secondary font-bold text-lg">
          正在準備歌詞，阿婆請稍等...
        </div>
      ) : (
        lyrics.map((line, index) => {
          // Status evaluation
          let status: 'past' | 'active' | 'upcoming' = 'upcoming';
          if (index < currentLineIndex) {
            status = 'past';
          } else if (index === currentLineIndex) {
            status = 'active';
          }

          const isActive = status === 'active';
          const isPast = status === 'past';

          return (
            <div
              id={`lyric-line-${index}`}
              key={line.id}
              ref={isActive ? activeLineRef : null}
              className={`py-2 px-3.5 rounded-2xl transition-all duration-300 transform font-black leading-tight ${
                fontSizes[fontSize]
              } ${
                isActive
                  ? 'bg-orange-100 text-primary scale-105 shadow-sm border border-primary/20'
                  : isPast
                  ? 'text-ink-secondary/35'
                  : 'text-ink'
              }`}
            >
              {line.text}
            </div>
          );
        })
      )}
    </div>
  );
}

export default LyricsBox;
