const express = require('express');
const router = express.Router();
const AppointmentController = require('../controllers/appointment.controller');
const { body, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
};

const appointmentValidation = [
    body('idProfissional').isInt().withMessage('ID do profissional é obrigatório'),
    body('idCliente').isInt().withMessage('ID do cliente é obrigatório'),
    body('data').matches(/^\d{4}-\d{2}-\d{2}$/).withMessage('Data inválida (formato: YYYY-MM-DD)'),
    body('horario').matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/).withMessage('Horário inválido (formato: HH:mm:ss)'),
];

router.get('/', AppointmentController.getAll);
router.get('/:id', AppointmentController.getById);
router.get('/professional/:id', AppointmentController.getByProfessional);
router.get('/client/:id', AppointmentController.getByClient);
router.post('/', appointmentValidation, validate, AppointmentController.create);
router.put('/:id', appointmentValidation, validate, AppointmentController.update);
router.patch('/:id/status', AppointmentController.updateStatus);
router.delete('/:id', AppointmentController.delete);

module.exports = router;
