import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MessageSquare, Smartphone, Users, UserCheck2, Radio, Send, Users2 } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { useToast } from '../hooks/useToast';
import { MOCK_FRIENDS } from '../mock/user';
import { Avatar } from '../components/common/Avatar';

export function InvitePage() {
  const navigate = useNavigate();
  const { show } = useToast();
  const { t } = useLanguage();

  const handleShareLine = () => {
    show(t('invite.toast.copy'), 2500);
  };

  const handleShareSms = () => {
    show(t('invite.toast.sms'), 2500);
  };

  const handleJoinFriend = (friendName: string, songTitle: string) => {
    // If friend is singing Green Island Serenade, which is song '5'
    if (songTitle.includes('綠島小夜曲')) {
      show(t('invite.toast.join.serenade'), 2000);
      setTimeout(() => {
        navigate('/ktv/5');
      }, 1200);
    } else {
      show(t('invite.toast.join.fallback', { name: friendName, song: songTitle }), 2000);
      setTimeout(() => {
        navigate('/ktv/1'); // fallback to Moon represents my heart
      }, 1200);
    }
  };

  return (
    <div id="invite-page-viewport" className="w-full flex flex-col gap-6 pb-4 animate-fade-in overflow-hidden">
      {/* 1. Header (Touch target >= 52px) */}
      <header id="invite-header" className="flex items-center gap-3 py-1 select-none">
        <button
          id="btn-back-invite"
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 px-3.5 h-13 min-h-[52px] bg-white border border-warm-border hover:bg-orange-50 text-ink font-bold text-[18px] rounded-xl transition-all cursor-pointer shadow-sm select-none shrink-0"
        >
          <ChevronLeft className="w-5.5 h-5.5 stroke-[2.5]" />
          <span>{t('invite.back')}</span>
        </button>
        <span className="text-[18px] sm:text-[20px] font-black text-ink flex items-center gap-2 min-w-0">
          <Users className="w-5.5 h-5.5 text-primary stroke-[2.5] shrink-0" />
          <span className="truncate">{t('invite.title')}</span>
        </span>
      </header>

      {/* 2. Hero banner */}
      <div id="invite-hero-banner" className="bg-white p-6 rounded-[2rem] border border-warm-border/60 shadow-sm text-center flex flex-col items-center gap-4">
        <div className="relative flex items-center justify-center w-20 h-20 bg-orange-50 rounded-full border border-orange-200 shadow-inner">
          <Users2 className="w-10 h-10 text-primary stroke-[2]" />
          <Radio className="absolute -top-1 -right-1 w-6 h-6 text-social animate-pulse bg-white rounded-full p-1 shadow animate-fade-in" />
        </div>
        <div>
          <h3 id="invite-hero-title" className="text-xl font-black text-ink leading-tight mt-1">
            {t('invite.hero.title')}
          </h3>
          <p id="invite-hero-desc" className="text-sm font-bold text-ink-secondary leading-relaxed px-1 mt-1.5">
            {t('invite.hero.desc')}
          </p>
        </div>
      </div>

      {/* 3. Invitation Triggers Tabs Grid */}
      <div id="invite-cards-columns" className="flex flex-col gap-3.5">
        <h3 className="text-[17px] font-black text-ink px-1 flex items-center gap-2">
          <Send className="w-4.5 h-4.5 text-primary" />
          <span>{t('invite.way.title')}</span>
        </h3>

        {/* LINE button (Green style) */}
        <button
          id="btn-invite-way-line"
          onClick={handleShareLine}
          className="flex items-center gap-4 p-4 bg-white hover:bg-emerald-50 active:bg-emerald-100 border-2 border-emerald-300 rounded-3xl cursor-pointer text-left transition-all min-h-[92px] w-full"
        >
          <div className="w-13 h-13 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm border border-emerald-600/45">
            <MessageSquare className="w-7 h-7 stroke-[2.5] fill-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[17px] sm:text-[18px] font-black text-ink leading-tight">
              {t('invite.way.line')}
            </h4>
            <p className="text-xs font-bold text-emerald-800 mt-1 truncate">
              {t('invite.way.line.desc')}
            </p>
          </div>
        </button>

        {/* SMS invite button (Blue style) */}
        <button
          id="btn-invite-way-sms"
          onClick={handleShareSms}
          className="flex items-center gap-4 p-4 bg-white hover:bg-sky-50 active:bg-sky-100 border-2 border-sky-300 rounded-3xl cursor-pointer text-left transition-all min-h-[92px] w-full"
        >
          <div className="w-13 h-13 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm border border-sky-600/40">
            <Smartphone className="w-7 h-7 stroke-[2.5]" />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-[17px] sm:text-[18px] font-black text-ink leading-tight">
              {t('invite.way.sms')}
            </h4>
            <p className="text-xs font-bold text-sky-800 mt-1 truncate">
              {t('invite.way.sms.desc')}
            </p>
          </div>
        </button>
      </div>

      {/* 4. Real-time active singing logs */}
      <div id="online-friends-block" className="flex flex-col gap-4 mt-2">
        <h3 className="text-[17px] font-black text-ink px-1 flex items-center gap-1.5 justify-between">
          <span className="flex items-center gap-2">
            <Radio className="w-4.5 h-4.5 text-primary" />
            <span>{t('invite.friends.title')}</span>
          </span>
          <span className="text-xs bg-emerald-100 text-emerald-850 font-bold px-2.5 py-1 rounded-md animate-pulse shrink-0">
            {t('invite.friends.live')}
          </span>
        </h3>

        <div className="flex flex-col gap-3.5">
          {MOCK_FRIENDS.map((friend) => (
            <div
              id={`friend-card-${friend.id}`}
              key={friend.id}
              className="flex items-center justify-between p-4 bg-white rounded-3xl border border-warm-border shadow-sm select-none min-h-[76px]"
            >
              {/* Profile Details */}
              <div className="flex items-center gap-3.5 min-w-0 flex-1">
                <div className="relative shrink-0 select-none">
                  <Avatar name={friend.name} size="md" />
                  {friend.isLive && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-bounce"></span>
                  )}
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-[17px] font-black text-ink leading-tight mb-1 truncate">
                    {friend.name}
                  </span>
                  {friend.isLive && friend.currentSong ? (
                    <span className="text-sm font-bold text-social flex items-center gap-1 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-social inline-block animate-pulse shrink-0"></span>
                      <span className="truncate">{t('invite.friends.singing', { song: friend.currentSong })}</span>
                    </span>
                  ) : (
                    <span className="text-sm font-bold text-ink-secondary truncate">
                      {t('invite.friends.offline')}
                    </span>
                  )}
                </div>
              </div>

              {/* Action columns */}
              {friend.isLive && friend.currentSong ? (
                <button
                  id={`btn-join-friend-${friend.id}`}
                  onClick={() => handleJoinFriend(friend.name, friend.currentSong || '')}
                  className="px-4 min-h-[48px] bg-social hover:bg-emerald-600 text-white font-black text-[15px] rounded-xl flex items-center gap-1 cursor-pointer transition-colors shadow-sm shrink-0"
                >
                  <UserCheck2 className="w-4 h-4 stroke-[2.5]" />
                  <span>{t('invite.friends.join')}</span>
                </button>
              ) : (
                <span className="text-sm font-bold text-slate-300 pr-2 shrink-0 select-none">{t('invite.friends.resting')}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InvitePage;
