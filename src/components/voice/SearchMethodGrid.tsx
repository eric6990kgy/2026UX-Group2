import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { Mic, Music } from 'lucide-react';

interface SearchMethodGridProps {
  onSelectMethod: (method: 'voice' | 'hum') => void;
  activeMethod: 'voice' | 'hum';
}

export function SearchMethodGrid({ onSelectMethod, activeMethod }: SearchMethodGridProps) {
  const { show } = useToast();

  const methods = [
    {
      id: 'method-voice',
      type: 'voice' as const,
      icon: Mic,
      title: '說歌名',
      desc: '直接說出歌名或歌手',
    },
    {
      id: 'method-hum',
      type: 'hum' as const,
      icon: Music,
      title: '哼旋律',
      desc: '哼幾句旋律幫你找',
    },
  ];

  const handleSelect = (type: 'voice' | 'hum') => {
    onSelectMethod(type);
    if (type === 'hum') {
      show('已切換到「哼歌曲旋律」智慧識別模式，按麥克風隨選哼唱！', 2500);
    } else {
      show('已開啟「說出歌名」智慧語音搜尋！', 2000);
    }
  };

  return (
    <div id="search-methods-grid" className="grid grid-cols-2 gap-3 w-full">
      {methods.map((method) => {
        const active = activeMethod === method.type;
        const Icon = method.icon;
        return (
          <button
            id={method.id}
            key={method.type}
            onClick={() => handleSelect(method.type)}
            className={`flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all cursor-pointer min-h-[112px] text-center ${
              active
                ? 'bg-[#FAEADE] border-primary text-primary shadow-sm'
                : 'bg-slate-800 border-slate-700/60 text-slate-200 hover:border-slate-600'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1.5 ${active ? 'text-primary' : 'text-slate-300'}`}>
              <Icon className="w-5.5 h-5.5 stroke-[2.5]" />
            </div>
            <span className={`text-[17px] font-black block leading-none mb-1.5 ${active ? 'text-primary' : 'text-slate-100'}`}>
              {method.title}
            </span>
            <span className="text-[11px] text-slate-300 font-medium leading-tight line-clamp-2">
              {method.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default SearchMethodGrid;
