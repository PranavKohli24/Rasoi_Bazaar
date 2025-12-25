import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { copyFileSync } from 'fs';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      plugins: [
        {
          name: 'copy-chef-photo',
          closeBundle() {
            // Copy chef_photo.png to dist folder after build
            try {
              copyFileSync('chef_photo.png', 'dist/chef_photo.png');
              // console.log('✓ chef_photo.png copied to dist');
            } catch (err) {
              // console.warn('Could not copy chef_photo.png');
            }
          }
        }
      ]
    };
});
