const ServiceModel = require('../models/service.model');

class ServiceController {
    static async getAll(req, res, next) {
        try {
            const services = await ServiceModel.getAll();
            res.json({ success: true, data: services, count: services.length });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const service = await ServiceModel.getById(req.params.id);
            if (!service) {
                return res.status(404).json({ success: false, message: 'Serviço não encontrado' });
            }
            res.json({ success: true, data: service });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const service = await ServiceModel.create(req.body);
            res.status(201).json({ success: true, message: 'Serviço criado com sucesso', data: service });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const service = await ServiceModel.update(req.params.id, req.body);
            if (!service) {
                return res.status(404).json({ success: false, message: 'Serviço não encontrado' });
            }
            res.json({ success: true, message: 'Serviço atualizado com sucesso', data: service });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await ServiceModel.delete(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ServiceController;
