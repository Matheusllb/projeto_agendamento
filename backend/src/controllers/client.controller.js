const ClientModel = require('../models/client.model');

class ClientController {
    static async getAll(req, res, next) {
        try {
            const clients = await ClientModel.getAll();
            res.json({ success: true, data: clients, count: clients.length });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const client = await ClientModel.getById(req.params.id);
            if (!client) {
                return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
            }
            res.json({ success: true, data: client });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const client = await ClientModel.create(req.body);
            res.status(201).json({ success: true, message: 'Cliente criado com sucesso', data: client });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const client = await ClientModel.update(req.params.id, req.body);
            if (!client) {
                return res.status(404).json({ success: false, message: 'Cliente não encontrado' });
            }
            res.json({ success: true, message: 'Cliente atualizado com sucesso', data: client });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await ClientModel.delete(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ClientController;
