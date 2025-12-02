const ProfissionalModel = require('../models/profissional.model');

class ProfissionalController {
    // Buscar todos os profissionais
    static async buscarTodos(req, res, next) {
        try {
            const profissionais = await ProfissionalModel.buscarTodos();
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
    static async buscarPorId(req, res, next) {
        try {
            const { id } = req.params;
            const profissional = await ProfissionalModel.buscarPorId(id);

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
    static async criar(req, res, next) {
        try {
            const profissional = await ProfissionalModel.criar(req.body);
            res.status(201).json({
                success: true,
                message: 'Profissional criado com sucesso',
                data: profissional
            });
        } catch (error) {
            next(error);
        }
    }

    // Alterar profissional
    static async alterar(req, res, next) {
        try {
            const { id } = req.params;
            const profissional = await ProfissionalModel.alterar(id, req.body);

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
    static async deletar(req, res, next) {
        try {
            const { id } = req.params;
            const result = await ProfissionalModel.excluir(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProfissionalController;
