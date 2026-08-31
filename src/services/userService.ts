import { MOCK_USER, MOCK_FRIENDS } from '../mock/user';
import type { User, Friend } from '../types/user';

export const userService = {
  getCurrentUser: async (): Promise<User> => {
    return MOCK_USER;
  },

  getFriends: async (): Promise<Friend[]> => {
    return MOCK_FRIENDS;
  },

  getRecentSongIds: (): string[] => {
    try {
      const stored = localStorage.getItem('lesheng_recent_songs');
      return stored ? JSON.parse(stored) : ['1', '5']; // Default to some songs
    } catch {
      return ['1', '5'];
    }
  },

  addRecentSong: (songId: string): void => {
    try {
      const current = userService.getRecentSongIds();
      const filtered = current.filter(id => id !== songId);
      const updated = [songId, ...filtered].slice(0, 5); // Keep top 5
      localStorage.setItem('lesheng_recent_songs', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to store recent song', e);
    }
  }
};

export default userService;
