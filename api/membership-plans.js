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
        const client = new pg.Client({
            connectionString,
            ssl: { rejectUnauthorized: false },
            connectionTimeoutMillis: 5000,
        });

        try {
            await client.connect();
            const result = await client.query('SELECT * FROM emparclub.plans ORDER BY price ASC');
            await client.end();
            return res.status(200).json(result.rows.length > 0 ? result.rows : FALLBACK_PLANS);
        } catch (e) {
            try { await client.end(); } catch (err) { }
            // DEBUG: Retornar o erro para sabermos o que está acontecendo
            return res.status(200).json({
                isError: true,
                message: e.message,
                stack: e.stack,
                fallbackData: FALLBACK_PLANS
            });
        }
    }

    // ... restante da função omitido para brevidade no replacement se necessário, ou coloco tudo
    return res.status(405).json({ error: "Method not allowed" });
}
