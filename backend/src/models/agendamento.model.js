const db = require('../config/database');

class AgendamentoModel {
    static async getAll(filters = {}) {
        let query = `
            SELECT a.*, 
                   p.NOME as profissionalNome, 
                   c.NOME as clienteNome,
                   s.NOME as statusNome
            FROM AGENDAMENTO a
            LEFT JOIN PROFISSIONAL p ON a.IDPROFISSIONAL = p.IDPROF
            LEFT JOIN CLIENTE c ON a.IDCLIENTE = c.IDCLIENTE
            LEFT JOIN STATUS s ON a.IDSTATUS = s.IDSTATUS
            WHERE 1=1
        `;
        const params = [];

        if (filters.idProfissional) {
            query += ' AND a.IDPROFISSIONAL = ?';
            params.push(filters.idProfissional);
        }

        if (filters.idCliente) {
            query += ' AND a.IDCLIENTE = ?';
            params.push(filters.idCliente);
        }

        if (filters.data) {
            query += ' AND a.DATA = ?';
            params.push(filters.data);
        }

        query += ' ORDER BY a.DATA DESC, a.HORARIO DESC';

        const [rows] = await db.query(query, params);
        return rows.map(this.formatAgendamento);
    }

    static async getById(id) {
        const [rows] = await db.query(`
            SELECT a.*, 
                   p.NOME as profissionalNome, 
                   c.NOME as clienteNome,
                   s.NOME as statusNome
            FROM AGENDAMENTO a
            LEFT JOIN PROFISSIONAL p ON a.IDPROFISSIONAL = p.IDPROF
            LEFT JOIN CLIENTE c ON a.IDCLIENTE = c.IDCLIENTE
            LEFT JOIN STATUS s ON a.IDSTATUS = s.IDSTATUS
            WHERE a.IDAGENDAMENTO = ?
        `, [id]);
        return rows.length > 0 ? this.formatAgendamento(rows[0]) : null;
    }

    static async getByProfessional(idProfissional) {
        return this.getAll({ idProfissional });
    }

    static async getByClient(idCliente) {
        return this.getAll({ idCliente });
    }

    static async create(data) {
        const {
            idProfissional, idCliente, idStatus, data: dataAgendamento, horario,
            observacoes, preco, precoVariavel, pago
        } = data;

        const [result] = await db.query(`
            INSERT INTO AGENDAMENTO 
            (IDPROFISSIONAL, IDCLIENTE, IDSTATUS, DATA, HORARIO, OBSERVACOES, 
             PAUSADO, PRECO, PRECOVARIAVEL, PAGO, ENVIADOLEMBRETE)
            VALUES (?, ?, ?, ?, ?, ?, 0, ?, ?, ?, 0)
        `, [
            idProfissional,
            idCliente,
            idStatus || 1,
            dataAgendamento,
            horario,
            observacoes || null,
            preco || null,
            precoVariavel ? 1 : 0,
            pago ? 1 : 0
        ]);

        return this.getById(result.insertId);
    }

    static async update(id, data) {
        const {
            idProfissional, idCliente, idStatus, data: dataAgendamento, horario,
            observacoes, preco, precoVariavel, pago, pausado
        } = data;

        await db.query(`
            UPDATE AGENDAMENTO 
            SET IDPROFISSIONAL = ?, IDCLIENTE = ?, IDSTATUS = ?, DATA = ?, HORARIO = ?,
                OBSERVACOES = ?, PRECO = ?, PRECOVARIAVEL = ?, PAGO = ?, PAUSADO = ?
            WHERE IDAGENDAMENTO = ?
        `, [
            idProfissional,
            idCliente,
            idStatus,
            dataAgendamento,
            horario,
            observacoes || null,
            preco || null,
            precoVariavel ? 1 : 0,
            pago ? 1 : 0,
            pausado ? 1 : 0,
            id
        ]);

        return this.getById(id);
    }

    static async updateStatus(id, idStatus) {
        await db.query('UPDATE AGENDAMENTO SET IDSTATUS = ? WHERE IDAGENDAMENTO = ?', [idStatus, id]);
        return this.getById(id);
    }

    static async delete(id) {
        await db.query('DELETE FROM AGENDAMENTO WHERE IDAGENDAMENTO = ?', [id]);
        return { success: true, message: 'Agendamento cancelado com sucesso' };
    }

    static formatAgendamento(row) {
        return {
            idAgendamento: row.IDAGENDAMENTO,
            idProfissional: row.IDPROFISSIONAL,
            idCliente: row.IDCLIENTE,
            idStatus: row.IDSTATUS,
            data: row.DATA,
            horario: row.HORARIO,
            agendamentoInicio: row.AGENDAMENTOINICIO,
            fim: row.FIM,
            duracao: row.DURACAO,
            observacoes: row.OBSERVACOES,
            pausado: Boolean(row.PAUSADO),
            duracaoPausa: row.DURACAOPAUSA,
            inicioPausa: row.INICIOPAUSA,
            preco: row.PRECO ? parseFloat(row.PRECO) : null,
            precoVariavel: Boolean(row.PRECOVARIAVEL),
            pago: Boolean(row.PAGO),
            enviadoLembrete: Boolean(row.ENVIADOLEMBRETE),
            enviadoConfirmacaoWhatsapp: row.ENVIADOCONFIRMACAOWHATSAPP,
            profissionalNome: row.profissionalNome,
            clienteNome: row.clienteNome,
            statusNome: row.statusNome
        };
    }
}

module.exports = AgendamentoModel;
