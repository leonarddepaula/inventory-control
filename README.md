# Sistema de Controle de Estoque Industrial

## Descrição do Projeto

Sistema completo de controle de estoque para indústrias que produzem produtos diversos. Permite manter o controle dos insumos (matérias-primas) necessários para a produção dos itens fabricados, fornecendo sugestões inteligentes de produção baseadas no estoque disponível.

## Arquitetura da Solução

### Backend (Spring Boot)

- **Tecnologias**: Java 21 (compilação) / **Java 23** (runtime), Spring Boot 3.2.1, PostgreSQL/MySQL/H2
- **Arquitetura**: REST API com separação em camadas (Controller, Service, Repository)
- **Localização**: `inventory-control-backend/`

### Frontend (React)

- **Tecnologias**: React 18, Redux Toolkit, Bootstrap 5, React Router
- **Arquitetura**: SPA responsiva com gerenciamento de estado centralizado
- **Localização**: `inventory-control-frontend/`

## Requisitos Atendidos

### Requisitos Não Funcionais ✅

- **RNF001**: ✅ Sistema WEB compatível com Chrome, Firefox, Edge
- **RNF002**: ✅ Arquitetura API separada do front-end
- **RNF003**: ✅ Interface responsiva (Bootstrap 5)
- **RNF004**: ✅ Suporte a PostgreSQL, MySQL e Oracle
- **RNF005**: ✅ Backend com Spring Boot
- **RNF006**: ✅ Frontend em React com Redux
- **RNF007**: ✅ Código em inglês (backend, frontend, BD)

### Requisitos Funcionais ✅

- **RF001**: ✅ CRUD de produtos no backend
- **RF002**: ✅ CRUD de matérias-primas no backend
- **RF003**: ✅ CRUD de associações produto-matéria-prima no backend
- **RF004**: ✅ Consulta de produtos produzíveis no backend
- **RF005**: ✅ Interface CRUD de produtos no frontend
- **RF006**: ✅ Interface CRUD de matérias-primas no frontend
- **RF007**: ✅ Interface de associação no cadastro de produtos
- **RF008**: ✅ Interface de sugestões de produção no frontend

## Funcionalidades Principais

### 🏭 Gestão de Produtos

- Cadastro completo com código, nome e valor
- Associação com matérias-primas e quantidades necessárias
- Busca e filtros avançados
- Validação de dados de entrada

### 📦 Gestão de Matérias-Primas

- Controle de estoque com quantidade disponível
- Alertas visuais para estoque baixo/zerado
- Atualização rápida de quantidades
- Histórico de movimentações

### 💡 Sugestões de Produção Inteligentes

- **Algoritmo otimizado**: Prioriza produtos de maior valor
- **Cálculo automático**: Quantidade máxima produzível por produto
- **Gestão de conflitos**: Quando matéria-prima é usada em múltiplos produtos
- **Valor total**: Cálculo do retorno financeiro da produção sugerida

### 📊 Dashboard Analítico

- Visão geral do sistema com métricas importantes
- Status de estoque em tempo real
- Resumo de produtos e matérias-primas
- Indicadores de performance

## Quick Start

### 1. Backend (Spring Boot)

```bash
cd inventory-control-backend

# Configurar banco de dados no application.properties
# PostgreSQL (recomendado):
# spring.datasource.url=jdbc:postgresql://localhost:5432/inventory_control
# spring.datasource.username=seu_usuario
# spring.datasource.password=sua_senha

# Executar aplicação
mvn spring-boot:run

# API disponível em: http://localhost:8080
# Swagger UI: http://localhost:8080/swagger-ui.html
```

### 2. Frontend (React)

```bash
cd inventory-control-frontend

# Instalar dependências
npm install

# Executar aplicação
npm start

# Interface disponível em: http://localhost:3000
```

## Modelo de Dados

### Entidades Principais

#### Product (Produto)

- `id`: Identificador único
- `name`: Nome do produto
- `value`: Valor unitário do produto

#### RawMaterial (Matéria-Prima)

- `id`: Identificador único
- `name`: Nome da matéria-prima
- `stock_quantity`: Quantidade em estoque

#### ProductRawMaterial (Associação)

- `product_id`: ID do produto
- `raw_material_id`: ID da matéria-prima
- `quantity`: Quantidade necessária da matéria-prima

### Relacionamentos

- **Produto N:N Matéria-Prima**: Um produto pode usar várias matérias-primas, e uma matéria-prima pode ser usada em vários produtos
- **Quantidade específica**: Cada associação define quantas unidades da matéria-prima são necessárias para produzir uma unidade do produto

## Algoritmo de Sugestões

### Lógica de Priorização

1. **Filtro inicial**: Apenas produtos com todas as matérias-primas disponíveis
2. **Cálculo de viabilidade**: Para cada produto, calcula quantidade máxima produzível
3. **Ordenação**: Por valor unitário decrescente (maior valor primeiro)
4. **Otimização**: Considera competição entre produtos por matérias-primas compartilhadas

