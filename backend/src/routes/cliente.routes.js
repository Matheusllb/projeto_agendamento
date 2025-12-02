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

// A rota GET / (que combinada com /api/clientes vira /api/clientes/)
router.get('/', ClienteController.buscarTodos);
// A rota GET /:id (que combinada com /api/clientes vira /api/clientes/:id)
router.get('/:id', ClienteController.buscarPorId);
// A rota POST / (que combinada com /api/clientes vira /api/clientes/)
router.post('/', clienteValidation, validate, ClienteController.criar);
// A rota PUT /:id (que combinada com /api/clientes vira /api/clientes/:id)
router.put('/:id', clienteValidation, validate, ClienteController.alterar);
// A rota DELETE /:id (que combinada com /api/clientes vira /api/clientes/:id)
router.delete('/:id', ClienteController.deletar);

module.exports = router;
