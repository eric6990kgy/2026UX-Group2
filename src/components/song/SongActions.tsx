import { Mic, Users, Heart } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

interface SongActionsProps {
  isFavorited: boolean;
  onKTVStart: () => void;
  onSocialInvite: () => void;
  onFavoriteToggle: () => void;
}

export function SongActions({
  isFavorited,
  onKTVStart,
  onSocialInvite,
  onFavoriteToggle,
}: SongActionsProps) {
  const { t, language } = useLanguage();

  return (
    <div id="song-detail-actions-panel" className="w-[100%] flex flex-col gap-3.5 select-none">
      {/* 1. Full-Width KTV Mode Button */}
      <button
        id="btn-trigger-ktv-mode"
        onClick={onKTVStart}
        className="w-[100%] h-14 min-h-[56px] bg-primary hover:bg-primary-dark active:bg-[#a6421c] text-white font-black text-lg sm:text-xl rounded-2xl flex items-center justify-center gap-2.5 shadow-md transition-transform active:scale-[0.99] cursor-pointer"
      >
        <Mic className="w-5.5 h-5.5 stroke-[2.5]" />
        <span>{t('detail.sing')}</span>
      </button>

      {/* 2. Half-Width Action Row */}
      <div className="grid grid-cols-2 gap-3.5 w-full">
        {/* Social Invite */}
        <button
          id="btn-actions-invite"
          onClick={onSocialInvite}
          className="h-13 min-h-[52px] bg-social hover:bg-emerald-600 active:bg-emerald-700 text-white font-black text-sm sm:text-base rounded-2xl flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
        >
          <Users className="w-5 h-5 stroke-[2.5]" />
          <span>{t('quick.invite')}</span>
        </button>

        {/* Favorite Switch */}
        <button
          id="btn-actions-favorite"
          onClick={onFavoriteToggle}
          className={`h-13 min-h-[52px] rounded-2xl font-black text-sm sm:text-base flex items-center justify-center gap-1.5 transition-all cursor-pointer border-2 ${
            isFavorited
              ? 'bg-[#FFEBE5] border-[#FF9170] text-[#E0451B]'
              : 'bg-white border-primary text-primary hover:bg-orange-50'
          }`}
        >
          <Heart className={`w-4.5 h-4.5 stroke-[2.5] ${isFavorited ? 'fill-[#E0451B] text-[#E0451B]' : 'text-primary'}`} />
          <span>
            {isFavorited 
              ? (language === 'zh' ? '已收藏 ❤️' : 'Saved ❤️') 
              : (language === 'zh' ? '加入收藏' : 'Favorite')
            }
          </span>
        </button>
      </div>
    </div>
  );
}

export default SongActions;
