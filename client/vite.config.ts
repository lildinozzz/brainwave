import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { compression } from 'vite-plugin-compression2';
import checker from 'vite-plugin-checker';

export default defineConfig(({ mode }) => {
  const configEnv = loadEnv(mode, process.cwd(), 'CONFIG');

  return {
    plugins: [
      react(),
      tsconfigPaths(),
      checker({
        overlay: {
          initialIsOpen: true,
          position: 'br',
        },
        terminal: true,
        typescript: true,
      }),
      compression(),
      
    ],
    css: {
      modules: {
        localsConvention: 'camelCase',
        generateScopedName:
          mode === 'production'
            ? '[local]--[hash:base64:10]'
            : '[path][name]__[local]--[hash:base64:10]',
      },
    },
    build: {
      target: 'modules',
      outDir: 'dist',
      minify: 'esbuild',
      sourcemap: false,
      cssMinify: 'esbuild',
      assetsDir: 'static',

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }

            return undefined;
          },
        },
      },

      /** По умолчанию Vite вставляет импортируемые модули (svg картинки) инлайн,
       * если их размер меньше 4KiB, но компонент Icon из лего не умеет работать с такими ссылками,
       * установка assetsInlineLimit в 0 отключает это поведение */
      assetsInlineLimit: 0,
    },
    server: {
      port: 5173,
      host: configEnv.VITE_APP_POST,
    },
  };
});
