const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controllers/agendamento.controller');
const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

const agendamentoValidation = [
    body('idProfissional').isInt().withMessage('ID do profissional é obrigatório'),
    body('idCliente').isInt().withMessage('ID do cliente é obrigatório'),
    body('data').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Data inválida (formato: YYYY-MM-DD)'),
    body('horario').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Horário inválido (formato: HH:mm:ss)'),
];

router.get('/', AgendamentoController.buscarTodos);
router.get('/:id', AgendamentoController.buscarPorId);
router.get('/professional/:id', AgendamentoController.buscarPorProfissional);
router.get('/client/:id', AgendamentoController.buscarPorCliente);
router.post('/', agendamentoValidation, validate, AgendamentoController.criar);
router.put('/:id', agendamentoValidation, validate, AgendamentoController.atualizar);
router.patch('/:id/status', AgendamentoController.atualizarStatus);
router.delete('/:id', AgendamentoController.deletar);

module.exports = router;
