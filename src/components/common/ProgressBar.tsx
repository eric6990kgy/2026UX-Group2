import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 - 100
  duration: number; // in seconds
  onChange: (pct: number) => void;
  dark?: boolean;
}

export function ProgressBar({ progress, duration, onChange, dark = false }: ProgressBarProps) {
  const currentSeconds = Math.floor((progress / 100) * duration);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    onChange(Number(e.target.value));
  };

  return (
    <div id="progress-bar-container" className="w-full flex flex-col gap-2 py-2">
      {/* Time Text Labels */}
      <div className="flex justify-between items-center px-1">
        <span className={`text-sm font-medium ${dark ? 'text-blue-300' : 'text-ink-secondary'}`}>
          {formatTime(currentSeconds)}
        </span>
        <span className={`text-sm font-medium ${dark ? 'text-blue-300' : 'text-ink-secondary'}`}>
          {formatTime(duration)}
        </span>
      </div>

      {/* Slide Track */}
      <div className="relative flex items-center w-full group select-none">
        <input
          id="music-progress-slider"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSliderChange}
          className="w-full h-2 rounded-full appearance-none cursor-pointer focus:outline-none transition-all"
          style={{
            background: `linear-gradient(to right, #D96330 0%, #D96330 ${progress}%, ${dark ? '#1E2A38' : '#EBE4DC'} ${progress}%, ${dark ? '#1E2A38' : '#EBE4DC'} 100%)`,
          }}
          aria-label="音樂播放進度"
        />
        <style dangerouslySetInnerHTML={{ __html: `
          #music-progress-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #FFFFFF;
            border: 3px solid #D96330;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            transition: transform 0.1s;
          }
          #music-progress-slider::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }
          #music-progress-slider::-webkit-slider-thumb:active {
            transform: scale(1.3);
          }
          #music-progress-slider::-moz-range-thumb {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: #FFFFFF;
            border: 3px solid #D96330;
            cursor: pointer;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
          }
        `}} />
      </div>
    </div>
  );
}

export default ProgressBar;
