import { ContentProvider } from '@providers/ContentProvider.tsx';
import axios from 'axios';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App.tsx';

import '@styles/_global.scss';
import '@styles/_toastify.scss';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

axios.defaults.baseURL = import.meta.env.VITE_API_URI;

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <ContentProvider>
                <App />
                <ToastContainer autoClose={3000} theme='dark' pauseOnHover={true} />
            </ContentProvider>
        </QueryClientProvider>
    </StrictMode>
);
