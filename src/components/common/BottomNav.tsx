import { Link, useLocation } from 'react-router-dom';
import { Home, Music, Heart } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';

export function BottomNav() {
  const location = useLocation();
  const pathname = location.pathname;
  const { t } = useLanguage();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    {
      id: 'nav-home',
      labelKey: 'nav.home',
      icon: Home,
      path: '/',
    },
    {
      id: 'nav-browse',
      labelKey: 'nav.browse',
      icon: Music,
      path: '/browse',
    },
    {
      id: 'nav-favorites',
      labelKey: 'nav.favorites',
      icon: Heart,
      path: '/favorites',
    },
  ];

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-warm-border h-[72px] mx-auto w-full max-w-[430px] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] flex items-center justify-around px-2"
    >
      {navItems.map((item) => {
        const active = isActive(item.path);
        const Icon = item.icon;
        return (
          <Link
            id={item.id}
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center flex-1 h-full select-none cursor-pointer group active:scale-95 transition-transform"
          >
            <div
              className={`flex flex-col items-center justify-center p-1.5 rounded-2xl w-full min-h-[52px] ${
                active ? 'text-primary' : 'text-ink-secondary hover:text-ink'
              }`}
            >
              <Icon className={`w-[26px] h-[26px] transition-transform ${active ? 'stroke-[2.5] scale-110' : 'stroke-[2]'}`} />
              <span className={`text-[14px] sm:text-[15px] font-bold mt-1 tracking-wide ${active ? 'text-primary' : 'text-ink-secondary'}`}>
                {t(item.labelKey)}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

export default BottomNav;
