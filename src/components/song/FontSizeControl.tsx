import { ArrowUpDown } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

interface FontSizeControlProps {
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  autoScroll: boolean;
  setAutoScroll: (scroll: boolean) => void;
}

export function FontSizeControl({
  fontSize,
  setFontSize,
  autoScroll,
  setAutoScroll,
}: FontSizeControlProps) {
  const { t } = useLanguage();

  const sizes: { value: 'small' | 'medium' | 'large'; label: string }[] = [
    { value: 'small', label: t('font.sm') },
    { value: 'medium', label: t('font.md') },
    { value: 'large', label: t('font.lg') },
  ];

  return (
    <div
      id="font-size-control-bar"
      className="w-full bg-white p-3 rounded-2xl border border-warm-border flex flex-wrap items-center justify-between gap-3 select-none"
    >
      {/* Font scale selectors */}
      <div className="flex items-center gap-2 max-w-full">
        <span className="text-[14px] sm:text-[15px] font-black text-ink-secondary shrink-0">{t('font.label')}</span>
        
        <div id="btn-group-fontsize" className="flex items-center bg-slate-100 p-1 rounded-2xl gap-1 shrink-0">
          {sizes.map((sz) => {
            const active = fontSize === sz.value;
            return (
              <button
                id={`btn-fontsize-${sz.value}`}
                key={sz.value}
                onClick={() => setFontSize(sz.value)}
                className={`w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl font-black text-[15px] cursor-pointer transition-all ${
                  active
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-ink-secondary hover:text-ink hover:bg-slate-200'
                }`}
              >
                {sz.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Auto Scroll Toggle */}
      <button
        id="btn-toggle-autoscroll"
        onClick={() => setAutoScroll(!autoScroll)}
        className={`flex items-center justify-center gap-1.5 py-1.5 px-3.5 rounded-2xl border font-black text-[14px] sm:text-[15px] whitespace-nowrap shrink-0 transition-all h-11 min-h-[44px] cursor-pointer ${
          autoScroll
            ? 'bg-primary-light border-primary/40 text-primary'
            : 'bg-white border-warm-border text-ink-secondary hover:text-ink'
        }`}
      >
        <ArrowUpDown className="w-5 h-5 stroke-[2.5]" />
        <span>{t('font.autoscroll')}</span>
      </button>
    </div>
  );
}

export default FontSizeControl;
