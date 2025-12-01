const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importa conexão com banco de dados
require('./config/database');

// Importa middleware
const errorHandler = require('./middleware/error.middleware');

// Importa rotas
const profissionalRoutes = require('./routes/profissional.routes');
const servicoRoutes = require('./routes/servico.routes');
const clienteRoutes = require('./routes/cliente.routes');
const agendamentoRoutes = require('./routes/agendamento.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// CORS verifica se a origem é permitida
app.use(cors());
// Função do Express que interpreta o JSON (se tiver)
app.use(express.json());
// Função do Express que interpreta a URL
app.use(express.urlencoded({ extended: true }));

// Log de requisições (para debug)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // passa para o próximo middleware
});

// Rotas
// Express identifica que a rota começa com /api/(qualquer rota abaixo)
// e direciona para a rota correspondente (profissionalRoutes, servicoRoutes, clienteRoutes, agendamentoRoutes)
app.use('/api/profissionais', profissionalRoutes);
app.use('/api/servicos', servicoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/agendamentos', agendamentoRoutes);

// Verificação de status (Health Check)
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API está funcionando!' });
});

// Middleware de tratamento de erros (deve ser o último)
app.use(errorHandler);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`\nServidor rodando na porta ${PORT}`);
    console.log(`API disponível em: http://localhost:${PORT}/api`);
    console.log(`\nTestes de API:\n`);
    console.log(`Ver Status: http://localhost:${PORT}/api/health`);
    console.log(`GET Profissionais: http://localhost:${PORT}/api/profissionais`);
    console.log(`GET Servicos: http://localhost:${PORT}/api/servicos`);
    console.log(`GET Clientes: http://localhost:${PORT}/api/clientes`);
    console.log(`GET Agendamentos: http://localhost:${PORT}/api/agendamentos`);
});

module.exports = app;
