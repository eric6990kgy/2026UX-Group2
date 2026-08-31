import { useNavigate } from 'react-router-dom';
import { BookOpen, Users2 } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export function QuickGrid() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div id="quick-links-grid" className="grid grid-cols-2 gap-3 sm:gap-4 w-full select-none min-w-0">
      {/* Search Catalog Button */}
      <button
        id="btn-quick-browse"
        onClick={() => navigate('/browse')}
        className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white hover:bg-orange-50/50 active:bg-orange-100/50 border border-warm-border rounded-[2rem] shadow-sm text-center min-h-[136px] cursor-pointer transition-all hover:scale-[1.01] active:scale-98 min-w-0"
      >
        <div className="w-12 h-12 rounded-full bg-orange-50 text-primary flex items-center justify-center mb-2 shadow-inner shrink-0 animate-fade-in">
          <BookOpen className="w-6 h-6 stroke-[2.5]" />
        </div>
        <span className="text-[16px] sm:text-[18px] font-black text-ink leading-tight break-words text-wrap px-1 w-full">{t('quick.browse')}</span>
        <span className="text-[11px] sm:text-xs font-bold text-ink-secondary mt-1.5 leading-tight break-words text-wrap px-1 w-full">{t('quick.browse.desc')}</span>
      </button>

      {/* Social Invite Button */}
      <button
        id="btn-quick-invite"
        onClick={() => navigate('/invite')}
        className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white hover:bg-orange-50/50 active:bg-orange-100/50 border border-warm-border rounded-[2rem] shadow-sm text-center min-h-[136px] cursor-pointer transition-all hover:scale-[1.01] active:scale-98 min-w-0"
      >
        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2 shadow-inner shrink-0 animate-fade-in">
          <Users2 className="w-6 h-6 stroke-[2.5]" />
        </div>
        <span className="text-[16px] sm:text-[18px] font-black text-ink leading-tight break-words text-wrap px-1 w-full">{t('quick.invite')}</span>
        <span className="text-[11px] sm:text-xs font-bold text-ink-secondary mt-1.5 leading-tight break-words text-wrap px-1 w-full">{t('quick.invite.desc')}</span>
      </button>
    </div>
  );
}

export default QuickGrid;
