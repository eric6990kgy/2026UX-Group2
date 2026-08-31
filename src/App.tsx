import { RouterProvider } from 'react-router-dom';
import { ToastProvider } from './hooks/useToast';
import { LanguageProvider } from './hooks/useLanguage';
import { router } from './router';

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </LanguageProvider>
  );
}
