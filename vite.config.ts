import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, runnerImport, type Plugin } from 'vite';

interface SeoFilesModule {
  buildSeoFiles: (templateHtml: string, siteUrl: string) => { fileName: string; source: string }[];
}

// Adds the per-page HTML, robots.txt and sitemap.xml built by
// src/shared/utils/seoFiles.ts. The module is loaded through Vite because this
// Node config can't import the app's extensionless TypeScript directly.
function seoFiles(siteUrl: string): Plugin {
  return {
    name: 'quick-tsw:seo-files',
    apply: 'build',
    enforce: 'post',
    async generateBundle(_options, bundle) {
      const indexHtml = bundle['index.html'];
      if (indexHtml?.type !== 'asset') {
        this.error('Brak index.html w buildzie – nie da się wygenerować plików SEO.');
      }

      if (!siteUrl) {
        this.warn('VITE_SITE_URL jest puste – pomijam canonical, og:url i sitemap.xml.');
      }

      const { module } = await runnerImport<SeoFilesModule>('./src/shared/utils/seoFiles.ts', {
        configFile: false,
        logLevel: 'silent',
      });

      for (const file of module.buildSeoFiles(String(indexHtml.source), siteUrl)) {
        if (file.fileName === 'index.html') {
          indexHtml.source = file.source;
        } else {
          this.emitFile({ type: 'asset', fileName: file.fileName, source: file.source });
        }
      }
    },
  };
}

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const siteUrl = env.VITE_SITE_URL ?? '';

  // index.html inserts %VITE_SITE_URL% as is, so a trailing "/" would give
  // "//" in og:image and the structured data of a build. The dev server only
  // needs it for in-app canonical links, which config.ts normalises.
  if (command === 'build' && siteUrl.endsWith('/')) {
    throw new Error(`VITE_SITE_URL nie może kończyć się „/”: ${siteUrl}`);
  }

  return {
    plugins: [react(), seoFiles(siteUrl)],
    server: {
      proxy: {
        '/api': {
          target: env.API_PROXY_TARGET || 'http://localhost:8082',
          changeOrigin: true,
        },
      },
    },
  };
});