### Fórmula de Cálculo

```
Quantidade_Máxima = MIN(estoque_matéria_prima / quantidade_necessária)
                    para todas as matérias-primas do produto

Valor_Total = Quantidade_Máxima × Valor_Unitário_Produto
```

## Dados de Exemplo

### Matérias-Primas Incluídas

- **Steel** (1000 units) - Aço para estruturas
- **Plastic** (500 units) - Plástico para acabamentos
- **Rubber** (300 units) - Borracha para vedações
- **Glass** (200 units) - Vidro para componentes
- **Aluminum** (150 units) - Alumínio para peças leves

### Produtos de Exemplo

- **Car Wheel** ($250.00) - Roda automotiva
- **Smartphone Case** ($15.50) - Capa protetora
- **Office Chair** ($180.00) - Cadeira ergonômica
- **Water Bottle** ($12.00) - Garrafa térmica
- **Laptop Stand** ($45.00) - Suporte para notebook

## Estrutura do Projeto

```
JAVA/
├── inventory-control-backend/     # API Spring Boot
│   ├── src/main/java/com/inventory/
│   │   ├── controller/           # Controllers REST
│   │   ├── service/             # Lógica de negócio
│   │   ├── repository/          # Acesso a dados
│   │   ├── model/               # Entidades JPA
│   │   ├── dto/                 # Data Transfer Objects
│   │   └── config/              # Configurações
│   ├── src/main/resources/
│   │   ├── application.properties
│   │   └── data.sql
│   └── README.md
├── inventory-control-frontend/    # Interface React
│   ├── src/
│   │   ├── components/          # Componentes React
│   │   ├── features/            # Redux slices
│   │   ├── services/            # APIs HTTP
│   │   └── store/               # Configuração Redux
│   ├── public/
│   └── README.md
└── README.md                     # Este arquivo
```

## Tecnologias Utilizadas

### Backend

- **Java 17** - Linguagem principal
- **Spring Boot 3.2.1** - Framework principal
- **Spring Data JPA** - Persistência de dados
- **Spring Web** - APIs REST
- **PostgreSQL** - Banco principal (H2 para testes)
- **Maven** - Gerenciamento de dependências
- **SpringDoc OpenAPI** - Documentação automática

### Frontend

- **React 18.2.0** - Biblioteca principal
- **Redux Toolkit** - Gerenciamento de estado
- **React Router** - Navegação SPA
- **Bootstrap 5.3.2** - Framework CSS
- **React Bootstrap** - Componentes React
- **Axios** - Cliente HTTP
- **React Hook Form** - Formulários
- **React Toastify** - Notificações

## APIs Disponíveis

### Produtos

- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto
- `PUT /api/products/{id}` - Atualizar produto
- `DELETE /api/products/{id}` - Excluir produto
- `GET /api/products/search?name=` - Buscar produtos
- `GET /api/products/production-suggestions` - Sugestões

### Matérias-Primas

- `GET /api/raw-materials` - Listar matérias-primas
- `POST /api/raw-materials` - Criar matéria-prima
- `PUT /api/raw-materials/{id}` - Atualizar matéria-prima
- `PATCH /api/raw-materials/{id}/stock` - Atualizar estoque
- `DELETE /api/raw-materials/{id}` - Excluir matéria-prima

## Próximos Passos

### Funcionalidades Desejáveis

- [ ] **Testes automatizados** (unitários e integração)
- [ ] **Testes E2E** com Cypress
- [ ] **Autenticação e autorização**
- [ ] **Relatórios avançados** (PDF, Excel)
- [ ] **Histórico de movimentações**
- [ ] **Previsão de demanda** com ML
- [ ] **Notificações push**
- [ ] **Backup automático**

### Melhorias Técnicas

- [ ] **Containerização** com Docker
- [ ] **CI/CD** com GitHub Actions
- [ ] **Monitoramento** com Actuator
- [ ] **Cache** com Redis
- [ ] **Message Queue** para processamento assíncrono
- [ ] **Microserviços** para escalabilidade

## Contribuição

### Configuração de Desenvolvimento

1. **Clonar repositório**
2. **Configurar banco de dados** (PostgreSQL recomendado)
3. **Executar backend** na porta 8080
4. **Executar frontend** na porta 3000
5. **Acessar Swagger** para testar APIs

### Padrões de Código

- **Backend**: Seguir convenções Spring Boot e Clean Code
- **Frontend**: Seguir padrões React e ESLint
- **Commits**: Usar Conventional Commits
- **Testes**: Cobertura mínima de 80%

## Licença

Este projeto foi desenvolvido como parte de um sistema de controle de estoque industrial, seguindo as melhores práticas de desenvolvimento web moderno.

---

**Desenvolvido com ❤️ usando Spring Boot + React**

_Sistema completo de controle de estoque com sugestões inteligentes de produção_
