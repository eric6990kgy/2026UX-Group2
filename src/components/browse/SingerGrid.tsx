import { MOCK_SINGERS } from '../../mock/singers';
import { MOCK_SONGS } from '../../mock/songs';
import { UserRound, X } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import type { Singer } from '../../types/singer';

interface SingerGridProps {
  selectedSingerId: string | null;
  onSelectSinger: (singer: Singer | null) => void;
}

export function SingerGrid({ selectedSingerId, onSelectSinger }: SingerGridProps) {
  const { t, language } = useLanguage();

  return (
    <div id="singer-browse-section" className="w-full flex flex-col gap-4 select-none">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-[19px] font-black text-ink flex items-center gap-1.5">
          <UserRound className="w-5 h-5 text-primary" />
          <span>{t('browse.singer.search')}</span>
        </h3>
        {selectedSingerId && (
          <button
            id="btn-clear-singer-filter"
            onClick={() => onSelectSinger(null)}
            className="text-[15px] font-bold text-primary active:bg-orange-100 px-3 py-1.5 rounded-xl border border-primary/20 cursor-pointer min-h-[38px] flex items-center gap-1 shadow-sm"
          >
            <span>{t('browse.singer.clear')}</span>
            <X className="w-3.5 h-3.5 stroke-[2.5]" />
          </button>
        )}
      </div>

      {/* Grid List */}
      <div id="singer-grid" className="grid grid-cols-3 gap-3">
        {MOCK_SINGERS.map((singer) => {
          const active = selectedSingerId === singer.id;
          const songCount = MOCK_SONGS.filter(s => s.artist === singer.name).length;
          return (
            <button
               id={`singer-btn-${singer.id}`}
              key={singer.id}
              onClick={() => onSelectSinger(active ? null : singer)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border-2 transition-all cursor-pointer min-h-[140px] ${
                active
                  ? 'bg-orange-50 border-primary shadow-sm scale-110 z-10'
                  : 'bg-white border-warm-border hover:border-primary/35 shadow-sm'
              }`}
            >
              {/* Giant color circle avatar with initial */}
              <div
                id={`avatar-${singer.id}`}
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${singer.gradientFrom} ${singer.gradientTo} flex items-center justify-center text-white text-xl font-black mb-2 shadow-inner`}
              >
                {singer.initial}
              </div>

              {/* Name */}
              <span className="text-[16px] sm:text-[17px] font-black text-ink text-center truncate w-full mb-0.5 leading-tight">
                {singer.name}
              </span>

              {/* Track count count details */}
              <span className="text-[11px] sm:text-[12px] font-bold text-ink-secondary text-center leading-normal">
                {language === 'zh' ? `${songCount}首好歌` : `${songCount} songs`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default SingerGrid;
