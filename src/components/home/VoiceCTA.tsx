import { useNavigate } from 'react-router-dom';
import { Mic } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export function VoiceCTA() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleClick = () => {
    navigate('/voice-search');
  };

  return (
    <div
      id="voice-cta-panel"
      onClick={handleClick}
      className="relative overflow-hidden w-full bg-gradient-to-br from-[#D96330] to-[#E8844A] text-white p-6 rounded-[2.5rem] shadow-md border-2 border-primary-dark/30 hover:shadow-lg hover:scale-[1.01] transition-all cursor-pointer flex flex-col items-center justify-center text-center min-h-[220px]"
    >
      {/* Mic Sonar Rings */}
      <div id="cta-sonar-container" className="relative flex items-center justify-center mb-4">
        {/* Pulsing visual circles */}
        <div className="absolute w-20 h-20 bg-white/10 rounded-full animate-sonar-1"></div>
        <div className="absolute w-20 h-20 bg-white/10 rounded-full animate-sonar-2"></div>
        <div className="absolute w-20 h-20 bg-white/20 rounded-full animate-sonar-3"></div>
        
        {/* Mic Circle */}
        <div className="relative z-10 w-22 h-22 rounded-full bg-white text-primary flex items-center justify-center shadow-lg border-4 border-orange-100">
          <Mic className="w-10 h-10 stroke-[2.5]" />
        </div>
      </div>

      {/* Hero Invitation Text */}
      <h2 id="cta-main-title" className="text-2xl font-black mb-1.5 tracking-wide">
        {t('cta.title')}
      </h2>
      <p id="cta-sub-text" className="text-[16px] text-orange-50 font-medium font-bold">
        {t('cta.desc')}
      </p>
    </div>
  );
}

export default VoiceCTA;
