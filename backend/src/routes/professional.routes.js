const express = require('express');
const router = express.Router();
const ProfessionalController = require('../controllers/professional.controller');
const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }
    next();
};

// Validation rules
const professionalValidation = [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('telefone').trim().notEmpty().withMessage('Telefone é obrigatório'),
    body('horaEntrada').optional().matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Hora de entrada inválida'),
    body('almoco').optional().matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Hora de almoço inválida'),
    body('horaSaida').optional().matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Hora de saída inválida'),
];

// Routes
router.get('/', ProfessionalController.getAll);
router.get('/:id', ProfessionalController.getById);
router.post('/', professionalValidation, validate, ProfessionalController.create);
router.put('/:id', professionalValidation, validate, ProfessionalController.update);
router.delete('/:id', ProfessionalController.delete);

module.exports = router;
