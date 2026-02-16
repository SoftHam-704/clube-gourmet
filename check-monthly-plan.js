
import pg from 'pg';

const connectionString = "postgres://webadmin:ytAyO0u043@node254557-salesmaster.sp1.br.saveincloud.net.br:13062/base_gourmet";

const pool = new pg.Pool({
    connectionString,
    ssl: false
});

async function checkMonthlyPlan() {
    try {
        const client = await pool.connect();
        const res = await client.query("SELECT * FROM emparclub.plans WHERE id = 'monthly'");
        console.log("Monthly Plan Data:", JSON.stringify(res.rows[0], null, 2));
        client.release();
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}

checkMonthlyPlan();
