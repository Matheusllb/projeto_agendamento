const db = require('../config/database');

class ServicoModel {
    static async buscarTodos() {
        const [rows] = await db.query(
            'SELECT * FROM SERVICOS WHERE ATIVO = 1 ORDER BY NOME'
        );
        return rows.map(this.formatServico);
    }

    static async buscarPorId(id) {
        const [rows] = await db.query(
            'SELECT * FROM SERVICOS WHERE IDSERVICOS = ?',
            [id]
        );
        return rows.length > 0 ? this.formatServico(rows[0]) : null;
    }

    static async criar(data) {
        const { idEstabelecimento, idTipoPrecificacao, nome, descricao, preco, duracao, diasFuturosAgendamento } = data;

        const [result] = await db.query(
            `INSERT INTO SERVICOS 
            (IDESTABELECIMENTO, IDTIPOPRECIFICACAO, NOME, DESCRICAO, PRECO, DURACAO, DIASFUTUROSAGENDAMENTO, ATIVO) 
            VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
            [idEstabelecimento || 1, idTipoPrecificacao || 1, nome, descricao, preco, duracao, diasFuturosAgendamento || null]
        );

        return this.buscarPorId(result.insertId);
    }

    static async alterar(id, data) {
        const { idEstabelecimento, idTipoPrecificacao, nome, descricao, preco, duracao, diasFuturosAgendamento, ativo } = data;

        await db.query(
            `UPDATE SERVICOS 
            SET IDESTABELECIMENTO = ?, IDTIPOPRECIFICACAO = ?, NOME = ?, DESCRICAO = ?, 
                PRECO = ?, DURACAO = ?, DIASFUTUROSAGENDAMENTO = ?, ATIVO = ?
            WHERE IDSERVICOS = ?`,
            [idEstabelecimento, idTipoPrecificacao, nome, descricao, preco, duracao, diasFuturosAgendamento, ativo !== undefined ? ativo : 1, id]
        );

        return this.buscarPorId(id);
    }

    static async excluir(id) {
        await db.query('UPDATE SERVICOS SET ATIVO = 0 WHERE IDSERVICOS = ?', [id]);
        return { success: true, message: 'Serviço desativado com sucesso' };
    }

    static formatServico(row) {
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

module.exports = ServicoModel;
