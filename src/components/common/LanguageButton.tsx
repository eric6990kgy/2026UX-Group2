import React from 'react';
import { useLanguage } from '../../hooks/useLanguage';
import { Languages } from 'lucide-react';

export function LanguageButton() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      id="btn-lang-toggle-nav"
      onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
      className="flex items-center justify-center gap-1.5 px-3 h-11 min-h-[44px] bg-slate-100 hover:bg-orange-100/60 active:bg-orange-100 border border-warm-border rounded-xl transition-all cursor-pointer shadow-sm text-ink-secondary hover:text-primary font-black text-[14px] select-none shrink-0"
      title={language === 'zh' ? 'Switch to English' : '切換至中文'}
    >
      <Languages className="w-4 h-4 stroke-[2.5]" />
      <span className="font-sans font-bold tracking-wider">{language === 'zh' ? 'EN' : '中'}</span>
    </button>
  );
}

export default LanguageButton;
