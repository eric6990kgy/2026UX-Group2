import { Mic } from 'lucide-react';

interface MicButtonProps {
  isListening: boolean;
  onClick: () => void;
  statusText?: string;
}

export function MicButton({ isListening, onClick, statusText = '按下開始說話' }: MicButtonProps) {
  return (
    <div id="mic-button-wrapper" className="flex flex-col items-center justify-center py-6">
      {/* Outer Glow container */}
      <div id="mic-pulsing-rings-container" className="relative flex items-center justify-center w-[200px] h-[200px]">
        {/* Triple Sonar Layer with delays */}
        <div className={`absolute inset-0 rounded-full bg-primary/20 ${isListening ? 'animate-sonar-1' : ''}`} />
        <div className={`absolute inset-0 rounded-full bg-primary/15 ${isListening ? 'animate-sonar-2' : ''}`} />
        <div className={`absolute inset-0 rounded-full bg-primary/10 ${isListening ? 'animate-sonar-3' : ''}`} />

        {/* Tactile Button */}
        <button
          id="active-microphone-clicker"
          onClick={onClick}
          className={`relative z-10 w-[160px] h-[160px] rounded-full flex flex-col items-center justify-center text-white transition-all shadow-xl hover:scale-105 active:scale-95 cursor-pointer select-none ${
            isListening 
              ? 'bg-gradient-to-br from-[#D96330] to-[#E8844A] border-4 border-orange-200' 
              : 'bg-primary hover:bg-primary-dark border-4 border-orange-100'
          }`}
          aria-label="點擊語音辨識說歌名"
        >
          <Mic className={`w-14 h-14 stroke-[2.5] mb-2 ${isListening ? 'animate-bounce' : ''}`} />
          <span className="text-[17px] font-black tracking-wide">
            {isListening ? '辨識中...' : '說出歌名'}
          </span>
        </button>
      </div>

      {/* Senior Help text labels */}
      <p id="mic-action-instruction" className="text-xl font-bold mt-6 text-orange-200 text-center px-4">
        {statusText}
      </p>
    </div>
  );
}

export default MicButton;
