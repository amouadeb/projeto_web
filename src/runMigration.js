// runMigration.js (src/runMigration.js)
const fs   = require('fs');
const path = require('path');
const db   = require('./config/db');

// caminho = …/projeto_web/scripts/migrations
const migrationsDir = path.resolve(__dirname, '..', 'scripts', 'migrations');

const files = fs
  .readdirSync(migrationsDir)
  .filter(file => file.endsWith('.sql'))   //
  .sort();

(async () => {
  try {
    for (const file of files) {
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      console.log(`🔄 Executando: ${file}`);
      await db.query(sql);
    }
    console.log('✅ Todas as migrações foram aplicadas com sucesso!');
  } catch (err) {
    console.error('❌ Erro ao executar migração:', err.message);
    process.exitCode = 1;
  } finally {
    db.end?.();   // encerra o pool se quiser
  }
})();
