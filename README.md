# Rede Social feita em Python - (Sem nome ainda)

## Plano
O plano do projeto é ser uma rede social focada no conteúdo relacionado a plantas, árvores e na flora em geral, incentivando seus usuários a interagirem em relação a esses tópicos.<br><br>
A ideia é implementar uma gamificação também, para que o uso do aplicativo não seja monótono, e proporcione um diferencial.<br>
## Arquitetura do Sistema
A arquitetura será simples a princípio, seguindo o esquema mostrado na imagem a seguir:<br>
<img width="1022" height="259" alt="image" src="https://github.com/user-attachments/assets/264c45f9-1cc1-449a-b3ca-e475bfbd79f5" />

### Linguagens e Bibliotecas
O intuito do projeto é arquitetar um sistema minimamente funcional utilizando Python no back-end (server). Sendo as bibliotecas e frameworks utilizadas as listadas a seguir:

| Biblioteca | Função |
| ------------- | ------------- |
| FastAPI  | Sendo base para a API, é utilizado para escutar rotas HTTP e lidar com as requisições.  |
| PyJWT  | Base do sistema de autenticação, é utilizado para gerar e validar tokens de login  |
| SQLalchemy | ORM utilizada no projeto, é responsável por facilitar as operações no banco de dados.  |
| Pydantic  | Biblioteca utilizada para criar models e validar dados. |

O frontend (client) será criado utilizando React.js, para maior fluidez e controle da parte do usuário.

| Biblioteca | Função |
| ------------- | ------------- |
| React.js  | Maior fluidez de UI & UX, uso do Context API , melhor performance do documento (Virtual DOM) e sistema de roteamento. |
| TailwindCSS | Facilitador de estilização essencial.  |

## Arquitetura - Estrutura de Pastas

O projeto possui seu servidor e seu client no mesmo repositório. Os diretórios estão na representação a seguir:
```

Arquivos referentes ao client (frontend):
--- /client  **Pasta raiz do client 
  -- /public   **Pasta para arquivos estáticos (Logos e etc)
  -- /src
    -- /assets   **Arquivos CSS e arquivos de estilização
    -- /components
      -- /ui   **Componentes que são pedaços inteiros da interface
      -- /elements   **Componentes que são elementos menores e mais reutilizáveis
    -- /pages   **Representação da raiz de uma página
    -- /services   **Chamadas de API e lógicas extraídas dos componentes para melhor legibilidade e organização de código
    -- /types   **Interfaces e tipagens de objetos e modelos

Arquivos referentes ao server (backend/API):
--- /server   **Pasta raiz do servidor 
  -- /auth   **Arquivos relacionados a autenticação
  -- /controllers  **Controladores dos modelos presentes na aplicação
  -- /models  **Arquivos que ditam os modelos a serem seguidos referentes a tais objetos da aplicação 
  -- /public  
    -- /images **Repositório para as imagens que forem enviadas e validadas pelo servidor
  -- /routes  **Pasta para organização das rotas da API
  -- /services  **Arquivos com lógica extraída de outros componentes da API para melhor legibilidade e manutenção

  ```

