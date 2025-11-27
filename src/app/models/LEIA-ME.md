# Manual de Modelos (Models)

Esta pasta contém as Interfaces TypeScript. Elas são os "contratos" dos nossos dados.

## Por que existem?
Para garantir que o código saiba exatamente quais campos esperar de um objeto (ex: um Cliente tem `nome` e `telefone`). Isso permite que o editor de código ajude com autocompletar e evita erros de digitação.

## Princípios Aplicados
- **Imutabilidade**: Usamos `readonly` para evitar modificações acidentais nos dados.
