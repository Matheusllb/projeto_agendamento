# Manual do Backend

Esta pasta contém a lógica do servidor, API e conexão com o banco de dados.

## Propósito
Fornecer dados para o Frontend e persistir informações no banco de dados.

## Pastas e arquivos
- **src/**: Código fonte do servidor (Controllers, Routes, Config).
- **package.json e package-lock.json**: "Dependências" (Express,MySQL).
- **.env**: Variáveis de ambiente (senhas de banco, portas). 
OBS...: Rever forma de não compartilhar a senha do banco.

## Passo a passa e observações

# 1. Comandos usados na instalação das dependências
```bash
cd backend
npm install
```

# 2. Configuração do Banco de Dados
Editar o arquivo `.env` com as credenciais MySQL:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=db_sistema
DB_PORT=3306
PORT=3000
```

# 3. Inicialização do Servidor
```bash
npm start
```

O servidor ficará disponível em `http://localhost:3000`

# Endpoints (Endpoints são métodos de comunicação HTTP)

# Profissionais
- `GET /api/professionals` - Lista todos
- `GET /api/professionals/:id` - Busca por ID
- `POST /api/professionals` - Cria novo
- `PUT /api/professionals/:id` - Atualiza
- `DELETE /api/professionals/:id` - Desativa (soft delete)

# Serviços
- `GET /api/services` - Lista todos
- `GET /api/services/:id` - Busca por ID
- `POST /api/services` - Cria novo
- `PUT /api/services/:id` - Atualiza
- `DELETE /api/services/:id` - Desativa

# Clientes
- `GET /api/clients` - Lista todos
- `GET /api/clients/:id` - Busca por ID
- `POST /api/clients` - Cria novo
- `PUT /api/clients/:id` - Atualiza
- `DELETE /api/clients/:id` - Exclui

# Agendamentos
- `GET /api/appointments` - Lista todos (com filtros opcionais)
- `GET /api/appointments/:id` - Busca por ID
- `GET /api/appointments/professional/:id` - Por profissional
- `GET /api/appointments/client/:id` - Por cliente
- `POST /api/appointments` - Cria novo
- `PUT /api/appointments/:id` - Atualiza
- `PATCH /api/appointments/:id/status` - Atualiza status
- `DELETE /api/appointments/:id` - Cancela

# Teste da API

# Health Check (Verifica se o servidor está funcionando)
```bash
curl http://localhost:3000/api/health
```

# Criar Cliente (Exemplo)
```bash
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","telefone":"11999999999","email":"joao@email.com"}'
```

# Listar Profissionais (Exemplo)
```bash
curl http://localhost:3000/api/professionals
```
