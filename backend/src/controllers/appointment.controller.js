const AppointmentModel = require('../models/appointment.model');

class AppointmentController {
    static async getAll(req, res, next) {
        try {
            const filters = {
                idProfissional: req.query.idProfissional,
                idCliente: req.query.idCliente,
                data: req.query.data
            };
            const appointments = await AppointmentModel.getAll(filters);
            res.json({ success: true, data: appointments, count: appointments.length });
        } catch (error) {
            next(error);
        }
    }

    static async getById(req, res, next) {
        try {
            const appointment = await AppointmentModel.getById(req.params.id);
            if (!appointment) {
                return res.status(404).json({ success: false, message: 'Agendamento não encontrado' });
            }
            res.json({ success: true, data: appointment });
        } catch (error) {
            next(error);
        }
    }

    static async getByProfessional(req, res, next) {
        try {
            const appointments = await AppointmentModel.getByProfessional(req.params.id);
            res.json({ success: true, data: appointments, count: appointments.length });
        } catch (error) {
            next(error);
        }
    }

    static async getByClient(req, res, next) {
        try {
            const appointments = await AppointmentModel.getByClient(req.params.id);
            res.json({ success: true, data: appointments, count: appointments.length });
        } catch (error) {
            next(error);
        }
    }

    static async create(req, res, next) {
        try {
            const appointment = await AppointmentModel.create(req.body);
            res.status(201).json({ success: true, message: 'Agendamento criado com sucesso', data: appointment });
        } catch (error) {
            next(error);
        }
    }

    static async update(req, res, next) {
        try {
            const appointment = await AppointmentModel.update(req.params.id, req.body);
            if (!appointment) {
                return res.status(404).json({ success: false, message: 'Agendamento não encontrado' });
            }
            res.json({ success: true, message: 'Agendamento atualizado com sucesso', data: appointment });
        } catch (error) {
            next(error);
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const { idStatus } = req.body;
            const appointment = await AppointmentModel.updateStatus(req.params.id, idStatus);
            if (!appointment) {
                return res.status(404).json({ success: false, message: 'Agendamento não encontrado' });
            }
            res.json({ success: true, message: 'Status atualizado com sucesso', data: appointment });
        } catch (error) {
            next(error);
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await AppointmentModel.delete(req.params.id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AppointmentController;
