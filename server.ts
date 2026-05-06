import { serve } from '@hono/node-server';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Carrega .dev.vars como variáveis de ambiente
try {
  const vars = readFileSync(resolve(process.cwd(), '.dev.vars'), 'utf-8');
  for (const line of vars.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    const value = trimmed.slice(idx + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
  console.log('✅ .dev.vars carregado');
} catch {
  console.warn('⚠️  .dev.vars não encontrado, usando process.env');
}

const { default: app } = await import('./src/api/index.js');

const port = Number(process.env.PORT) || 8787;
serve({ fetch: app.fetch, port }, () => {
  console.log(`🚀 API rodando em http://localhost:${port}`);
});
