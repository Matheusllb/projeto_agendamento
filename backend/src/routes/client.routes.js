const express = require('express');
const router = express.Router();
const ClientController = require('../controllers/client.controller');
const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

const clientValidation = [
    body('nome').trim().notEmpty().withMessage('Nome é obrigatório'),
    body('telefone').trim().notEmpty().withMessage('Telefone é obrigatório'),
    body('email').optional().isEmail().withMessage('Email inválido'),
];

router.get('/', ClientController.getAll);
router.get('/:id', ClientController.getById);
router.post('/', clientValidation, validate, ClientController.create);
router.put('/:id', clientValidation, validate, ClientController.update);
router.delete('/:id', ClientController.delete);

module.exports = router;
