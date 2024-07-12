# User Authentication API

## Descrição

Esta é uma API de autenticação de usuários que permite aos usuários fazer login e receber um token JWT (JSON Web Token) que pode ser usado para autenticação em outras partes do sistema. A API também permite a descriptografia do JWT.

## Funcionalidades

- **Login de Usuário**: Recebe email e senha do usuário, adiciona data e hora da requisição e retorna um JWT.
- **Descriptografar JWT**: Recebe um JWT e retorna os dados originais contidos no token.

## Tecnologias Utilizadas

- Node.js
- Express
- TypeScript
- JSON Web Token (JWT)
- Express Validator
- Swagger UI
- Docker

## Instalação

### Pré-requisitos

- Node.js e npm
- Docker (opcional, para execução via Docker)

### Passo a Passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/user-auth-api.git
   cd user-auth-api
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
  
3. Configure o TypeScript:

   ```bash
   npx tsc --init
   ```
## Execução

### Localmente
Para rodar a aplicação localmente, utilize o seguinte comando:

```bash 
npm run dev
```

A aplicação estará disponível em http://localhost:3010.

### Via Docker
Para rodar a aplicação no Docker, utilize o seguinte comando:

```bash
npm run docker
```

A aplicação estará disponível em http://localhost:3011.

## Documentação da API
A documentação da API está disponível via Swagger. Após iniciar a aplicação, acesse:

Localmente: http://localhost:3010/api-docs
No Docker: http://localhost:3011/api-docs

### Endpoints
## Login
URL: /auth/login
Método: POST
Corpo da Requisição:

```json
{
  "email": "test@example.com",
  "password": "password123"
}
```

Resposta:

```json
{
  "token": "YOUR_JWE_TOKEN_HERE"
}
```

### Erros Possíveis:

- **400 Bad Request:** Erro de validação
```json
{
  "errors": [
    {
      "msg": "Enter a valid email",
      "param": "email",
      "location": "body"
    },
    {
      "msg": "Password must be at least 6 characters long",
      "param": "password",
      "location": "body"
    }
  ]
}
```

### Descriptografar JWT
URL: /auth/decrypt
Método: POST
Corpo da Requisição:

```json
{
  "token": "YOUR_JWE_TOKEN_HERE"
}
```
Resposta:
```json
{
  "payload": {
    "email": "test@example.com",
    "password": "password123",
    "timestamp": "2024-07-10T10:00:00.000Z"
  }
}
```
### Erros Possíveis:

 - **400 Bad Request:** Token inválido
```json
{
  "error": "Invalid token"
}
```
## Tratamento de Erros
A API retorna códigos de status HTTP apropriados e mensagens de erro detalhadas para ajudar na resolução de problemas. Aqui estão alguns exemplos:

 -  400 Bad Request: Erro de validação ou token inválido.
 -  500 Internal Server Error: Erro interno no servidor.

## Estrutura do Projeto
```plaintext
project-root
├── public
│   └── swagger.json
├── src
│   ├── controllers
│   │   └── authController.ts
│   ├── middleware
│   │   └── errorHandler.ts
│   ├── routes
│   │   └── authRoutes.ts
│   ├── app.ts
│   └── index.ts
├── .dockerignore
├── .env
├── .gitignore
├── .Dockerfile
├── .generateKeys.js
├── package-lock.json
├── package.json
├── private.pem
├── public.pem
├── README.md
└── tsconfig.json
```
   
