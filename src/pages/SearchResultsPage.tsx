import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, RefreshCw, AudioLines, Lightbulb, Mic, Star } from 'lucide-react';
import { SongCard } from '../components/common/SongCard';
import { songService } from '../services/songService';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageButton } from '../components/common/LanguageButton';
import type { Song } from '../types/song';

const MOCK_FALLBACK_SEARCH: Song[] = [
  {
    id: '1',
    title: '月亮代表我的心',
    artist: '鄧麗君',
    year: 1977,
    cover: '🌙',
    coverGradient: 'from-blue-600 to-blue-400',
    duration: 220,
    category: 'nostalgic',
    similarity: 96,
  },
  {
    id: '2',
    title: '月亮灣',
    artist: '費玉清',
    year: 1981,
    cover: '🌛',
    coverGradient: 'from-emerald-600 to-emerald-400',
    duration: 200,
    category: 'nostalgic',
    similarity: 78,
  },
  {
    id: '8',
    title: '明月千里寄相思',
    artist: '吳鶯音',
    year: 1947,
    cover: '🌕',
    coverGradient: 'from-amber-500 to-amber-300',
    duration: 180,
    category: 'nostalgic',
    similarity: 65,
  }
];

export function SearchResultsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const category = searchParams.get('category');
  const singer = searchParams.get('singer');
  const from = searchParams.get('from') || 'voice-search';
  const { t, language } = useLanguage();
  
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  // Parse queries into specialized labels for elders
  let displayKeyword = '';
  let displayTypeLabel = '';
  let iconEmoji = '🔍';

  if (category) {
    displayTypeLabel = language === 'zh' ? '分類目錄：' : 'Category:';
    if (category === 'popular') {
      displayKeyword = t('browse.cat.popular');
      iconEmoji = '🔥';
    } else if (category === 'nostalgic') {
      displayKeyword = t('browse.cat.nostalgic');
      iconEmoji = '📻';
    } else if (category === 'ai') {
      displayKeyword = t('browse.cat.ai');
      iconEmoji = '✨';
    } else {
      displayKeyword = t('browse.songs.all');
      iconEmoji = '⭐';
    }
  } else if (singer) {
    displayTypeLabel = language === 'zh' ? '經典歌星：' : 'Golden Singer:';
    displayKeyword = singer;
    iconEmoji = '🎤';
  } else {
    displayTypeLabel = t('results.query.label');
    displayKeyword = query || (language === 'zh' ? '月亮代表我的心' : 'Moon Represents My Heart');
    iconEmoji = '🗣️';
  }

  const handleBack = () => {
    if (from === 'browse' || category || singer) {
      navigate('/browse');
    } else if (from === 'home') {
      navigate('/');
    } else {
      navigate('/voice-search');
    }
  };

  const backText = (() => {
    if (from === 'browse' || category || singer) {
      return language === 'zh' ? '返回目錄' : 'Back';
    }
    if (from === 'home') {
      return language === 'zh' ? '返回首頁' : 'Home';
    }
    return language === 'zh' ? '重新找歌' : 'Retry';
  })();

  useEffect(() => {
    async function fetchResults() {
      setLoading(true);
      
      // Simulate network request for senior-oriented API structure
      setTimeout(async () => {
        try {
          let songs: Song[] = [];
          if (category) {
            if (category === 'popular') {
              songs = await songService.getPopular();
            } else if (category === 'nostalgic') {
              songs = await songService.getNostalgic();
            } else if (category === 'ai') {
              const all = await songService.getPopular();
              songs = [all[1], all[4], all[5]]; // Honey, Green Island, Fighter
            } else {
              songs = await songService.getPopular();
            }
          } else if (singer) {
            const all = await songService.getPopular();
            songs = all.filter(s => s.artist === singer);
          } else {
            const queryVal = query || '月亮代表我的心';
            if (queryVal.includes('月亮') || queryVal === '鄧麗君' || queryVal === '月亮代表我的心') {
              songs = MOCK_FALLBACK_SEARCH;
            } else {
              songs = await songService.search(queryVal);
            }
          }
          setResults(songs);
        } catch (err) {
          console.error(err);
          setResults([]);
        } finally {
          setLoading(false);
        }
      }, 700);
    }
    fetchResults();
  }, [query, category, singer]);

  return (
    <div
      id="search-results-viewport"
      className="w-full max-w-[430px] min-h-screen bg-warm-bg flex flex-col p-5 pb-8 mx-auto shadow-2xl relative border-x border-warm-border/60 animate-fade-in"
    >
      {/* 1. Page Header */}
      <header id="sresults-header" className="flex items-center justify-between py-2 select-none">
        <div className="flex items-center gap-2">
          <button
            id="btn-back-sresults"
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3.5 h-13 min-h-[52px] bg-white border border-warm-border hover:bg-orange-50 text-ink font-bold text-lg rounded-xl transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <ChevronLeft className="w-5.5 h-5.5 stroke-[2.5]" />
            <span>{backText}</span>
          </button>
          <span className="text-lg sm:text-xl font-black text-ink">{language === 'zh' ? '搜尋結果' : 'Results'}</span>
        </div>
        <LanguageButton />
      </header>

      {/* 2. Audio or Category query indicator Badge */}
      <div id="query-pill-wrapper" className="my-5">
        <div className="bg-primary/10 border-2 border-primary/25 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-11 h-11 bg-primary text-white rounded-full flex items-center justify-center shadow-sm shrink-0">
            {category || singer ? (
              <span className="text-xl leading-none select-none">{iconEmoji}</span>
            ) : (
              <AudioLines className="w-5.5 h-5.5 animate-pulse" />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-ink-secondary leading-none mb-1 pr-1 truncate">{displayTypeLabel}</span>
            <span className="text-lg sm:text-xl font-black text-primary leading-tight flex items-center gap-1 min-w-0">
              {(!category && !singer) && <Mic className="w-5 h-5 text-primary shrink-0" />}
              <span className="truncate">「{displayKeyword}」</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Result Song Cards List with count details inside heading wrapper */}
      <div className="flex items-center justify-between mb-4 px-1 gap-2 flex-wrap select-none">
        <h3 id="recommendations-heading" className="text-[15px] sm:text-[17px] font-black text-ink flex items-center gap-1.5 leading-snug">
          <Star className="w-5 h-5 text-amber-500 fill-amber-500 stroke-[2.5] shrink-0" />
          <span>
            {category || singer
              ? (language === 'zh' ? '為您尋得以下經典好歌：' : 'Songs found for you:')
              : t('results.ref.title')}
          </span>
        </h3>
        {!loading && (
          <span className="text-xs sm:text-sm font-black text-primary bg-primary/10 border-2 border-primary/25 px-2.5 py-1 rounded-lg shrink-0">
            {language === 'zh' ? `共 ${results.length} 首` : `Total ${results.length}`}
          </span>
        )}
      </div>

      <main className="flex-1 flex flex-col gap-4">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4 text-center">
            <RefreshCw className="w-10 h-10 animate-spin text-primary" />
            <span className="text-lg font-bold text-ink-secondary leading-normal px-2">
              {language === 'zh' ? '樂聲 KTV 正在熱切比對歌譜中...' : 'Comparing pitch and notes database...'}
            </span>
          </div>
        ) : results.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-white rounded-3xl border border-warm-border py-14">
            <h4 className="text-lg sm:text-xl font-black text-ink mb-2">{t('results.empty.title')}</h4>
            <p className="text-sm text-ink-secondary mb-6 font-bold leading-normal">
              {t('results.empty.desc')}
            </p>
            <button
               id="btn-retry-vsearch-empty"
              onClick={() => navigate('/voice-search')}
              className="px-6 py-3 bg-primary text-white text-lg font-bold rounded-xl cursor-pointer flex items-center justify-center gap-2 mx-auto shadow"
            >
              <Mic className="w-5 h-5 animate-pulse" />
              <span>{t('results.empty.retry')}</span>
            </button>
          </div>
        ) : (
          <div id="sresults-list" className="flex flex-col gap-4">
            {results.map((song) => (
              <SongCard key={song.id} song={song} showSimilarity={!category && !singer} />
            ))}
          </div>
        )}
      </main>

      {/* Helper senior tips */}
      <footer className="text-center mt-6 p-4 bg-orange-50 border border-primary/10 rounded-2xl select-none">
        <p className="text-sm text-primary-dark font-black leading-snug flex items-start gap-2 text-left">
          <Lightbulb className="w-5 h-5 text-primary shrink-0 mt-0.5" />
          <span>{t('results.footer.tip')}</span>
        </p>
      </footer>
    </div>
  );
}

export default SearchResultsPage;
