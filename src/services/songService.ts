import { MOCK_SONGS } from '../mock/songs';
import { MOCK_LYRICS } from '../mock/lyrics';
import type { Song, LyricLine } from '../types/song';

export const songService = {
  search: async (query: string): Promise<Song[]> => {
    if (!query) return MOCK_SONGS.map((s, i) => ({ ...s, similarity: 96 - i * 5 }));
    
    // Simple filter matching title or artist or initial
    const matches = MOCK_SONGS.filter(s =>
      s.title.toLowerCase().includes(query.toLowerCase()) || 
      s.artist.toLowerCase().includes(query.toLowerCase())
    );

    // If query didn't match anything directly, return some mock matches with lower similarity
    if (matches.length === 0) {
      // Just return songs 1 & 2 for demo purposes with custom similarity
      return [
        { ...MOCK_SONGS[0], similarity: Math.max(45, Math.floor(Math.random() * 25) + 50) },
        { ...MOCK_SONGS[1], similarity: Math.max(35, Math.floor(Math.random() * 25) + 40) }
      ];
    }

    return matches.map((s, i) => ({
      ...s,
      similarity: Math.max(60, 96 - i * 8),
    }));
  },

  getById: async (id: string): Promise<Song | undefined> => {
    return MOCK_SONGS.find(s => s.id === id);
  },

  getLyrics: async (id: string): Promise<LyricLine[]> => {
    return MOCK_LYRICS[id] ?? [];
  },

  getPopular: async (): Promise<Song[]> => {
    return MOCK_SONGS;
  },

  getNostalgic: async (): Promise<Song[]> => {
    return MOCK_SONGS.filter(s => s.category === 'nostalgic');
  },
};
export default songService;
