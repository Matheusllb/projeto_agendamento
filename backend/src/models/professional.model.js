const db = require('../config/database');

class ProfessionalModel {
    // Get all professionals
    static async getAll() {
        const [rows] = await db.query(
            'SELECT * FROM PROFISSIONAL WHERE ATIVO = 1 ORDER BY NOME'
        );
        return rows.map(this.formatProfessional);
    }

    // Get professional by ID
    static async getById(id) {
        const [rows] = await db.query(
            'SELECT * FROM PROFISSIONAL WHERE IDPROF = ?',
            [id]
        );
        return rows.length > 0 ? this.formatProfessional(rows[0]) : null;
    }

    // Create new professional
    static async create(data) {
        const { nome, telefone, horaEntrada, almoco, horaSaida, diasDaSemana, especialidades, foto, avaliacao } = data;

        const [result] = await db.query(
            `INSERT INTO PROFISSIONAL 
            (NOME, TELEFONE, ATIVO, DIASDASEMANA, HORAENTRADA, ALMOCO, HORASAIDA, FOTO, AVALIACAO, ESPECIALIDADES) 
            VALUES (?, ?, 1, ?, ?, ?, ?, ?, ?, ?)`,
            [
                nome,
                telefone,
                JSON.stringify(diasDaSemana || []),
                horaEntrada,
                almoco,
                horaSaida,
                foto || null,
                avaliacao || null,
                JSON.stringify(especialidades || [])
            ]
        );

        return this.getById(result.insertId);
    }

    // Update professional
    static async update(id, data) {
        const { nome, telefone, ativo, horaEntrada, almoco, horaSaida, diasDaSemana, especialidades, foto, avaliacao } = data;

        await db.query(
            `UPDATE PROFISSIONAL 
            SET NOME = ?, TELEFONE = ?, ATIVO = ?, DIASDASEMANA = ?, 
                HORAENTRADA = ?, ALMOCO = ?, HORASAIDA = ?, FOTO = ?, 
                AVALIACAO = ?, ESPECIALIDADES = ?
            WHERE IDPROF = ?`,
            [
                nome,
                telefone,
                ativo !== undefined ? ativo : 1,
                JSON.stringify(diasDaSemana || []),
                horaEntrada,
                almoco,
                horaSaida,
                foto || null,
                avaliacao || null,
                JSON.stringify(especialidades || []),
                id
            ]
        );

        return this.getById(id);
    }

    // Soft delete (set ATIVO = 0)
    static async delete(id) {
        await db.query(
            'UPDATE PROFISSIONAL SET ATIVO = 0 WHERE IDPROF = ?',
            [id]
        );
        return { success: true, message: 'Profissional desativado com sucesso' };
    }

    // Format professional data
    static formatProfessional(row) {
        return {
            idProf: row.IDPROF,
            nome: row.NOME,
            telefone: row.TELEFONE,
            ativo: Boolean(row.ATIVO),
            diasDaSemana: row.DIASDASEMANA ? JSON.parse(row.DIASDASEMANA) : [],
            horaEntrada: row.HORAENTRADA,
            almoco: row.ALMOCO,
            horaSaida: row.HORASAIDA,
            foto: row.FOTO,
            avaliacao: row.AVALIACAO,
            especialidades: row.ESPECIALIDADES ? JSON.parse(row.ESPECIALIDADES) : []
        };
    }
}

module.exports = ProfessionalModel;
