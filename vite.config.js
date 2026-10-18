import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Sirve public/<ruta>/index.html para requests de directorio
// antes de que el SPA fallback de Vite los intercepte
function servePublicSubdirs() {
  return {
    name: 'serve-public-subdirs',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0];
        if (url !== '/' && url.endsWith('/')) {
          const file = path.join(process.cwd(), 'public', url, 'index.html');
          if (fs.existsSync(file)) {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(fs.readFileSync(file));
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), servePublicSubdirs()],
  base: './',
})
