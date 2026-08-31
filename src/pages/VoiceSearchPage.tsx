import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { MicButton } from '../components/voice/MicButton';
import { SearchMethodGrid } from '../components/voice/SearchMethodGrid';
import { ListeningOverlay } from '../components/voice/ListeningOverlay';
import { useVoiceSearch } from '../hooks/useVoiceSearch';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageButton } from '../components/common/LanguageButton';

export function VoiceSearchPage() {
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const [activeMethod, setActiveMethod] = useState<'voice' | 'hum'>('voice');

  // Handle voice speech results -> Navigate
  const { isListening, statusText, recognizedText, start, stop } = useVoiceSearch((result) => {
    navigate(`/search-results?q=${encodeURIComponent(result)}`);
  });

  const handleMicClick = () => {
    start();
  };

  return (
    <div
      id="voice-search-viewport"
      className="w-full max-w-[430px] min-h-screen bg-ktv-bg text-white flex flex-col justify-between p-5 pb-8 mx-auto shadow-2xl relative border-x border-slate-800"
    >
      {/* 1. Header (Touch-safe height) */}
      <header id="vsearch-header" className="flex items-center justify-between w-[100%] py-2">
        <button
          id="btn-back-vsearch"
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 px-3 h-13 min-h-[52px] bg-slate-800/60 border border-slate-700/50 hover:bg-slate-700/60 text-slate-100 font-bold text-lg rounded-xl transition-all cursor-pointer select-none"
        >
          <ChevronLeft className="w-5.5 h-5.5 stroke-[2.5]" />
          <span>{t('invite.back')}</span>
        </button>
        <span className="text-[17px] sm:text-[19px] font-black tracking-wide text-white font-sans flex items-center gap-1.5">
          <span>{language === 'zh' ? '語音音準找歌' : 'Voice Search'}</span>
        </span>
        <LanguageButton />
      </header>

      {/* 2. Middle Hero Display Panel */}
      <main className="flex-1 flex flex-col justify-center gap-8 py-4">
        {/* Mic Interface */}
        <div className="flex flex-col gap-6 text-center">
          <div className="bg-slate-800/30 p-5 rounded-[2rem] border border-slate-700/35 max-w-[340px] mx-auto">
            <p className="text-[15px] sm:text-lg font-black text-orange-100 leading-snug animate-fade-in">
              {activeMethod === 'voice' 
                ? (language === 'zh' ? '直接對手機說出「鄧麗君」或「月亮代表我的心」' : 'Say artist like "Teresa Teng" or song name like "Moon Represents My Heart"')
                : (language === 'zh' ? '對手機哼幾句「甜蜜蜜」的旋律，自動為您辨識出心儀好歌！' : 'Hum the melody of "Tian Mi Mi" to directly recognize the classic song!')
              }
            </p>
          </div>

          {/* Giant Mic with Sonars */}
          <MicButton
            isListening={isListening}
            onClick={handleMicClick}
            statusText={
              activeMethod === 'voice' 
                ? (language === 'zh' ? '點擊大麥克風說歌名' : 'Tap big microphone to speak')
                : (language === 'zh' ? '點擊大麥克風開始哼旋律' : 'Tap big microphone to hum melody')
            }
          />
        </div>
      </main>

      {/* 3. Footer Action Selector */}
      <footer className="w-[100%] flex flex-col gap-4">
        <h4 id="help-footer-label" className="text-center text-sm font-bold text-slate-400">
          {language === 'zh' ? '── 點選切換其他找歌方法 ──' : '── Tap template below to switch method ──'}
        </h4>
        <SearchMethodGrid
          onSelectMethod={setActiveMethod}
          activeMethod={activeMethod}
        />
      </footer>

      {/* Full screen floating listening overlay */}
      <ListeningOverlay
          visible={isListening}
          statusText={statusText}
          recognizedText={recognizedText}
          onCancel={stop}
        />
    </div>
  );
}

export default VoiceSearchPage;
