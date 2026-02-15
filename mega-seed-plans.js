import pg from 'pg';

const dbConfig = {
    host: 'node254557-salesmaster.sp1.br.saveincloud.net.br',
    port: 13062,
    database: 'base_gourmet',
    user: 'webadmin',
    password: 'ytAyO0u043',
};

const ALL_PLANS = [
    // Individuais
    { id: "monthly", name: "Plano Mensal", description: "Ideal para quem quer começar agora", price: 49.90, duration_months: 1, type: "individual", active: true },
    { id: "quarterly", name: "Plano Trimestral", description: "Economize pagando por mais tempo", price: 119.70, duration_months: 3, type: "individual", active: true },
    { id: "semiannual", name: "Plano Semestral", description: "O equilíbrio perfeito entre preço e duração", price: 215.40, duration_months: 6, type: "individual", active: true },
    { id: "annual", name: "Plano Anual", description: "🚀 Melhor preço do ano — máxima economia", price: 394.80, duration_months: 12, type: "individual", active: true },
    // Família
    { id: "family-monthly", name: "Família Mensal", description: "Quanto mais pessoas, maior o desconto!", price: 159.64, duration_months: 1, type: "family", active: true },
    { id: "family-quarterly", name: "Família Trimestral", description: "Economia real pra todo mundo!", price: 135.64, duration_months: 3, type: "family", active: true },
    { id: "family-semiannual", name: "Família Semestral", description: "Economia de verdade para sua família!", price: 122.64, duration_months: 6, type: "family", active: true },
    { id: "family-annual", name: "Família Anual", description: "🚀 Plano mais vantajoso familiar", price: 111.84, duration_months: 12, type: "family", active: true }
];

async function seed() {
    const client = new pg.Client(dbConfig);
    try {
        await client.connect();
        console.log('🌱 Populando tabela de planos...');

        for (const plan of ALL_PLANS) {
            await client.query(`
        INSERT INTO emparclub.plans (id, name, description, price, duration_months, type, active)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          description = EXCLUDED.description,
          price = EXCLUDED.price,
          duration_months = EXCLUDED.duration_months,
          type = EXCLUDED.type,
          active = EXCLUDED.active;
      `, [plan.id, plan.name, plan.description, plan.price, plan.duration_months, plan.type, plan.active]);
        }

        console.log('✅ Banco de dados populado com sucesso!');
    } catch (err) {
        console.error('❌ Erro no seed:', err.message);
    } finally {
        await client.end();
    }
}

seed();
