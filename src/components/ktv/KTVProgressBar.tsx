import React from 'react';

interface KTVProgressBarProps {
  progress: number; // 0 - 100
  duration: number; // seconds
  onChange: (pct: number) => void;
}

export function KTVProgressBar({ progress, duration, onChange }: KTVProgressBarProps) {
  const currentSeconds = Math.floor((progress / 100) * duration);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const reSecs = secs % 60;
    return `${mins}:${reSecs.toString().padStart(2, '0')}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange(Number(e.target.value));
  };

  return (
    <div id="ktv-timeline-wrapper" className="w-[100%] flex flex-col gap-1.5 py-1">
      {/* Time Text Headers */}
      <div className="flex justify-between items-center text-xs font-bold text-slate-400 px-0.5">
        <span>{formatTime(currentSeconds)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      {/* Dark Styled Slide Tracks */}
      <div className="relative flex items-center w-full select-none">
        <input
          id="ktv-progress-slider"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleChange}
          className="w-full h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer focus:outline-none"
          style={{
            background: `linear-gradient(to right, #D96330 0%, #D96330 ${progress}%, #1E293B ${progress}%, #1E293B 100%)`,
          }}
          aria-label="KTV 歌曲進度"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          #ktv-progress-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #FFFFFF;
            border: 2px solid #D96330;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
            transition: transform 0.1s;
          }
          #ktv-progress-slider::-webkit-slider-thumb:active {
            transform: scale(1.3);
          }
          #ktv-progress-slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #FFFFFF;
            border: 2px solid #D96330;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
          }
        `}} />
      </div>
    </div>
  );
}

export default KTVProgressBar;
