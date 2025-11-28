const express = require('express');
const router = express.Router();
const ProfissionalController = require('../controllers/profissional.controller');
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
const profissionalValidation = [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('telefone').trim().notEmpty().withMessage('Telefone é obrigatório'),
    body('horaEntrada').optional().matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Hora de entrada inválida'),
    body('almoco').optional().matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Hora de almoço inválida'),
    body('horaSaida').optional().matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Hora de saída inválida'),
];

// Routes
router.get('/', ProfissionalController.getAll);
router.get('/:id', ProfissionalController.getById);
router.post('/', profissionalValidation, validate, ProfissionalController.create);
router.put('/:id', profissionalValidation, validate, ProfissionalController.update);
router.delete('/:id', ProfissionalController.delete);

module.exports = router;
