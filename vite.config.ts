import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                // Importa todas as variáveis globais para todos arquivos .scss automaticamente
                additionalData: `@use "${path.resolve(
                    __dirname,
                    'src/styles/_variables.scss'
                )}" as *;`,
            },
        },
    },
    resolve: {
        // Carregando path aliases do tsconfig
        alias: {
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@layouts': path.resolve(__dirname, 'src/layouts'),
            '@providers': path.resolve(__dirname, 'src/providers'),
            '@assets': path.resolve(__dirname, 'src/assets'),
        },
    },
});
