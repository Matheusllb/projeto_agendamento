# Manual da Aplicação (app)

Esta pasta contém toda a lógica de negócio e interface da aplicação Angular.

## Estrutura Organizada
- **components/**: Componentes reutilizáveis (botões, headers, inputs) que não são páginas inteiras.
- **models/**: Interfaces TypeScript que definem o formato dos dados (Tipagem forte).
- **pages/**: Componentes que representam telas completas (rotas).
- **services/**: Classes responsáveis pela comunicação com a API e gerenciamento de dados.
- **app.routes.ts**: Define a navegação do site (qual URL carrega qual componente).
- **app.config.ts**: Configurações globais de injeção de dependência.
- **app.component.ts**: O componente "pai" de todos, onde a aplicação começa a ser renderizada.
