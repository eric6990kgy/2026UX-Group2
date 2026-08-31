import { useToast } from '../../hooks/useToast';
import { useLanguage } from '../../hooks/useLanguage';
import { Users } from 'lucide-react';

export function SocialBanner() {
  const { show } = useToast();
  const { t } = useLanguage();

  const handleBannerClick = () => {
    show(t('social.banner.toast'), 2500);
  };

  return (
    <div
      id="social-live-banner"
      onClick={handleBannerClick}
      className="flex items-center gap-3.5 bg-social-light text-ink p-4 rounded-2xl border-2 border-social/20 hover:border-social/40 transition-all cursor-pointer shadow-sm min-h-[64px]"
    >
      {/* Live Beacon */}
      <span className="relative flex h-3.5 w-3.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-600"></span>
      </span>

      {/* Broadcast Message */}
      <p id="live-broadcast-text" className="text-[16px] font-bold text-emerald-950 flex-1 leading-snug">
        {t('social.banner')}
      </p>

      {/* Community badge icon */}
      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-social border border-social/20 shadow-sm shrink-0">
        <Users className="w-5 h-5 stroke-[2.5]" />
      </div>
    </div>
  );
}

export default SocialBanner;
