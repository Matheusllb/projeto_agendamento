const ProfessionalModel = require('../models/professional.model');

class ProfessionalController {
    // Get all professionals
    static async getAll(req, res, next) {
        try {
            const professionals = await ProfessionalModel.getAll();
            res.json({
                success: true,
                data: professionals,
                count: professionals.length
            });
        } catch (error) {
            next(error);
        }
    }

    // Get professional by ID
    static async getById(req, res, next) {
        try {
            const { id } = req.params;
            const professional = await ProfessionalModel.getById(id);

            if (!professional) {
                return res.status(404).json({
                    success: false,
                    message: 'Profissional não encontrado'
                });
            }

            res.json({
                success: true,
                data: professional
            });
        } catch (error) {
            next(error);
        }
    }

    // Create new professional
    static async create(req, res, next) {
        try {
            const professional = await ProfessionalModel.create(req.body);
            res.status(201).json({
                success: true,
                message: 'Profissional criado com sucesso',
                data: professional
            });
        } catch (error) {
            next(error);
        }
    }

    // Update professional
    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const professional = await ProfessionalModel.update(id, req.body);

            if (!professional) {
                return res.status(404).json({
                    success: false,
                    message: 'Profissional não encontrado'
                });
            }

            res.json({
                success: true,
                message: 'Profissional atualizado com sucesso',
                data: professional
            });
        } catch (error) {
            next(error);
        }
    }

    // Delete professional (soft delete)
    static async delete(req, res, next) {
        try {
            const { id } = req.params;
            const result = await ProfessionalModel.delete(id);
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProfessionalController;
