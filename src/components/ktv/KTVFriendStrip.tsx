import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { Avatar } from '../common/Avatar';

export function KTVFriendStrip() {
  const navigate = useNavigate();
  const { show } = useToast();

  const handleContainerClick = () => {
    navigate('/invite');
  };

  const handleInviteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    show('💬 已為您發送 LINE 邀請連結給 美娟阿姨！', 2000);
  };

  return (
    <div
      id="ktv-friend-invite-strip"
      onClick={handleContainerClick}
      className="flex items-center justify-between bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl cursor-pointer hover:bg-slate-700/60 transition-all select-none min-h-[56px] w-[100%]"
    >
      {/* Friend status indicators */}
      <div className="flex items-center gap-2.5">
        <div className="relative shrink-0">
          <Avatar name="美娟阿姨" size="sm" className="border-slate-800" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border border-slate-900 animate-pulse"></span>
        </div>
        <p className="text-[16px] font-black text-slate-100">
          美娟阿姨也在唱這首歌
        </p>
      </div>

      {/* Touch-safe miniature action button */}
      <button
        id="ktv-btn-invite-friend-strip"
        onClick={handleInviteClick}
        className="px-4 py-2 bg-social hover:bg-emerald-600 text-white text-sm font-black rounded-xl flex items-center gap-1 cursor-pointer transition-colors min-h-[38px]"
      >
        <UserPlus className="w-4 h-4 stroke-[2.5]" />
        <span>加入</span>
      </button>
    </div>
  );
}

export default KTVFriendStrip;
