const pg = require('pg');
const pool = new pg.Pool({
    connectionString: "postgres://webadmin:ytAyO0u043@node254557-salesmaster.sp1.br.saveincloud.net.br:13062/base_gourmet",
    ssl: false
});

async function test() {
    try {
        const client = await pool.connect();
        console.log("Checking cities table...");
        const res = await client.query("SELECT EXists (SELECT FROM information_schema.tables WHERE table_schema = 'emparclub' AND table_name = 'cities')");
        console.log("Cities table exists:", res.rows[0].exists);
        client.release();
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await pool.end();
    }
}
test();
