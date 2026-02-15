import pg from 'pg';

const dbConfig = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

const FAMILY_PLANS = [
    {
        id: "family-monthly",
        name: "Família Mensal",
        price: 159.64, // 39.91 * 4 (baseado no frontend)
        description: "Quanto mais pessoas, maior o desconto!",
        active: true,
        duration_months: 1,
        type: 'family'
    },
    {
        id: "family-quarterly",
        name: "Família Trimestral",
        price: 406.92, // 33.91 * 4 * 3
        description: "Economia real pra todo mundo!",
        active: true,
        duration_months: 3,
        type: 'family'
    },
    {
        id: "family-semiannual",
        name: "Família Semestral",
        price: 735.84, // 30.66 * 4 * 6
        description: "Economia de verdade para sua família!",
        active: true,
        duration_months: 6,
        type: 'family'
    },
    {
        id: "family-annual",
        name: "Família Anual",
        price: 1342.08, // 27.96 * 4 * 12
        description: "🚀 Plano mais vantajoso familiar",
        active: true,
        duration_months: 12,
        type: 'family'
    },
];

async function seedFamilyPlans() {
    const client = new pg.Client(dbConfig);
    try {
        await client.connect();
        console.log('Adicionando coluna "type" e semeando planos família...');

        await client.query("ALTER TABLE emparclub.plans ADD COLUMN IF NOT EXISTS type VARCHAR(20) DEFAULT 'individual'");

        for (const plan of FAMILY_PLANS) {
            await client.query(`
        INSERT INTO emparclub.plans (id, name, description, price, duration_months, active, type)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          duration_months = EXCLUDED.duration_months,
          active = EXCLUDED.active,
          type = EXCLUDED.type;
      `, [plan.id, plan.name, plan.description, plan.price, plan.duration_months, plan.active, plan.type]);
        }

        console.log('Planos família semeados com sucesso!');
    } catch (err) {
        console.error('Erro ao semear planos família:', err.message);
    } finally {
        await client.end();
    }
}

seedFamilyPlans();
