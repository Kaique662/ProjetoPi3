# 🔑 GetKey - Frontend Angular

Plataforma para compra de chaves de jogos e account boosting.

## Tecnologias
- **Angular 17+** (Standalone Components, Signals)
- **TypeScript**
- **RxJS**
- **HttpClient** para consumir o backend Spring Boot

---

## 📁 Estrutura do Projeto

```
src/app/
├── components/
│   ├── navbar/              ← Barra de navegação (fixa no topo)
│   └── produto-card/        ← Card de produto reutilizável
├── pages/
│   ├── home/                ← Tela principal com sidebar + grid
│   ├── login/               ← Login e Registro
│   ├── catalogo/            ← Catálogo com filtros
│   ├── produto/             ← Detalhe do produto
│   ├── carrinho/            ← Carrinho de compras
│   └── confirmacao/         ← Tela pós-compra
├── services/
│   ├── auth.service.ts      ← Login/Logout/Token JWT
│   ├── cart.service.ts      ← Estado do carrinho (signals)
│   ├── produto.service.ts   ← Requisições de produtos
│   └── pedido.service.ts    ← Criação de pedidos
├── models/
│   └── produto.model.ts     ← Interfaces TypeScript
├── interceptors/
│   └── auth.interceptor.ts  ← Injeta Bearer Token nas requisições
├── app.routes.ts            ← Rotas da aplicação
├── app.config.ts            ← Configuração do Angular
└── app.component.ts         ← Componente raiz
```

---

## 🚀 Como rodar

### Pré-requisitos
- Node.js 18+
- Angular CLI: `npm install -g @angular/cli`

### Instalação
```bash
# Clonar o projeto
cd getkey-frontend

# Instalar dependências
npm install

# Rodar em desenvolvimento
ng serve

# Abrir no navegador: http://localhost:4200
```

### Build para produção
```bash
ng build
```

---

## 🔌 Integração com Backend Spring Boot

O frontend espera o backend rodando em `http://localhost:8080`.

### Endpoints esperados:

| Método | URL | Descrição |
|--------|-----|-----------|
| POST | `/api/auth/login` | Login (retorna JWT) |
| POST | `/api/auth/register` | Cadastro (retorna JWT) |
| GET | `/api/produtos` | Lista produtos (filtros: categoria, ordem, busca) |
| GET | `/api/produtos/{id}` | Busca produto por ID |
| POST | `/api/pedidos` | Cria novo pedido |
| GET | `/api/pedidos/meus` | Pedidos do usuário logado |

### Formato do Login (POST /api/auth/login):
```json
// Request:
{ "email": "user@email.com", "senha": "123456" }

// Response:
{ "token": "eyJhbGci...", "usuario": { "id": 1, "nome": "João", "email": "...", "role": "CLIENTE" } }
```

### Formato de Produto:
```json
{
  "id": 1,
  "nome": "Elden Ring",
  "descricao": "Chave Steam para ativar o jogo.",
  "preco": 89.90,
  "tipo": "chave",      // "chave" | "conta" | "gift"
  "categoria": "steam",
  "imagemUrl": "https://...",
  "estoque": 5
}
```

---

## 🎨 Design

- **Cor primária**: `#0d1117` (fundo escuro)
- **Acento roxo**: `#6e56cf`
- **Acento ciano**: `#00d4ff` (botão comprar)
- **Acento amarelo**: `#ffd700` (botão finalizar pedido)
- **Fontes**: Rajdhani (títulos) + Exo 2 (corpo)

---

## 📱 Rotas

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | HomeComponent | Tela inicial com produtos em destaque |
| `/login` | LoginComponent | Login e cadastro |
| `/catalogo` | CatalogoComponent | Todos os produtos com filtros |
| `/produto/:id` | ProdutoComponent | Detalhe do produto |
| `/carrinho` | CarrinhoComponent | Carrinho de compras |
| `/confirmacao` | ConfirmacaoComponent | Pós-compra |

---

## ⚠️ Notas para Desenvolvimento

1. **Mock data**: Enquanto o backend não estiver pronto, os serviços retornam dados mockados automaticamente no bloco `error:` do subscribe.
2. **JWT**: O token é salvo no `localStorage` e injetado automaticamente em todas as requisições pelo `AuthInterceptor`.
3. **Signals**: O projeto usa `signal()` do Angular 17 para estado reativo (carrinho, auth).
4. **Standalone Components**: Não usa `NgModule`, cada componente declara seus próprios imports.
