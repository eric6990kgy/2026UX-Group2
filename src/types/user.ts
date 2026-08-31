export interface User {
  id: string;
  displayName: string;
  avatar: string;          // emoji
  greeting: string;        // e.g. "阿婆"
}

export interface FavoriteItem {
  songId: string;
  addedAt: Date;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;          // emoji
  currentSong?: string;    // title of song they're singing
  isLive: boolean;
}
