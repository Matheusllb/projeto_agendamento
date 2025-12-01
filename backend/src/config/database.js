const mysql = require('mysql2/promise');
require('dotenv').config();

// Criação de pool de conexão através do arquivo .env
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    charset: 'utf8mb4'
});

// Teste de conexão
pool.getConnection()
    .then(connection => {
        console.log('\nConexão com o Banco de Dados estabelecida com sucesso!\n');
        connection.release();
    })
    .catch(err => {
        console.error('\nErro ao conectar ao MySQL:\n', err.message);
        process.exit(1);
    });

module.exports = pool;
