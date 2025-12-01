const db = require('../config/database');

class ClienteModel {
    static async getAll() {
        // Executa a query SQL
        const [rows] = await db.query('SELECT * FROM CLIENTE ORDER BY NOME');
        // Formata cada linha do resultado
        return rows.map(this.formatCliente);
    }

    static async getById(id) {
        // Executa a query SQL
        const [rows] = await db.query('SELECT * FROM CLIENTE WHERE IDCLIENTE = ?', [id]);
        return rows.length > 0 ? this.formatCliente(rows[0]) : null;
    }

    static async create(data) {
        const { nome, telefone, email, observacoes } = data;

        const [result] = await db.query(
            'INSERT INTO CLIENTE (NOME, TELEFONE, EMAIL, OBSERVACOES) VALUES (?, ?, ?, ?)',
            [nome, telefone, email || null, observacoes || null]
        );

        return this.getById(result.insertId);
    }

    static async update(id, data) {
        const { nome, telefone, email, observacoes } = data;

        await db.query(
            'UPDATE CLIENTE SET NOME = ?, TELEFONE = ?, EMAIL = ?, OBSERVACOES = ? WHERE IDCLIENTE = ?',
            [nome, telefone, email || null, observacoes || null, id]
        );

        return this.getById(id);
    }

    static async delete(id) {
        await db.query('DELETE FROM CLIENTE WHERE IDCLIENTE = ?', [id]);
        return { success: true, message: 'Cliente excluído com sucesso' };
    }

    static formatCliente(row) {
        return {
            // Converte os nomes das colunas do MySQL (MAIÚSCULAS)
            // para camelCase (padrão JavaScript)   
            idCliente: row.IDCLIENTE,
            nome: row.NOME,
            telefone: row.TELEFONE,
            email: row.EMAIL,
            observacoes: row.OBSERVACOES
        };
    }
}

module.exports = ClienteModel;
