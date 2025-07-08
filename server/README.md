# NLW Agents

Projeto desenvolvido durante o evento **NLW** da Rocketseat.

## Tecnologias e Bibliotecas Principais

- **Node.js** + **TypeScript**
- **Fastify**: Framework web para Node.js, focado em performance.
- **Zod**: Validação de esquemas e tipos.
- **fastify-type-provider-zod**: Integração de Zod com Fastify.
- **Drizzle ORM**: ORM para TypeScript focado em simplicidade e segurança.
- **Postgres.js**: Driver para PostgreSQL.
- **@fastify/cors**: Middleware para CORS.
- **Docker**: Utilizado para subir o banco de dados PostgreSQL com extensão pgvector.

## Padrões de Projeto

- **Modularização por responsabilidade**: Rotas, banco e configuração separados em arquivos/diretórios específicos.
- **Validação de ambiente**: Uso de Zod para garantir variáveis de ambiente válidas.
- **Schema-first**: Definição explícita dos schemas do banco via Drizzle ORM.

## Setup do Projeto

### 1. Clone o repositório

```bash
git clone <url-do-repo>
cd server
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz com:

```
PORT=3333
DATABASE_URL=postgres://docker:docker@localhost:5432/agents
```

### 4. Suba o banco de dados com Docker

```bash
docker-compose up -d
```

### 5. Rode as migrações e seeds (se necessário)

```bash
# Ajuste conforme scripts disponíveis
npm run db:seed
```

### 6. Inicie o servidor

```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3333`. 