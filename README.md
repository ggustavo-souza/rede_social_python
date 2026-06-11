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
| FastAPI  | Sendo base para a API, é utilizada para escutar rotas HTTP e lidar com as requisições.  |
| SQLalchemy | ORM utilizada no projeto, é responsável por facilitar as operações no banco de dados.  |
| Pydantic  | Biblioteca utilizada para criar models e validar dados. |

O frontend (client) será criado utilizando React.js, para maior fluidez e controle da parte do usuário.

| Biblioteca | Função |
| ------------- | ------------- |
| React.js  | Maior fluidez de UI & UX, melhor manipulação do DOM (Virtual DOM) e sistema de roteamento. |
| TailwindCSS | Facilitador de estilização essencial.  |

