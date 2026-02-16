import pg from 'pg';

const FALLBACK_PLANS = [
    { id: "mensal", name: "Plano Mensal", description: "Experimente a elite", price: 49.90, type: "individual", active: true },
    { id: "trimestral", name: "Plano Trimestral", description: "O mais popular", price: 119.70, type: "individual", active: true },
    { id: "semestral", name: "Plano Semestral", description: "Elegância contínua", price: 215.40, type: "individual", active: true },
    { id: "anual", name: "Plano Anual", description: "Experiência completa", price: 394.80, type: "individual", active: true },
    { id: "fam-mensal", name: "Família Mensal", description: "A elite para todos", price: 159.64, type: "family", active: true },
    { id: "fam-trimestral", name: "Família Trimestral", description: "Economia e lazer", price: 135.64, type: "family", active: true },
    { id: "fam-semestral", name: "Família Semestral", description: "Momentos compartilhados", price: 122.64, type: "family", active: true },
    { id: "fam-anual", name: "Família Anual", description: "O ápice do Club Empar", price: 111.84, type: "family", active: true }
];

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const connectionString = process.env.DATABASE_URL;

    if (req.method === 'GET') {
        if (!connectionString) return res.status(200).json({ status: "warning", message: "DATABASE_URL missing", data: FALLBACK_PLANS });

        // Usando Client direto em vez de Pool para evitar problemas de socket na Vercel
        const client = new pg.Client({
            connectionString,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 5000,
        });

        try {
            await client.connect();
            const result = await client.query('SELECT * FROM emparclub.plans ORDER BY price ASC');
            await client.end();

            if (result.rows.length > 0) {
                return res.status(200).json(result.rows);
            } else {
                return res.status(200).json(FALLBACK_PLANS);
            }
        } catch (e) {
            console.error("❌ Erro ao conectar ao banco na Vercel:", e.message);
            try { await client.end(); } catch (err) { }
            // Em caso de erro, retornamos o fallback mas com um header de aviso
            res.setHeader('X-DB-Error', e.message);
            return res.status(200).json(FALLBACK_PLANS);
        }
    }

    if (req.method === 'PUT') {
        const client = new pg.Client({
            connectionString,
            ssl: { rejectUnauthorized: false },
        });

        try {
            await client.connect();
            const { id } = req.query;
            const body = req.body;

            // Remove campos que não devem ser editados no UPDATE manual
            const { createdAt, id: _id, ...data } = body;

            const keys = Object.keys(data);
            const values = Object.values(data);
            const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

            const query = `UPDATE emparclub.plans SET ${setClause} WHERE id = $${keys.length + 1} RETURNING *`;
            const result = await client.query(query, [...values, id]);
            await client.end();

            return res.status(200).json(result.rows[0]);
        } catch (e) {
            try { await client.end(); } catch (err) { }
            return res.status(500).json({ error: e.message });
        }
    }

    return res.status(405).json({ error: "Method not allowed" });
}
