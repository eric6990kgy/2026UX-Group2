import { Play, Pause, SkipBack, SkipForward, Users, LogOut } from 'lucide-react';

interface KTVControlsProps {
  isPlaying: boolean;
  onPlayToggle: () => void;
  onPrev: () => void;
  onNext: () => void;
  onExit: () => void;
  onSocialInvite: () => void;
}

export function KTVControls({
  isPlaying,
  onPlayToggle,
  onPrev,
  onNext,
  onExit,
  onSocialInvite,
}: KTVControlsProps) {
  return (
    <div id="ktv-player-control-panel" className="w-[100%] flex flex-col gap-6 select-none bg-ktv-surface/80 p-5 rounded-3xl border border-slate-700/50 backdrop-blur">
      {/* 1. Playback navigation buttons */}
      <div className="flex items-center justify-center gap-7">
        {/* Previous Track */}
        <button
          id="ktv-btn-prev"
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="w-[52px] h-[52px] rounded-full bg-slate-800 border-2 border-slate-600 text-white flex items-center justify-center hover:bg-slate-700 hover:scale-105 active:scale-95 cursor-pointer transition-transform"
          aria-label="上一首"
        >
          <SkipBack className="w-5 h-5 fill-white" />
        </button>

        {/* Play / Pause Toggle button */}
        <button
          id="ktv-btn-play-toggle"
          onClick={(e) => { e.stopPropagation(); onPlayToggle(); }}
          className="w-[72px] h-[72px] rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-dark hover:scale-105 active:scale-95 cursor-pointer transition-transform shadow-lg shadow-primary/25 border-2 border-orange-300"
          aria-label={isPlaying ? '暫停' : '播放'}
        >
          {isPlaying ? (
            <Pause className="w-8 h-8 fill-white stroke-white" />
          ) : (
            <Play className="w-8 h-8 fill-white stroke-white ml-1" />
          )}
        </button>

        {/* Next Track */}
        <button
          id="ktv-btn-next"
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="w-[52px] h-[52px] rounded-full bg-slate-800 border-2 border-slate-600 text-white flex items-center justify-center hover:bg-slate-700 hover:scale-105 active:scale-95 cursor-pointer transition-transform"
          aria-label="下一首"
        >
          <SkipForward className="w-5 h-5 fill-white" />
        </button>
      </div>

      {/* 2. Action row triggers */}
      <div className="grid grid-cols-2 gap-4">
        {/* Leave KTV and head back with a clean exit */}
        <button
          id="ktv-btn-exit"
          onClick={(e) => { e.stopPropagation(); onExit(); }}
          className="h-13 bg-slate-800/80 border border-slate-600/60 hover:bg-slate-700 text-slate-200 font-bold text-[17px] rounded-2xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5 stroke-[2.5]" />
          <span>退出 KTV</span>
        </button>

        {/* Invite friends inside active KTV sessions */}
        <button
          id="ktv-btn-social-invite"
          onClick={(e) => { e.stopPropagation(); onSocialInvite(); }}
          className="h-13 bg-social hover:bg-emerald-600 text-white font-bold text-[17px] rounded-2xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm shadow-emerald-950/20"
        >
          <Users className="w-5 h-5 stroke-[2.5]" />
          <span>揪朋友唱</span>
        </button>
      </div>
    </div>
  );
}

export default KTVControls;
