const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar conexão com banco de dados
require('./config/database');

// Importar middleware
const errorHandler = require('./middleware/error.middleware');

// Importar rotas
const profissionalRoutes = require('./routes/profissional.routes');
const servicoRoutes = require('./routes/servico.routes');
const clienteRoutes = require('./routes/cliente.routes');
const agendamentoRoutes = require('./routes/agendamento.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api/profissionais', profissionalRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

// Verificação de saúde
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API is running' });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`API disponível em http://localhost:${PORT}/api`);
});

module.exports = app;
