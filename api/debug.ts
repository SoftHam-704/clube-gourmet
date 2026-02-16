import { Hono } from 'hono'
import { handle } from 'hono/vercel'

const app = new Hono().basePath('/api')

app.get('/debug', (c) => {
    return c.json({
        status: 'ok',
        message: 'API Standalone - Debug OK',
        env: process.env.NODE_ENV,
        db_configured: !!process.env.DATABASE_URL
    })
})

export default handle(app)
