const ServicoModel = require('../models/servico.model');

class ServicoController {
    static async buscarTodos(req, res, next) {
        try {
            const servicos = await ServicoModel.getAll();
            res.json({ success: true, data: servicos, count: servicos.length });
        } catch (error) {
            next(error);
        }
    }

    static async buscarPorId(req, res, next) {
        try {
            const servico = await ServicoModel.getById(req.params.id);
            if (!servico) {
                return res.status(404).json({ success: false, message: 'Serviço não encontrado' });
            }
            res.json({ success: true, data: servico });
        } catch (error) {
            next(error);
        }
    }

    static async criar(req, res, next) {
        try {
            const servico = await ServicoModel.create(req.body);
            res.status(201).json({ success: true, message: 'Serviço criado com sucesso', data: servico });
        } catch (error) {
            next(error);
        }
    }

    static async atualizar(req, res, next) {
        try {
            const servico = await ServicoModel.update(req.params.id, req.body);
            if (!servico) {
                return res.status(404).json({ success: false, message: 'Serviço não encontrado' });
            }
            res.json({ success: true, message: 'Serviço atualizado com sucesso', data: servico });
        } catch (error) {
            next(error);
        }
    }

    static async deletar(req, res, next) {
        try {
            const result = await ServicoModel.delete(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ServicoController;
