import pg from 'pg';
import 'dotenv/config';

async function checkTables() {
    const client = new pg.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: false
    });
    try {
        await client.connect();
        const tables = ['usuarios', 'beneficios_resgatados', 'subscriptions'];
        for (const table of tables) {
            console.log(`--- Table: emparclub.${table} ---`);
            const res = await client.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_schema = 'emparclub' AND table_name = '${table}'
                ORDER BY ordinal_position;
            `);
            console.table(res.rows);
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
checkTables();
