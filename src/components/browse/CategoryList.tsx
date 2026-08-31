import { Sparkles, TrendingUp, History } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

interface CategoryListProps {
  activeCategory: 'all' | 'popular' | 'nostalgic' | 'ai';
  onSelectCategory: (category: 'all' | 'popular' | 'nostalgic' | 'ai') => void;
}

export function CategoryList({ activeCategory, onSelectCategory }: CategoryListProps) {
  const { t } = useLanguage();

  const categories = [
    {
      id: 'cat-popular',
      value: 'popular' as const,
      icon: TrendingUp,
      iconColor: 'text-[#D96330] bg-orange-50 border-orange-100',
      titleKey: 'browse.cat.popular',
      descKey: 'browse.cat.popular.desc',
    },
    {
      id: 'cat-nostalgic',
      value: 'nostalgic' as const,
      icon: History,
      iconColor: 'text-[#E0AC16] bg-amber-50 border-amber-100',
      titleKey: 'browse.cat.nostalgic',
      descKey: 'browse.cat.nostalgic.desc',
    },
    {
      id: 'cat-ai',
      value: 'ai' as const,
      icon: Sparkles,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      titleKey: 'browse.cat.ai',
      descKey: 'browse.cat.ai.desc',
      isGoldTag: true,
    },
  ];

  return (
    <div id="browse-categories" className="flex flex-col gap-3.5 w-full select-none">
      {categories.map((cat) => {
        const active = activeCategory === cat.value;
        const Icon = cat.icon;
        return (
          <button
            id={cat.id}
            key={cat.value}
            onClick={() => onSelectCategory(cat.value)}
            className={`relative flex items-center gap-4 p-4 rounded-3xl border-2 text-left transition-all py-3.5 min-h-[88px] cursor-pointer w-full ${
              active
                ? 'bg-primary/5 border-primary shadow-sm'
                : 'bg-white border-warm-border hover:border-primary/40 active:bg-orange-50/40'
            }`}
          >
            {/* Vector Icon container instead of cheap emoji */}
            <div className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 border ${cat.iconColor}`}>
              <Icon className="w-6 h-6 stroke-[2.5]" />
            </div>

            {/* Title details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[17px] sm:text-[19px] font-black text-ink leading-tight break-words">
                  {t(cat.titleKey)}
                </span>
                {cat.isGoldTag && (
                  <span className="bg-gradient-to-r from-amber-500 to-primary text-white text-[10px] sm:text-[11px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm border border-white shrink-0">
                    <Sparkles className="w-3 h-3 fill-white" />
                    <span>{t('browse.tag.fave')}</span>
                  </span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-bold text-ink-secondary mt-1 block break-words leading-snug">
                {t(cat.descKey)}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryList;
