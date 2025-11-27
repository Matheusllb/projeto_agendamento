# Manual de Serviços (Services)

Esta pasta contém a lógica de negócios e comunicação de dados.

## Responsabilidades
- Fazer chamadas HTTP para a API (Backend).
- Gerenciar o estado dos dados.
- Abstrair a complexidade dos componentes.

## Padrões
- **SRP (Single Responsibility Principle)**: Temos um serviço para cada entidade (ClientService, ProfessionalService, etc).
- **Injeção de Dependência**: Os serviços são injetados nos componentes que precisam deles.
