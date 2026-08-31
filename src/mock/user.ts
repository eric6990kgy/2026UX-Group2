import type { User, Friend } from '../types/user';

export const MOCK_USER: User = {
  id: 'u1',
  displayName: '陳美娟',
  avatar: '👵',
  greeting: '阿婆',
};

export const MOCK_FRIENDS: Friend[] = [
  { id: 'f1', name: '美娟阿姨', avatar: '👩', currentSong: '綠島小夜曲', isLive: true },
  { id: 'f2', name: '大伯', avatar: '👴', currentSong: undefined, isLive: false },
  { id: 'f3', name: '王叔叔', avatar: '👨', currentSong: '愛拼才會贏', isLive: true },
  { id: 'f4', name: '秋香伯母', avatar: '👵', currentSong: '甜蜜蜜', isLive: false }
];
