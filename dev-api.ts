
import { serve } from '@hono/node-server';
import app from './src/api/index.ts';

const port = 3000;
console.log(`Starting API server on port ${port}...`);

serve({
  fetch: app.fetch,
  port: port,
});

console.log(`API server is running at http://localhost:${port}`);
