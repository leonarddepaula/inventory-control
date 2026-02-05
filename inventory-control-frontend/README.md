# Inventory Control System - Frontend

## Descrição

Interface web responsiva para o Sistema de Controle de Estoque, desenvolvida em React com Redux para gerenciamento de estado. Permite gerenciar produtos, matérias-primas e visualizar sugestões de produção de forma intuitiva e moderna.

## Tecnologias Utilizadas

- **React 18.2.0**
- **Redux Toolkit** (gerenciamento de estado)
- **React Router DOM** (navegação)
- **React Bootstrap** (UI components)
- **Bootstrap 5.3.2** (estilos)
- **Axios** (requisições HTTP)
- **React Hook Form** (formulários)
- **React Toastify** (notificações)
- **Font Awesome** (ícones)

## Funcionalidades Implementadas

### Requisitos Funcionais Atendidos

- **RF005** - Interface CRUD para produtos
- **RF006** - Interface CRUD para matérias-primas
- **RF007** - Interface para associar matérias-primas aos produtos
- **RF008** - Interface para visualizar sugestões de produção

### Principais Funcionalidades

#### Dashboard

- Visão geral do sistema com métricas importantes
- Cards de resumo (produtos, matérias-primas, estoque baixo, fora de estoque)
- Produtos recentes e status de estoque
- Ações rápidas para navegação

#### Gestão de Produtos

- Lista completa de produtos com busca e filtros
- Formulário para criar/editar produtos
- Associação de matérias-primas aos produtos
- Visualização de matérias-primas necessárias por produto
- Exclusão de produtos com confirmação

#### Gestão de Matérias-Primas

- Lista de matérias-primas com filtros por status de estoque
- Formulário para criar/editar matérias-primas
- Atualização rápida de quantidades em estoque
- Indicadores visuais de status (em estoque, estoque baixo, fora de estoque)
- Busca por nome de matéria-prima

#### Sugestões de Produção

- Algoritmo inteligente de sugestões baseado em estoque disponível
- Priorização por valor do produto (maior valor primeiro)
- Cálculo automático de quantidade máxima produzível
- Valor total da produção sugerida
- Cards visuais com informações detalhadas

## Estrutura do Projeto

```
src/
├── components/
│   ├── Dashboard/           # Dashboard principal
│   ├── Navigation/          # Barra de navegação
│   ├── Products/           # Componentes de produtos
│   │   ├── ProductList.js
│   │   └── ProductForm.js
│   ├── RawMaterials/       # Componentes de matérias-primas
│   │   ├── RawMaterialList.js
│   │   └── RawMaterialForm.js
│   └── ProductionSuggestions/ # Sugestões de produção
├── features/               # Redux slices
│   ├── products/
│   └── rawMaterials/
├── services/               # APIs e HTTP client
│   ├── api.js
│   ├── productsAPI.js
│   └── rawMaterialsAPI.js
├── store/                  # Configuração Redux
└── App.js                  # Componente principal
```

## Como Executar

### Pré-requisitos

- Node.js 16+
- npm ou yarn
- Backend da aplicação rodando na porta 8080

### Instalação e Execução

1. **Navegue até o diretório do frontend**

```bash
cd inventory-control-frontend
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure a URL da API (opcional)**
   - Crie um arquivo `.env` na raiz do projeto
   - Adicione: `REACT_APP_API_URL=http://localhost:8080`

4. **Execute em modo de desenvolvimento**

```bash
npm start
```

5. **Acesse a aplicação**
   - URL: http://localhost:3000
   - A aplicação abrirá automaticamente no navegador

### Build para Produção

```bash
npm run build
```

O build otimizado será gerado na pasta `build/`.

### Executar Testes

```bash
npm test
```

## Principais Componentes

### Navigation

Barra de navegação responsiva com links para todas as seções principais do sistema.

### Dashboard

Tela inicial com visão geral e métricas do sistema:

- Total de produtos e matérias-primas
- Alertas de estoque baixo/fora de estoque
- Produtos recentes
- Ações rápidas

### ProductList / ProductForm

- Lista paginada de produtos com busca
- Formulário completo para criação/edição
- Gestão de matérias-primas associadas
- Validação de formulários

### RawMaterialList / RawMaterialForm

- Lista com filtros por status de estoque
- Atualização rápida de quantidades
- Indicadores visuais de status
- Formulários com validação

### ProductionSuggestions

- Algoritmo inteligente de sugestões
- Cards visuais com informações detalhadas
- Cálculos automáticos de produção
- Métricas de valor total

## Design e UX

### Responsividade

- Layout adaptável para desktop, tablet e mobile
- Grid system do Bootstrap
- Componentes otimizados para touch

### Tema e Cores

- Esquema de cores profissional (azul, verde, amarelo, vermelho)
- Gradientes modernos nos cards de destaque
- Badges e indicadores visuais intuitivos

### Experiência do Usuário

- Navegação intuitiva e consistente
- Feedbacks visuais para ações (toasts)
- Loading states e tratamento de erros
- Confirmações para ações destrutivas
- Tooltips e textos de ajuda

## Estado da Aplicação (Redux)

### Products Slice

- Lista de produtos
- Produto atual (para edição)
- Sugestões de produção
- Estados de loading e erro

### Raw Materials Slice

- Lista de matérias-primas
- Matéria-prima atual (para edição)
- Estados de loading e erro

### Ações Assíncronas

- Fetch, create, update, delete para produtos
- Fetch, create, update, delete para matérias-primas
- Busca e filtros
- Sugestões de produção

## API Integration

### Configuração Axios

- Interceptors para tratamento de erros
- Base URL configurável
- Timeout de 10 segundos
- Headers padrão

### Endpoints Utilizados

- GET/POST/PUT/DELETE `/api/products`
- GET/POST/PUT/DELETE `/api/raw-materials`
- GET `/api/products/production-suggestions`
- GET `/api/products/search`
- GET `/api/raw-materials/search`
- PATCH `/api/raw-materials/{id}/stock`

## Próximos Passos

### Funcionalidades

- [ ] Autenticação e autorização
- [ ] Relatórios e dashboards avançados
- [ ] Histórico de movimentação de estoque
- [ ] Notificações push
- [ ] Exportação de dados (PDF, Excel)

### Melhorias Técnicas

- [ ] Testes unitários e de integração
- [ ] Testes E2E com Cypress
- [ ] PWA (Progressive Web App)
- [ ] Performance optimization
- [ ] Acessibilidade (WCAG)

### UI/UX

- [ ] Tema escuro
- [ ] Personalização de interface
- [ ] Drag and drop para reordenação
- [ ] Gráficos e visualizações
- [ ] Animações e transições

## Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm test` - Executa os testes
- `npm run build` - Cria build de produção
- `npm run eject` - Ejeta a configuração (não reversível)

## Considerações de Performance

### Otimizações Implementadas

- Lazy loading de componentes
- Memoização com Redux Toolkit
- Debounce em campos de busca
- Paginação de listas grandes

### Monitoramento

- Web Vitals configurado
- Console logs para debugging
- Error boundaries para tratamento de erros

## Compatibilidade

### Navegadores Suportados

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Dispositivos

- Desktop (1920x1080 e superiores)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)
