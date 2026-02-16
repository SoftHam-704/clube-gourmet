import pg from 'pg';
import 'dotenv/config';

async function checkColumns() {
    const client = new pg.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: false
    });
    try {
        await client.connect();
        const res = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_schema = 'emparclub' AND table_name = 'restaurantes'
            ORDER BY ordinal_position;
        `);
        console.table(res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        await client.end();
    }
}
checkColumns();
