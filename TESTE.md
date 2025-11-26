# Guia de Teste - Integração Full-Stack

## Problema: "Carregando..." Infinito

Se as telas ficam em "Carregando..." infinitamente, siga estes passos:

### 1. Verificar se o Backend está Rodando

Abra um novo terminal e execute:
```bash
cd backend
npm start
```

Você deve ver:
```
✅ MySQL Database connected successfully
🚀 Server running on port 3000
📡 API available at http://localhost:3000/api
```

### 2. Verificar Conexão com MySQL

Edite o arquivo `backend/.env`:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=SUA_SENHA_AQUI
DB_NAME=db_sistema
DB_PORT=3306
PORT=3000
```

### 3. Criar o Banco de Dados

Execute o script SQL fornecido no MySQL Workbench ou via linha de comando:
```bash
mysql -u root -p < script_banco.sql
```

### 4. Testar a API Manualmente

Abra o navegador em:
- Health Check: http://localhost:3000/api/health
- Profissionais: http://localhost:3000/api/professionals
- Serviços: http://localhost:3000/api/services
- Clientes: http://localhost:3000/api/clients

### 5. Verificar Console do Navegador

1. Abra o DevTools (F12)
2. Vá na aba "Console"
3. Procure por erros como:
   - `CORS error`
   - `Failed to fetch`
   - `ERR_CONNECTION_REFUSED`

### 6. Solução Temporária (Modo Offline)

Se o backend não estiver disponível, a aplicação agora mostra uma lista vazia ao invés de ficar carregando infinitamente.

## Testando CRUD Completo

### Criar um Cliente
```bash
curl -X POST http://localhost:3000/api/clients \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","telefone":"11999999999","email":"joao@email.com"}'
```

### Listar Profissionais
```bash
curl http://localhost:3000/api/professionals
```

### Criar um Serviço
```bash
curl -X POST http://localhost:3000/api/services \
  -H "Content-Type: application/json" \
  -d '{"nome":"Corte Masculino","descricao":"Corte tradicional","preco":45,"duracao":30,"idEstabelecimento":1,"idTipoPrecificacao":1}'
```

## Troubleshooting

### Erro: "MySQL Database connection failed"
- Verifique se o MySQL está rodando
- Confirme usuário e senha no `.env`
- Teste a conexão: `mysql -u root -p`

### Erro: "Port 3000 is already in use"
- Mate o processo: `npx kill-port 3000`
- Ou mude a porta no `.env`: `PORT=3001`

### Erro: "CORS policy"
- O backend já tem CORS habilitado
- Verifique se está acessando `http://localhost:4200`

## Próximos Passos

Após o backend estar rodando:
1. Acesse http://localhost:4200
2. Navegue para "Profissionais"
3. Clique em "Novo Profissional"
4. Preencha o formulário e salve
5. Verifique se aparece na lista
