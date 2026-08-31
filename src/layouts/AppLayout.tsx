import { Outlet } from 'react-router-dom';
import { BottomNav } from '../components/common/BottomNav';
import { Toast } from '../components/common/Toast';
import { LanguageButton } from '../components/common/LanguageButton';
import { Music2 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export function AppLayout() {
  const { language } = useLanguage();

  return (
    <div
      id="app-layout-frame"
      className="w-full max-w-[430px] min-h-screen bg-warm-bg flex flex-col shadow-2xl relative pb-[88px] border-x border-warm-border/60"
    >
      {/* Branded Global Top Utility Bar */}
      <div className="w-full flex items-center justify-between px-5 pt-4 pb-1 select-none shrink-0 bg-warm-bg">
        <div className="flex items-center gap-1.5 text-xs font-black tracking-widest text-primary/80 font-sans uppercase">
          <Music2 className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{language === 'zh' ? '樂聲伴唱 KTV' : 'LeSheng KTV'}</span>
        </div>
        <LanguageButton />
      </div>

      {/* Scrollable primary content */}
      <main id="app-view-port" className="flex-1 px-5 pb-5 pt-2 flex flex-col gap-6 overflow-x-hidden">
        <Outlet />
      </main>

      {/* Main Tab bar navigation */}
      <BottomNav />

      {/* Real-time Toast container overlay */}
      <Toast />
    </div>
  );
}

export default AppLayout;
