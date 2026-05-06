import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgres://webadmin:ytAyO0u043@node254557-salesmaster.sp1.br.saveincloud.net.br:13062/base_gourmet',
  ssl: false,
  options: '-c search_path=emparclub,public -c lock_timeout=5000',
});

try {
  // Testar conexão básica
  const r1 = await pool.query("SELECT count(*) FROM emparclub.restaurantes WHERE ativo = true");
  console.log('✅ Contagem restaurantes ativos:', r1.rows[0].count);

  // Testar com a query exata do Drizzle
  const r2 = await pool.query(
    'SELECT id, nome, categoria, descricao, endereco, imagem_url, imagem_url_2, imagem_url_3, slug, destaque, ativo, cidade_slug, data_cadastro FROM emparclub.restaurantes WHERE ativo = $1',
    [true]
  );
  console.log('✅ Restaurantes:', JSON.stringify(r2.rows, null, 2));

} catch(e) {
  console.log('❌ ERRO:', e.message);
  console.log('DETALHE:', e);
} finally {
  await pool.end();
}
