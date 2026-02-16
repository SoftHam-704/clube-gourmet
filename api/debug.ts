export default function handler(request, response) {
    response.status(200).json({
        status: 'ok',
        message: 'Nativo Vercel - Sem Hono',
        time: new Date().toISOString()
    });
}
