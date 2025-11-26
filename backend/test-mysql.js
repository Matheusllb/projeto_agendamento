const mysql = require('mysql2/promise');
require('dotenv').config();

async function testQuery() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    });

    try {
        const [rows] = await connection.query('SELECT * FROM PROFISSIONAL WHERE ATIVO = 1 LIMIT 1');
        console.log('Raw data from MySQL:');
        console.log(JSON.stringify(rows, null, 2));
        console.log('\nDIASDA SEMANA field:');
        console.log('Type:', typeof rows[0].DIASDASEMANA);
        console.log('Value:', rows[0].DIASDASEMANA);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

testQuery();
