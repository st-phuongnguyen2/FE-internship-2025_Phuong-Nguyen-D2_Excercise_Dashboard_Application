import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import { createHtmlPlugin } from 'vite-plugin-html';
import path from 'path';

const PATHS = {
  output: path.join(__dirname, './dist'),
  source: path.join(__dirname, './src'),
  fixed: '/'
};

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    root: PATHS.source,
    base: PATHS.fixed,
    publicDir: 'assets',
    plugins: [
      react(),
      svgr(),
      createHtmlPlugin({
        minify: true,
        /**
         * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
         * @default /app/main.tsx
         */
        entry: '/app/main.tsx',
        /**
         * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
         * @default index.html
         */
        template: 'index.html'
      })
    ],
    define: {
      'process.env.APP_ENV': JSON.stringify(process.env.VITE_APP_ENV),
      'process.env.API_BASE_URL': JSON.stringify(process.env.VITE_API_BASE_URL)
    },
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, './src')
        // '@app': path.resolve(__dirname, './src/app'),
        // '@config': path.resolve(__dirname, './src/config'),
        // '@stylesheet': path.resolve(__dirname, './src/stylesheet'),
        // '@shared': path.resolve(__dirname, './src/app/shared'),
        // '@core': path.resolve(__dirname, './src/app/core'),
        // '@assets': path.resolve(__dirname, './src/assets'),
      }
    },
    build: {
      // Specify the dist folder
      outDir: PATHS.output
    }
  });
};
