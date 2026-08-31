import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, replacements?: Record<string, string | number>) => string;
}

const translations: Record<Language, Record<string, string>> = {
  zh: {
    // Nav
    'nav.home': '首頁',
    'nav.browse': '歌曲目錄',
    'nav.favorites': '我的收藏',

    // Home
    'home.morning': '早安！',
    'home.noon': '吃飽沒！',
    'home.afternoon': '下晡好！',
    'home.night': '吃飽囉！',
    'home.subtitle': '今天金喉歌聲動聽，想唱首什麼歌呢？',
    
    // VoiceCTA
    'cta.title': '說出或哼出歌名',
    'cta.desc': '免用鍵盤，用說的或用哼的一秒精準找歌',

    // Social Banner
    'social.banner': '美娟阿姨正在熱唱《綠島小夜曲》，有 6 位朋友一起！',
    'social.banner.toast': '正在連線進入 美娟阿姨 的歌聲房包廂...',

    // QuickGrid
    'quick.browse': '老歌目錄',
    'quick.browse.desc': '尋找台國語金曲',
    'quick.invite': '揪朋友唱',
    'quick.invite.desc': '與親友同步合唱',

    // RecentSongs
    'recent.title': '最近常唱與好歌推薦',
    'recent.tag': '經典金嗓特唱',

    // BrowsePage
    'browse.title': '歌曲目錄分類',
    'browse.cat.popular': '本週熱門',
    'browse.cat.popular.desc': '最近最多長輩在唱的歌',
    'browse.cat.nostalgic': '懷舊經典',
    'browse.cat.nostalgic.desc': '60 至 90 年代精彩老歌',
    'browse.cat.ai': '今日金嗓精選',
    'browse.cat.ai.desc': '健康常唱風格推薦今日好歌',
    'browse.tag.fave': '長輩最愛',
    'browse.singer.search': '按歌星名尋找',
    'browse.singer.clear': '清除篩選',
    'browse.songs.singer': '的專屬經典歌單：',
    'browse.songs.popular': '本週熱門排行榜好歌：',
    'browse.songs.nostalgic': '懷舊經典推薦：',
    'browse.songs.ai': '今日金嗓原音為您精選：',
    'browse.songs.all': '所有經典推薦好歌：',
    'browse.songs.total': '共',
    'browse.songs.total.unit': '筆',
    'browse.songs.empty': '在此分類下暫無《{singer}》的曲目',
    'browse.songs.reset': '點此返回顯示全部好歌',

    // SongCard
    'song.similarity': '聲音契合度',
    'song.play': '播放',
    'song.faved': '已將《{title}》加入收藏',
    'song.unfaved': '已將《{title}》移除收藏',

    // FavoritesPage
    'fav.title': '我的收藏歌單',
    'fav.search': '大字放大搜尋喜歡的歌（輸入歌星或歌名）',
    'fav.empty.title': '目前沒有收藏喔！',
    'fav.empty.desc': '回到「首頁」或「歌曲目錄」，在喜歡的歌旁邊按「♡ 收藏」按鈕，歌單就會出現喔！',
    'fav.empty.action': '繼續加入喜歡的歌吧！',
    'fav.search.empty': '找不到與「{query}」相關的收藏歌曲',
    'fav.toast.removed': '已將《{title}》從我的收藏移除',

    // InvitePage
    'invite.back': '返回',
    'invite.title': '與老朋友合唱',
    'invite.hero.title': '遠端 KTV 揪親友對唱',
    'invite.hero.desc': '不需要出門，點開連結即可對著手機隨時同步合唱、互相點讚送花，排解寂寞！',
    'invite.way.title': '請選一種方式發送邀請：',
    'invite.way.line': '用 LINE 發送唱歌連結',
    'invite.way.line.desc': '點擊後自動跳轉，好友一按即可加入',
    'invite.way.sms': '用行動簡訊發送邀請',
    'invite.way.sms.desc': '輸入對方門號，即可發送專屬邀請簡訊',
    'invite.friends.title': '好朋友正在唱歌：',
    'invite.friends.live': 'Live 即時播報',
    'invite.friends.singing': '正在唱《{song}》',
    'invite.friends.offline': '離線中 • 剛唱完經典',
    'invite.friends.resting': '休息中',
    'invite.friends.join': '加入合唱',
    'invite.toast.copy': '已為您複製 KTV 連結，並自動打開 LINE 傳送給老朋友！',
    'invite.toast.sms': '已發送邀請簡訊給好朋友，邀請他上線唱歌！',
    'invite.toast.join.serenade': '正在加入 「{name}」 的《綠島小夜曲》合唱房！',
    'invite.toast.join.fallback': '正在連結進入合唱房：{name} 正在唱《{song}》',

    // VoiceSearchPage
    'voice.placeholder': '點擊按鈕，對著手機說出歌名...',
    'voice.tap.start': '按一下，對著手機「說歌名」或「哼歌」',
    'voice.tap.stop': '說完了，正在幫您認真找歌中...',
    'voice.matching': '語音搜尋中：比對 365 歲經典老歌庫...',
    'voice.error.retry': '剛剛沒聽清楚，要不要再試試看？',
    'voice.manual.title': '手動輸入找歌',
    'voice.manual.desc': '可輸入歌名、歌星或是您記得的歌詞片段',
    'voice.manual.placeholder': '例如：綠島小夜曲',
    'voice.manual.button': '按我搜尋 🔍',

    // SearchResultsPage
    'results.status.success': '恭喜！語音識別成功 👏',
    'results.status.similarity': '聲音音準契合 99%！',
    'results.query.label': '您哼唱或說的字詞：',
    'results.ref.title': '音準與字詞比對，為您精選最相近歌曲：',
    'results.empty.title': '抱歉，找不到完全相同的歌曲',
    'results.empty.desc': '可能歌詞漏了兩字，您要不要試試其他歌？',
    'results.empty.retry': '再語音說一次',
    'results.footer.tip': '阿婆貼心小提示：點選橘色「播放按鈕」，可以直接看歌詞並練習開唱喔！',

    // SongDetailPage
    'detail.sing': '我要開唱 🎤',
    'detail.sing.desc': '進入大字 KTV 歡唱房',
    'detail.lyrics.auto': '點擊上方開始播放後，歌詞將自動對齊：',
    'detail.lyrics.count': '共 {count} 行歌詞',

    // KTVModePage
    'ktv.exit': '退出',
    'ktv.tag': '頂級 KTV 特大字',
    'ktv.toast.enter': '進入《{title}》的 KTV 單人歡唱包廂！',
    'ktv.toast.exit': '已結束《{title}》的歡唱，返回點播台',
    'ktv.vocal.on': '導唱：開 🗣️',
    'ktv.vocal.off': '導唱：原 🔇',
    'ktv.record.start': '錄音中 🔴',
    'ktv.record.idle': '錄音 🎙️',
    'ktv.share': '分享 📤',
    'ktv.cheer.singer': '美娟阿姨為您鼓掌 👏 唱太棒了！',
    'ktv.toast.voice.recorded': '已為您錄下您的好歌聲！',
    'ktv.toast.voice.saved': '錄音已儲存！錄音檔案已封裝準備就緒。',
    'ktv.toast.share': '已複製您的 KTV 對唱房網址，可以傳到 LINE 群組分享您的美聲囉！',

    // FontSizeControl
    'font.label': '字體大小：',
    'font.sm': '小',
    'font.md': '中',
    'font.lg': '大',
    'font.autoscroll': '自動捲動',

    // Avatar Prefix Removal
    'avatar.maiduan': '美娟阿姨',
  },
  en: {
    // Nav
    'nav.home': 'Home',
    'nav.browse': 'Library',
    'nav.favorites': 'Favorites',

    // Home
    'home.morning': 'Morning!',
    'home.noon': 'Eaten yet?',
    'home.afternoon': 'Good Afternoon!',
    'home.night': 'Eaten yet?',
    'home.subtitle': 'Your voice is beautiful today! Ready to sing?',
    
    // VoiceCTA
    'cta.title': 'Say or Hum Song Name',
    'cta.desc': 'No keyboard! Find songs in 1 second with voice',

    // Social Banner
    'social.banner': 'Auntie Mei-juan is singing "Green Island Serenade" with 6 friends!',
    'social.banner.toast': 'Connecting to Auntie Mei-juan\'s singing room...',

    // QuickGrid
    'quick.browse': 'Song Catalog',
    'quick.browse.desc': 'Mandarin & Taiwanese classics',
    'quick.invite': 'Invite Friends',
    'quick.invite.desc': 'Synchronized duet with family',

    // RecentSongs
    'recent.title': 'Recently Played & Recommends',
    'recent.tag': 'Golden Classic',

    // BrowsePage
    'browse.title': 'Song Categories',
    'browse.cat.popular': 'Weekly Hot',
    'browse.cat.popular.desc': 'Most sung songs by seniors recently',
    'browse.cat.nostalgic': 'Retro Classics',
    'browse.cat.nostalgic.desc': 'Retro songs from 60s to 90s',
    'browse.cat.ai': 'Today\'s Gold Selection',
    'browse.cat.ai.desc': 'Dynamic recommendations based on style',
    'browse.tag.fave': 'Seniors\' Favorite',
    'browse.singer.search': 'Find by Artist',
    'browse.singer.clear': 'Clear Filter',
    'browse.songs.singer': '\'s Exclusive Playlist:',
    'browse.songs.popular': 'Top Hits of the Week:',
    'browse.songs.nostalgic': 'Nostalgic Retro Selection:',
    'browse.songs.ai': 'Today\'s Gold Selection:',
    'browse.songs.all': 'All Recommended Classics:',
    'browse.songs.total': 'Total',
    'browse.songs.total.unit': 'songs',
    'browse.songs.empty': 'No songs found for "{singer}" under this category',
    'browse.songs.reset': 'Return to show all songs',

    // SongCard
    'song.similarity': 'Voice Match',
    'song.play': 'Play',
    'song.faved': '"{title}" added to favorites',
    'song.unfaved': '"{title}" removed from favorites',

    // FavoritesPage
    'fav.title': 'My Favorites',
    'fav.search': 'Search artist or song name...',
    'fav.empty.title': 'No favorites yet!',
    'fav.empty.desc': 'Go to "Home" or "Library", tap "♡ Favorite" next to any song to add it here!',
    'fav.empty.action': 'Add favorite songs now!',
    'fav.search.empty': 'No songs match "{query}"',
    'fav.toast.removed': '"{title}" removed from favorites',

    // InvitePage
    'invite.back': 'Back',
    'invite.title': 'Duet with Friends',
    'invite.hero.title': 'Remote KTV Duet',
    'invite.hero.desc': 'No need to go out! Duet, like, and send flowers to friends over your phone!',
    'invite.way.title': 'Choose invitation method:',
    'invite.way.line': 'Invite via LINE',
    'invite.way.line.desc': 'Auto-redirect, friends join with 1 tap',
    'invite.way.sms': 'Invite via SMS',
    'invite.way.sms.desc': 'Enter number to send invitation SMS',
    'invite.friends.title': 'Friends Singing Now:',
    'invite.friends.live': 'Live Feed',
    'invite.friends.singing': 'Singing "{song}"',
    'invite.friends.offline': 'Offline • Just finished classic',
    'invite.friends.resting': 'Resting',
    'invite.friends.join': 'Join Duet',
    'invite.toast.copy': 'Copied KTV link! Opening LINE for invitation...',
    'invite.toast.sms': 'SMS invitation successfully sent to friend!',
    'invite.toast.join.serenade': 'Joining Auntie Mei-juan\'s "Green Island Serenade" room!',
    'invite.toast.join.fallback': 'Entering room: {name} is singing "{song}"',

    // VoiceSearchPage
    'voice.placeholder': 'Say song or singer name...',
    'voice.tap.start': 'Tap to say song name or hum melody',
    'voice.tap.stop': 'Searching classic database...',
    'voice.matching': 'Searching voice pitch and lyric database...',
    'voice.error.retry': 'Couldn\'t hear clearly, try again?',
    'voice.manual.title': 'Manual Word Search',
    'voice.manual.desc': 'Enter song name, artist or lyric fragment',
    'voice.manual.placeholder': 'e.g. Green Island Serenade',
    'voice.manual.button': 'Search 🔍',

    // SearchResultsPage
    'results.status.success': 'Voice Recognized! 👏',
    'results.status.similarity': 'Voice pitch match 99%!',
    'results.query.label': 'Your voice/hum keywords:',
    'results.ref.title': 'Best matches based on pitch & text:',
    'results.empty.title': 'No exact matches found',
    'results.empty.desc': 'Maybe a word was missed? Try again!',
    'results.empty.retry': 'Try Voice Again',
    'results.footer.tip': 'Auntie\'s Tip: Tap orange Play button to view lyrics and practice!',

    // SongDetailPage
    'detail.sing': 'Sing Now 🎤',
    'detail.sing.desc': 'Enter big-font KTV room',
    'detail.lyrics.auto': 'Lyrics auto-sync & scroll during playback:',
    'detail.lyrics.count': '{count} lyric lines total',

    // KTVModePage
    'ktv.exit': 'Exit',
    'ktv.tag': 'Large Font KTV',
    'ktv.toast.enter': 'Entered "{title}" KTV Solo Room!',
    'ktv.toast.exit': 'Finished "{title}". Returning to dashboard...',
    'ktv.vocal.on': 'Vocal: On 🗣️',
    'ktv.vocal.off': 'Vocal: Off 🔇',
    'ktv.record.start': 'Recording 🔴',
    'ktv.record.idle': 'Record 🎙️',
    'ktv.share': 'Share 📤',
    'ktv.cheer.singer': 'Auntie Mei-juan claps: Brilliant! 👏',
    'ktv.toast.voice.recorded': 'Your beautiful singing is recorded!',
    'ktv.toast.voice.saved': 'Recording saved! Prepared for sharing.',
    'ktv.toast.share': 'Copied duet link! Share to LINE groups now!',

    // FontSizeControl
    'font.label': 'Font Size:',
    'font.sm': 'Sm',
    'font.md': 'Md',
    'font.lg': 'Lg',
    'font.autoscroll': 'Auto Scroll',

    // Avatar Prefix Removal
    'avatar.maiduan': 'Mei-juan',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app-language');
    return (saved as Language) || 'zh';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: string, replacements?: Record<string, string | number>) => {
    let text = translations[language][key];
    if (text === undefined) {
      text = translations['zh'][key] || key;
    }
    if (!replacements) return text;
    return Object.entries(replacements).reduce((acc, [k, v]) => {
      return acc.replace(new RegExp(`{${k}}`, 'g'), String(v));
    }, text);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
