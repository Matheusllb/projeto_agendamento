const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/cliente.controller');
const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

const clienteValidation = [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('telefone').trim().notEmpty().withMessage('Telefone é obrigatório'),
    body('email').optional().isEmail().withMessage('Email inválido'),
];

router.get('/', ClienteController.getAll);
router.get('/:id', ClienteController.getById);
router.post('/', clienteValidation, validate, ClienteController.create);
router.put('/:id', clienteValidation, validate, ClienteController.update);
router.delete('/:id', ClienteController.delete);

module.exports = router;
