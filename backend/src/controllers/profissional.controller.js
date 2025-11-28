const ProfissionalModel = require('../models/profissional.model');

class ProfissionalController {
    // Buscar todos os profissionais
    static async getAll(req, res, next) {
        try {
            const profissionais = await ProfissionalModel.getAll();
            res.json({
                success: true,
                data: profissionais,
                count: profissionais.length
            });
        } catch (error) {
            next(error);
        }
    }

    // Buscar profissional por ID
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const profissional = await ProfissionalModel.getById(id);

            if (!profissional) {
                return res.status(404).json({
                    success: false,
                    message: 'Profissional não encontrado'
                });
            }

            res.json({
                success: true,
                data: profissional
            });
        } catch (error) {
            next(error);
        }
    }

    // Criar novo profissional
    static async create(req, res, next) {
        try {
            const profissional = await ProfissionalModel.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Profissional criado com sucesso',
                data: profissional
            });
        } catch (error) {
            next(error);
        }
    }

    // Atualizar profissional
    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const profissional = await ProfissionalModel.update(id, req.body);

            if (!profissional) {
                return res.status(404).json({
                    success: false,
                    message: 'Profissional não encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Profissional atualizado com sucesso',
                data: profissional
            });
        } catch (error) {
            next(error);
        }
    }

    // Excluir profissional (exclusão lógica)
    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const result = await ProfissionalModel.delete(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProfissionalController;
