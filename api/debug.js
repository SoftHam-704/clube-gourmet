export default function handler(request, response) {
    response.status(200).json({
        status: 'ok',
        message: 'Sistema Normalizado - Produção Ativa',
        timestamp: new Date().toISOString()
    });
}
