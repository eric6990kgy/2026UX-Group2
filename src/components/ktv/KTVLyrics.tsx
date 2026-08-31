import { useEffect, useRef } from 'react';
import type { LyricLine } from '../../types/song';

interface KTVLyricsProps {
  lyrics: LyricLine[];
  currentLineIndex: number;
}

export function KTVLyrics({ lyrics, currentLineIndex }: KTVLyricsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const activeRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeRowRef.current && scrollContainerRef.current) {
      activeRowRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentLineIndex]);

  return (
    <div
      id="ktv-lyrics-viewport"
      ref={scrollContainerRef}
      className="w-[100%] h-[260px] overflow-y-auto no-scrollbar py-6 flex flex-col gap-6 text-center select-none"
    >
      {lyrics.length === 0 ? (
        <div className="text-slate-400 font-bold text-xl py-12">
          正在載入 KTV 歌詞，請隨時開唱...
        </div>
      ) : (
        lyrics.map((line, index) => {
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
              id={`ktv-lyric-${index}`}
              key={line.id}
              ref={isActive ? activeRowRef : null}
              className={`py-1.5 px-4 font-black transition-all duration-300 transform rounded-xl ${
                isActive
                  ? 'text-ktv-accent text-[28px] scale-110'
                  : isPast
                  ? 'text-white/15 text-[22px]'
                  : 'text-white/35 text-[22px]'
              }`}
              style={{
                textShadow: isActive ? '0 0 16px rgba(245, 166, 35, 0.6)' : 'none',
              }}
            >
              {line.text}
            </div>
          );
        })
      )}
    </div>
  );
}

export default KTVLyrics;
