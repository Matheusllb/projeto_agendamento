# Manual de Ambientes (Environments)

Esta pasta contém arquivos de configuração que mudam dependendo de onde a app está rodando.

## Arquivos
- **environment.ts**: Configurações de Desenvolvimento (ex: API local `localhost:3000`).
- **environment.prod.ts**: Configurações de Produção (ex: API real na nuvem).

O Angular substitui automaticamente esses arquivos quando você faz o "build" para produção.
