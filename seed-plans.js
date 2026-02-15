import pg from 'pg';

const dbConfig = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

const PLANS = [
    {
        id: "monthly",
        name: "Plano Mensal",
        price: 49.90,
        description: "Ideal para quem quer começar agora",
        active: true,
        duration_months: 1
    },
    {
        id: "quarterly",
        name: "Plano Trimestral",
        price: 119.70,
        description: "Economize pagando por mais tempo",
        active: true,
        duration_months: 3
    },
    {
        id: "semiannual",
        name: "Plano Semestral",
        price: 215.40,
        description: "O equilíbrio perfeito entre preço e duração",
        active: true,
        duration_months: 6
    },
    {
        id: "annual",
        name: "Plano Anual",
        price: 394.80,
        description: "🚀 Melhor preço do ano — máxima economia",
        active: true,
        duration_months: 12
    },
];

async function seedPlans() {
    const client = new pg.Client(dbConfig);
    try {
        await client.connect();
        console.log('Semeando planos...');

        for (const plan of PLANS) {
            await client.query(`
        INSERT INTO emparclub.plans (id, name, description, price, duration_months, active)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          duration_months = EXCLUDED.duration_months,
          active = EXCLUDED.active;
      `, [plan.id, plan.name, plan.description, plan.price, plan.duration_months, plan.active]);
        }

        console.log('Planos semeados com sucesso!');
    } catch (err) {
        console.error('Erro ao semear planos:', err.message);
    } finally {
        await client.end();
    }
}

seedPlans();
