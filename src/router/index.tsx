import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { HomePage } from '../pages/HomePage';
import { VoiceSearchPage } from '../pages/VoiceSearchPage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { SongDetailPage } from '../pages/SongDetailPage';
import { KTVModePage } from '../pages/KTVModePage';
import { BrowsePage } from '../pages/BrowsePage';
import { InvitePage } from '../pages/InvitePage';
import { FavoritesPage } from '../pages/FavoritesPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'browse', element: <BrowsePage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'invite', element: <InvitePage /> },
    ],
  },
  // Full-screen pages without bottom navigation tabs
  { path: '/voice-search', element: <VoiceSearchPage /> },
  { path: '/search-results', element: <SearchResultsPage /> },
  { path: '/song/:id', element: <SongDetailPage /> },
  { path: '/ktv/:id', element: <KTVModePage /> },
]);

export default router;
