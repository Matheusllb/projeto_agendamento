# Backend API - Agenda +

## Configuração

### 1. Instalar Dependências
```bash
cd backend
npm install
```

### 2. Configurar Banco de Dados
Edite o arquivo `.env` com suas credenciais MySQL:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=db_sistema
DB_PORT=3306
PORT=3000
```

### 3. Criar Banco de Dados
Execute o script SQL fornecido para criar o banco `db_sistema` e suas tabelas.

### 4. Iniciar Servidor
```bash
npm start
```

O servidor estará disponível em `http://localhost:3000`

## Endpoints Disponíveis

### Profissionais
- `GET /api/professionals` - Listar todos
- `GET /api/professionals/:id` - Buscar por ID
- `POST /api/professionals` - Criar novo
- `PUT /api/professionals/:id` - Atualizar
- `DELETE /api/professionals/:id` - Desativar (soft delete)

### Serviços
- `GET /api/services` - Listar todos
- `GET /api/services/:id` - Buscar por ID
- `POST /api/services` - Criar novo
- `PUT /api/services/:id` - Atualizar
- `DELETE /api/services/:id` - Desativar

### Clientes
- `GET /api/clients` - Listar todos
- `GET /api/clients/:id` - Buscar por ID
- `POST /api/clients` - Criar novo
- `PUT /api/clients/:id` - Atualizar
- `DELETE /api/clients/:id` - Excluir

### Agendamentos
- `GET /api/appointments` - Listar todos (com filtros opcionais)
- `GET /api/appointments/:id` - Buscar por ID
- `GET /api/appointments/professional/:id` - Por profissional
- `GET /api/appointments/client/:id` - Por cliente
- `POST /api/appointments` - Criar novo
- `PUT /api/appointments/:id` - Atualizar
- `PATCH /api/appointments/:id/status` - Atualizar status
- `DELETE /api/appointments/:id` - Cancelar

## Testando a API

### Health Check
```bash
curl http://localhost:3000/api/health
```

### Criar Cliente
```bash
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","telefone":"11999999999","email":"joao@email.com"}'
```

### Listar Profissionais
```bash
curl http://localhost:3000/api/professionals
```
