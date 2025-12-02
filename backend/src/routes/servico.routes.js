const express = require('express');
const router = express.Router();
const ServicoController = require('../controllers/servico.controller');
const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

const servicoValidation = [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('descricao').trim().notEmpty().withMessage('Descrição é obrigatória'),
    body('preco').isFloat({ min: 0 }).withMessage('Preço deve ser maior ou igual a 0'),
    body('duracao').isInt({ min: 1 }).withMessage('Duração deve ser maior que 0'),
];

router.get('/', ServicoController.buscarTodos);
router.get('/:id', ServicoController.buscarPorId);
router.post('/', servicoValidation, validate, ServicoController.criar);
router.put('/:id', servicoValidation, validate, ServicoController.alterar);
router.delete('/:id', ServicoController.deletar);

module.exports = router;
