import pg from 'pg';

const FALLBACK_PLANS = [
    { id: "mensal", name: "Plano Mensal (Backup)", description: "Experimente a elite", price: 49.90, type: "individual", active: true },
    { id: "trimestral", name: "Plano Trimestral (Backup)", description: "O mais popular", price: 119.70, type: "individual", active: true },
    { id: "semestral", name: "Plano Semestral (Backup)", description: "Elegância contínua", price: 215.40, type: "individual", active: true },
    { id: "anual", name: "Plano Anual (Backup)", description: "Experiência completa", price: 394.80, type: "individual", active: true },
    { id: "fam-mensal", name: "Família Mensal (Backup)", description: "A elite para todos", price: 159.64, type: "family", active: true },
    { id: "fam-trimestral", name: "Família Trimestral (Backup)", description: "Economia e lazer", price: 135.64, type: "family", active: true },
    { id: "fam-semestral", name: "Família Semestral (Backup)", description: "Momentos compartilhados", price: 122.64, type: "family", active: true },
    { id: "fam-anual", name: "Família Anual (Backup)", description: "O ápice do Club Empar", price: 111.84, type: "family", active: true }
];

export default async function handler(req, res) {
    // Cabeçalhos de Segurança e CORS
    res.setHeader('Cache-Control', 'no-store, max-age=0, must-revalidate');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    // Limpeza da string de conexão para forçar NO-SSL
    let connectionString = process.env.DATABASE_URL;
    if (connectionString) {
        connectionString = connectionString.split('?')[0] + '?sslmode=disable';
    }

    const client = new pg.Pool({
        connectionString,
        ssl: false,
        connectionTimeoutMillis: 5000,
        max: 1
    });

    try {
        if (req.method === 'GET') {
            const result = await client.query('SELECT * FROM emparclub.plans ORDER BY price ASC');
            await client.end();
            // Se o banco retornar dados, ele substitui os nomes de backup
            return res.status(200).json(result.rows.length > 0 ? result.rows : FALLBACK_PLANS);
        }

        if (req.method === 'PUT') {
            // Pega o ID tanto da query /api/plans?id=xxx quanto de /api/plans/xxx se a vercel mapear
            const id = req.query.id || req.url.split('/').pop()?.split('?')[0];
            const body = req.body;
            const { createdAt, id: _id, ...data } = body;

            const keys = Object.keys(data);
            const values = Object.values(data);
            const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

            const query = `UPDATE emparclub.plans SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
            const result = await client.query(query, [...values, id]);
            await client.end();
            return res.status(200).json(result.rows[0]);
        }

        await client.end();
        return res.status(405).json({ error: "Method not allowed" });
    } catch (e) {
        console.error("ERRO_OPERACAO:", e.message);
        try { await client.end(); } catch (err) { }
        // Retorna o erro no cabeçalho para debug no navegador
        res.setHeader('X-Error-Detail', e.message);
        return res.status(200).json(FALLBACK_PLANS);
    }
}
