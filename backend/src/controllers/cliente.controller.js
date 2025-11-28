const ClienteModel = require('../models/cliente.model');

class ClienteController {
    static async getAll(req, res, next) {
        try {
            const clientes = await ClienteModel.getAll();
            res.json({ success: true, data: clientes, count: clientes.length });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const cliente = await ClienteModel.getById(req.params.id);
            if (!cliente) {
                return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
            }
            res.json({ success: true, data: cliente });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const cliente = await ClienteModel.create(req.body);
            res.status(201).json({ success: true, message: 'Cliente criado com sucesso', data: cliente });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const cliente = await ClienteModel.update(req.params.id, req.body);
            if (!cliente) {
                return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
            }
            res.json({ success: true, message: 'Cliente atualizado com sucesso', data: cliente });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await ClienteModel.delete(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ClienteController;
