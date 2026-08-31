export interface Song {
  id: string;
  title: string;
  artist: string;
  year: number;
  cover: string;           // emoji string
  coverGradient: string;   // Tailwind gradient class
  duration: number;        // total seconds
  category: 'popular' | 'nostalgic' | 'folk';
  similarity?: number;     // 0-100, only in search results
}

export interface LyricLine {
  id: number;
  text: string;
  startTime: number;       // seconds from song start
  status: 'past' | 'active' | 'upcoming';
}
