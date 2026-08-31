import { useState, useEffect, useCallback, useRef } from 'react';

export function useKTVPlayer(songDuration: number = 200, lyricsCount: number = 10) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLine, setCurrentLine] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toggle = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const setLine = useCallback((line: number) => {
    const boundLine = Math.min(lyricsCount - 1, Math.max(0, line));
    setCurrentLine(boundLine);
    const elSeconds = boundLine * 2.2;
    setProgress(Math.min(100, (elSeconds / songDuration) * 100));
  }, [lyricsCount, songDuration]);

  const seek = useCallback((pct: number) => {
    const boundPct = Math.min(100, Math.max(0, pct));
    setProgress(boundPct);
    
    // Find estimated current lyric line
    const estimatedSecond = (boundPct / 100) * songDuration;
    // Estimated line based on 2.2s per line
    const estimatedLine = Math.min(lyricsCount - 1, Math.floor(estimatedSecond / 2.2));
    setCurrentLine(Math.max(0, estimatedLine));
  }, [songDuration, lyricsCount]);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentLine(prev => {
          const next = prev + 1;
          if (next >= lyricsCount) {
            setIsPlaying(false);
            setProgress(100);
            return prev; // keep on last
          }
          // Increment progress
          const elSeconds = next * 2.2;
          const newPct = Math.min(100, (elSeconds / songDuration) * 100);
          setProgress(newPct);
          return next;
        });
      }, 2200);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, lyricsCount, songDuration]);

  return {
    isPlaying,
    setIsPlaying,
    currentLine,
    setCurrentLine: setLine,
    progress,
    setProgress,
    toggle,
    seek,
  };
}
