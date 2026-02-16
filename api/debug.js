export default function handler(request, response) {
    response.status(200).json({
        status: 'ok',
        message: 'JS Puro - Teste Final de Roteamento',
        time: new Date().toISOString()
    });
}
