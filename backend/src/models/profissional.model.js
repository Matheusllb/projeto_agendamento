const db = require('../config/database');

class ProfissionalModel {
    // Buscar todos os profissionais
    static async buscarTodos() {
        const [rows] = await db.query(
            'SELECT * FROM PROFISSIONAL WHERE ATIVO = 1 ORDER BY NOME'
        );
        return rows.map(row => this.formatProfissional(row));
    }

    // Buscar profissional por ID
    static async buscarPorId(id) {
        const [rows] = await db.query(
            'SELECT * FROM PROFISSIONAL WHERE IDPROF = ?',
            [id]
        );
        return rows.length > 0 ? this.formatProfissional(rows[0]) : null;
    }

    // Criar novo profissional
    static async criar(data) {
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

        return this.buscarPorId(result.insertId);
    }

    // Alterar profissional
    static async alterar(id, data) {
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

        return this.buscarPorId(id);
    }

    // Exclusão lógica (define ATIVO = 0)
    static async excluir(id) {
        await db.query(
            'UPDATE PROFISSIONAL SET ATIVO = 0 WHERE IDPROF = ?',
            [id]
        );
        return { success: true, message: 'Profissional desativado com sucesso' };
    }

    // Função helper para fazer parse seguro de JSON
    static safeJSONParse(value, defaultValue = []) {
        if (!value) return defaultValue;

        // Se já for um array ou objeto, retorna diretamente (MySQL2 faz parse automático)
        if (typeof value === 'object') {
            return value;
        }

        // Se for string, tenta fazer parse
        if (typeof value === 'string') {
            try {
                return JSON.parse(value);
            } catch (error) {
                // Se falhar, tenta tratar como string separada por vírgula
                const cleaned = value.replace(/[\[\]"]/g, '').trim();
                if (cleaned) {
                    return cleaned.split(',').map(item => item.trim()).filter(item => item);
                }
            }
        }

        return defaultValue;
    }

    // Formatar dados do profissional
    static formatProfissional(row) {
        return {
            idProf: row.IDPROF,
            nome: row.NOME,
            telefone: row.TELEFONE,
            ativo: Boolean(row.ATIVO),
            diasDaSemana: this.safeJSONParse(row.DIASDASEMANA, []),
            horaEntrada: row.HORAENTRADA,
            almoco: row.ALMOCO,
            horaSaida: row.HORASAIDA,
            foto: row.FOTO,
            avaliacao: row.AVALIACAO,
            especialidades: this.safeJSONParse(row.ESPECIALIDADES, [])
        };
    }
}

module.exports = ProfissionalModel;
