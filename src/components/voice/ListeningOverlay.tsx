import { Mic, X } from 'lucide-react';

interface ListeningOverlayProps {
  visible: boolean;
  statusText: string;
  recognizedText?: string;
  onCancel: () => void;
}

export function ListeningOverlay({ visible, statusText, recognizedText, onCancel }: ListeningOverlayProps) {
  if (!visible) return null;

  return (
    <div
      id="listening-modal-overlay"
      className="fixed inset-0 bg-slate-950/95 z-50 flex flex-col items-center justify-between py-12 px-6 max-w-[430px] mx-auto"
    >
      {/* Upper header */}
      <div className="w-full text-center mt-6">
        <span className="text-sm tracking-widest text-[#E8844A] bg-primary/20 px-3 py-1.5 rounded-full font-bold uppercase">
          樂聲智慧語音搜尋
        </span>
      </div>

      {/* Center Circle & Wave Bars */}
      <div className="flex flex-col items-center justify-center gap-12 my-auto">
        <div className="relative flex items-center justify-center">
          {/* Pulsing Sonars */}
          <div className="absolute w-[220px] h-[220px] rounded-full bg-primary/10 animate-pulse" />
          <div className="absolute w-[180px] h-[180px] rounded-full bg-white/5 animate-ping" />
          
          <div className="w-40 h-40 rounded-full bg-primary flex items-center justify-center text-white border-4 border-orange-200/40 shadow-2xl">
            <Mic className="w-16 h-16 stroke-[2.5]" />
          </div>
        </div>

        {/* 7 Interactive Wave Bars */}
        <div className="flex items-end justify-center gap-2 h-20 w-fit">
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              style={{ 
                animationDelay: `${i * 0.12}s`,
                height: `${24 + Math.abs(i - 3) * 12}px` 
              }}
              className="w-2.5 bg-gradient-to-t from-primary to-amber-400 rounded-full animate-voice-wave"
            />
          ))}
        </div>

        {/* Status Prompt Text */}
        <div className="text-center px-4">
          <h3 id="overlay-status-title" className="text-2xl font-black text-white mb-2 tracking-wide leading-normal">
            {statusText}
          </h3>
          {recognizedText && (
            <div className="bg-slate-900 border border-slate-700 p-4 rounded-2xl flex flex-col gap-1 inline-block mt-2 min-w-[200px]">
              <span className="text-sm font-semibold text-slate-400">識別結果</span>
              <span className="text-xl font-black text-amber-400">「{recognizedText}」</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Close Call Action */}
      <button
        id="btn-cancel-voice-overlay"
        onClick={onCancel}
        className="w-full max-w-[240px] min-h-[56px] bg-slate-800 hover:bg-slate-700 active:bg-slate-600 border border-slate-700 text-slate-200 font-bold text-lg rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all mb-4 shadow"
      >
        <X className="w-5 h-5 stroke-[2.5]" />
        <span>取消並返回</span>
      </button>
    </div>
  );
}

export default ListeningOverlay;
