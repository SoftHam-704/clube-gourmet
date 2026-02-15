import { handle } from 'hono/vercel'
import app from '../src/api/index'

// Removido o runtime: edge para suportar o driver 'pg' do PostgreSQL
export default handle(app)
