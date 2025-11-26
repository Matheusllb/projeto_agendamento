const db = require('../config/database');

class ServiceModel {
    static async getAll() {
        const [rows] = await db.query(
            'SELECT * FROM SERVICOS WHERE ATIVO = 1 ORDER BY NOME'
        );
        return rows.map(this.formatService);
    }

    static async getById(id) {
        const [rows] = await db.query(
            'SELECT * FROM SERVICOS WHERE IDSERVICOS = ?',
            [id]
        );
        return rows.length > 0 ? this.formatService(rows[0]) : null;
    }

    static async create(data) {
        const { idEstabelecimento, idTipoPrecificacao, nome, descricao, preco, duracao, diasFuturosAgendamento } = data;

        const [result] = await db.query(
            `INSERT INTO SERVICOS 
            (IDESTABELECIMENTO, IDTIPOPRECIFICACAO, NOME, DESCRICAO, PRECO, DURACAO, DIASFUTUROSAGENDAMENTO, ATIVO) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
            [idEstabelecimento || 1, idTipoPrecificacao || 1, nome, descricao, preco, duracao, diasFuturosAgendamento || null]
        );

        return this.getById(result.insertId);
    }

    static async update(id, data) {
        const { idEstabelecimento, idTipoPrecificacao, nome, descricao, preco, duracao, diasFuturosAgendamento, ativo } = data;

        await db.query(
            `UPDATE SERVICOS 
            SET IDESTABELECIMENTO = ?, IDTIPOPRECIFICACAO = ?, NOME = ?, DESCRICAO = ?, 
                PRECO = ?, DURACAO = ?, DIASFUTUROSAGENDAMENTO = ?, ATIVO = ?
            WHERE IDSERVICOS = ?`,
            [idEstabelecimento, idTipoPrecificacao, nome, descricao, preco, duracao, diasFuturosAgendamento, ativo !== undefined ? ativo : 1, id]
        );

        return this.getById(id);
    }

    static async delete(id) {
        await db.query('UPDATE SERVICOS SET ATIVO = 0 WHERE IDSERVICOS = ?', [id]);
        return { success: true, message: 'Serviço desativado com sucesso' };
    }

    static formatService(row) {
        return {
            idServicos: row.IDSERVICOS,
            idEstabelecimento: row.IDESTABELECIMENTO,
            idTipoPrecificacao: row.IDTIPOPRECIFICACAO,
            nome: row.NOME,
            descricao: row.DESCRICAO,
            preco: parseFloat(row.PRECO),
            duracao: row.DURACAO,
            diasFuturosAgendamento: row.DIASFUTUROSAGENDAMENTO,
            ativo: Boolean(row.ATIVO)
        };
    }
}

module.exports = ServiceModel;
