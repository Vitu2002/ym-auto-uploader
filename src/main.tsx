import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import { ContentProvider } from '@providers/ContentProvider.tsx';
import '@styles/_global.scss';
import { ToastContainer } from 'react-toastify';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ContentProvider>
            <App />
            <ToastContainer autoClose={3000} theme='dark' pauseOnHover={true} />
        </ContentProvider>
    </StrictMode>
);
