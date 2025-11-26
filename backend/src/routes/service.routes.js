const express = require('express');
const router = express.Router();
const ServiceController = require('../controllers/service.controller');
const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

const serviceValidation = [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('descricao').trim().notEmpty().withMessage('Descrição é obrigatória'),
    body('preco').isFloat({ min: 0 }).withMessage('Preço deve ser maior ou igual a 0'),
    body('duracao').isInt({ min: 1 }).withMessage('Duração deve ser maior que 0'),
];

router.get('/', ServiceController.getAll);
router.get('/:id', ServiceController.getById);
router.post('/', serviceValidation, validate, ServiceController.create);
router.put('/:id', serviceValidation, validate, ServiceController.update);
router.delete('/:id', ServiceController.delete);

module.exports = router;
