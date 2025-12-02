const ServicoModel = require('../models/servico.model');

class ServicoController {
    static async buscarTodos(req, res, next) {
        try {
            const servicos = await ServicoModel.buscarTodos();
            res.json({ success: true, data: servicos, count: servicos.length });
        } catch (error) {
            next(error);
        }
    }

    static async buscarPorId(req, res, next) {
        try {
            const servico = await ServicoModel.buscarPorId(req.params.id);
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
            const servico = await ServicoModel.criar(req.body);
            res.status(201).json({ success: true, message: 'Serviço criado com sucesso', data: servico });
        } catch (error) {
            next(error);
        }
    }

    static async alterar(req, res, next) {
        try {
            const servico = await ServicoModel.alterar(req.params.id, req.body);
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
            const result = await ServicoModel.excluir(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ServicoController;
