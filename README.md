# LogHub UI

Interface web para visualização e diagnóstico de logs do LogHub.

## 🚀 Tecnologias

- React 18
- Vite
- TypeScript
- Axios
- Tailwind CSS

## 📁 Estrutura do Projeto

```
src/
├── api/
│   └── loghubApi.ts      # Cliente Axios centralizado
├── components/
│   ├── LogTable.tsx      # Tabela de logs
│   ├── LogFilters.tsx    # Filtros de busca
│   └── LogDetails.tsx    # Modal de detalhes
├── pages/
│   └── LogsPage.tsx      # Página principal
├── types/
│   └── LogEvent.ts       # Tipos TypeScript
├── App.tsx
├── main.tsx
└── index.css
```

## ⚙️ Configuração

1. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

2. Configure as variáveis de ambiente:

```env
VITE_LOGHUB_API_URL=http://localhost:8080/api
VITE_LOGHUB_API_KEY=sua-api-key-aqui
```

## 🛠️ Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📋 Funcionalidades

### Lista de Logs
- Tabela com colunas: Timestamp, Level, Application, Environment, Message
- Clique em uma linha para ver detalhes

### Filtros
- Application (input)
- Environment (input)
- Level (select)
- Período (De/Até)
- Botão "Buscar"

### Detalhes do Log
- Modal com informações completas
- Mensagem completa
- Timestamp
- Level com cor indicativa
- TraceId (se existir)
- Metadata em JSON formatado
- Informações do SDK (se existir)

## 🎨 Cores por Level

| Level | Cor |
|-------|-----|
| TRACE | Cinza |
| DEBUG | Cinza escuro |
| INFO | Azul |
| WARN | Amarelo |
| ERROR | Vermelho |

## 🔌 API

O cliente API está configurado para:
- Base URL: configurável via `VITE_LOGHUB_API_URL`
- Header `X-API-KEY`: configurável via `VITE_LOGHUB_API_KEY`

### Endpoints utilizados

- `GET /logs` - Lista logs com filtros
- `GET /logs/:id` - Detalhes de um log específico

### Parâmetros de filtro

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| application | string | Nome da aplicação |
| environment | string | Ambiente (production, staging, etc.) |
| level | string | Nível do log (TRACE, DEBUG, INFO, WARN, ERROR) |
| from | string | Data/hora inicial |
| to | string | Data/hora final |

## 📝 Licença

MIT
