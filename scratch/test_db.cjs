const postgres = require('postgres');
async function test() {
    console.log("Testing with ssl: 'require'...");
    try {
        const sql = postgres('postgres://webadmin:ytAyO0u043@node254557-salesmaster.sp1.br.saveincloud.net.br:13062/base_gourmet', {ssl: 'require', connect_timeout: 5});
        const res = await sql`SELECT 1`;
        console.log("Success 'require':", res);
        sql.end();
    } catch(e) { console.error("Error 'require':", e.message); }

    console.log("\nTesting with ssl: false...");
    try {
        const sql2 = postgres('postgres://webadmin:ytAyO0u043@node254557-salesmaster.sp1.br.saveincloud.net.br:13062/base_gourmet', {ssl: false, connect_timeout: 5});
        const res2 = await sql2`SELECT 1`;
        console.log("Success false:", res2);
        sql2.end();
    } catch(e) { console.error("Error false:", e.message); }
}
test();
