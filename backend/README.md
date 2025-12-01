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

## Clientes (`/api/clientes`)

### Listar todos (GET)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes" -Method Get
```

### Criar novo (POST)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes" -Method Post -ContentType "application/json" -Body '{"nome":"João Teste","telefone":"11999999999","email":"joao@teste.com"}'
```

### Atualizar (PUT)
*Substitua `1` pelo ID do cliente que deseja atualizar.*
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes/1" -Method Put -ContentType "application/json" -Body '{"nome":"João Atualizado","telefone":"11888888888"}'
```

### Deletar (DELETE)
*Substitua `1` pelo ID do cliente que deseja excluir.*
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/clientes/1" -Method Delete
```

---

## Profissionais (`/api/profissionais`)

### Listar todos (GET)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/profissionais" -Method Get
```

### Criar novo (POST)
```powershell
$body = @{
    nome = "Dra. Ana"
    telefone = "11977777777"
    horaEntrada = "09:00:00"
    horaSaida = "18:00:00"
    almoco = "12:00:00"
    avaliacao = 5
    ativo = $true
    especialidades = @("Corte", "Coloração")
} | ConvertTo-Json -Depth 3

Invoke-RestMethod -Uri "http://localhost:3000/api/profissionais" -Method Post -ContentType "application/json" -Body $body
```

### Atualizar (PUT)
```powershell
$body = @{ nome = "Dra. Ana Silva"; avaliacao = 4.8 } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:3000/api/profissionais/1" -Method Put -ContentType "application/json" -Body $body
```

### Deletar (DELETE)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/profissionais/1" -Method Delete
```

---

## Serviços (`/api/servicos`)

### Listar todos (GET)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/servicos" -Method Get
```

### Criar novo (POST)
```powershell
$body = @{
    nome = "Corte Masculino"
    descricao = "Corte completo com lavagem"
    duracao = 30
    preco = 50.00
    idEstabelecimento = 1
    idTipoPrecificacao = 1
    ativo = $true
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/servicos" -Method Post -ContentType "application/json" -Body $body
```

### Atualizar (PUT)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/servicos/1" -Method Put -ContentType "application/json" -Body '{"preco": 60.00}'
```

### Deletar (DELETE)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/servicos/1" -Method Delete
```

---

## Agendamentos (`/api/agendamentos`)

### Listar todos (GET)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/agendamentos" -Method Get
```

### Criar novo (POST)
*Certifique-se que os IDs de cliente, profissional e serviço existem.*
```powershell
$body = @{
    data = "2024-12-25"
    horario = "14:00:00"
    idCliente = 1
    idProfissional = 1
    idServico = 1
    observacoes = "Cliente prefere sem conversa"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/agendamentos" -Method Post -ContentType "application/json" -Body $body
```

### Atualizar Status (PUT/PATCH)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/agendamentos/1" -Method Put -ContentType "application/json" -Body '{"status": "CONFIRMADO"}'
```

### Deletar (DELETE)
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/agendamentos/1" -Method Delete
```
