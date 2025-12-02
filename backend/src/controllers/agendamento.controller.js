const AgendamentoModel = require('../models/agendamento.model');

class AgendamentoController {
    static async buscarTodos(req, res, next) {
        try {
            const filters = {
                idProfissional: req.query.idProfissional,
                idCliente: req.query.idCliente,
                data: req.query.data
            };
            const agendamentos = await AgendamentoModel.buscarTodos(filters);
            res.json({ success: true, data: agendamentos, count: agendamentos.length });
        } catch (error) {
            next(error);
        }
    }

    static async buscarPorId(req, res, next) {
        try {
            const agendamento = await AgendamentoModel.buscarPorId(req.params.id);
            if (!agendamento) {
                return res.status(404).json({ success: false, message: 'Agendamento não encontrado' });
            }
            res.json({ success: true, data: agendamento });
        } catch (error) {
            next(error);
        }
    }

    static async buscarPorProfissional(req, res, next) {
        try {
            const agendamentos = await AgendamentoModel.buscarPorProfissional(req.params.id);
            res.json({ success: true, data: agendamentos, count: agendamentos.length });
        } catch (error) {
            next(error);
        }
    }

    static async buscarPorCliente(req, res, next) {
        try {
            const agendamentos = await AgendamentoModel.buscarPorCliente(req.params.id);
            res.json({ success: true, data: agendamentos, count: agendamentos.length });
        } catch (error) {
            next(error);
        }
    }

    static async criar(req, res, next) {
        try {
            const agendamento = await AgendamentoModel.criar(req.body);
            res.status(201).json({ success: true, message: 'Agendamento criado com sucesso', data: agendamento });
        } catch (error) {
            next(error);
        }
    }

    static async alterar(req, res, next) {
        try {
            const agendamento = await AgendamentoModel.alterar(req.params.id, req.body);
            if (!agendamento) {
                return res.status(404).json({ success: false, message: 'Agendamento não encontrado' });
            }
            res.json({ success: true, message: 'Agendamento atualizado com sucesso', data: agendamento });
        } catch (error) {
            next(error);
        }
    }

    static async atualizarStatus(req, res, next) {
        try {
            const { idStatus } = req.body;
            const agendamento = await AgendamentoModel.atualizarStatus(req.params.id, idStatus);
            if (!agendamento) {
                return res.status(404).json({ success: false, message: 'Agendamento não encontrado' });
            }
            res.json({ success: true, message: 'Status atualizado com sucesso', data: agendamento });
        } catch (error) {
            next(error);
        }
    }

    static async deletar(req, res, next) {
        try {
            const result = await AgendamentoModel.excluir(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AgendamentoController;
