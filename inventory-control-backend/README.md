# Inventory Control System - Backend

## Descrição

Sistema de controle de estoque para indústrias que produzem produtos diversos. O sistema permite controlar o estoque de insumos (matérias-primas) necessárias para a produção dos itens fabricados.

## Tecnologias Utilizadas

- **Java 21** (compilação) / **Java 23** (runtime)
- **Spring Boot 3.2.1**
- **Spring Data JPA**
- **Spring Web**
- **Maven**
- **PostgreSQL** (banco principal)
- **MySQL** (alternativa)
- **H2 Database** (para testes)
- **Bean Validation** (Jakarta)
- **SpringDoc OpenAPI 2.2.0** (Swagger)

## Funcionalidades

### Requisitos Funcionais Implementados

- **RF001** - CRUD para produtos
- **RF002** - CRUD para matérias-primas
- **RF003** - CRUD para associação de matérias-primas aos produtos
- **RF004** - Consulta de produtos que podem ser produzidos com estoque disponível

### Endpoints da API

#### Produtos (/api/products)

- `GET /api/products` - Listar todos os produtos
- `GET /api/products/{id}` - Buscar produto por ID
- `GET /api/products/search?name={name}` - Buscar produtos por nome
- `POST /api/products` - Criar novo produto
- `PUT /api/products/{id}` - Atualizar produto
- `DELETE /api/products/{id}` - Excluir produto
- `GET /api/products/production-suggestions` - Obter sugestões de produção

#### Matérias-Primas (/api/raw-materials)

- `GET /api/raw-materials` - Listar todas as matérias-primas
- `GET /api/raw-materials/{id}` - Buscar matéria-prima por ID
- `GET /api/raw-materials/search?name={name}` - Buscar matérias-primas por nome
- `GET /api/raw-materials/with-stock` - Matérias-primas com estoque
- `GET /api/raw-materials/out-of-stock` - Matérias-primas sem estoque
- `POST /api/raw-materials` - Criar nova matéria-prima
- `PUT /api/raw-materials/{id}` - Atualizar matéria-prima
- `PATCH /api/raw-materials/{id}/stock?stockQuantity={quantity}` - Atualizar estoque
- `DELETE /api/raw-materials/{id}` - Excluir matéria-prima

## Configuração do Banco de Dados

### PostgreSQL (Recomendado)

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/inventory_control
spring.datasource.username=leonardodepaula
spring.datasource.password=
spring.datasource.driver-class-name=org.postgresql.Driver
```

**Nota:** Configure o usuário conforme seu ambiente PostgreSQL local.

### MySQL (Alternativo)

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/inventory_control?useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

### H2 (Para desenvolvimento)

```properties
spring.datasource.url=jdbc:h2:mem:testdb
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
```

## Como Executar

### Pré-requisitos

- **Java 21+** (para compilação) e **Java 23** (para execução)
- **Maven 3.6+**
- **PostgreSQL** (recomendado) ou MySQL (opcional para H2)

### Passos para execução

1. **Clone o repositório**

```bash
git clone <repository-url>
cd inventory-control-backend
```

2. **Configure o banco de dados**
   - Crie o banco PostgreSQL: `createdb inventory_control`
   - Edite o arquivo `application.properties` se necessário
   - Configure a URL, usuário e senha do banco conforme seu ambiente

3. **Instale as dependências e compile**

```bash
mvn clean install -Dmaven.compiler.release=21
```

4. **Execute a aplicação**

**Opção 1: Usando JAR (Recomendado)**

```bash
java -jar target/inventory-control-backend-0.0.1-SNAPSHOT.jar
```

**Opção 2: Usando Maven (se configurado)**

```bash
mvn spring-boot:run
```

**Nota:** Certifique-se de ter Java 23 instalado e configurado no JAVA_HOME para execução.

5. **Acesse a aplicação**
   - API: http://localhost:8080
   - Swagger UI: http://localhost:8080/swagger-ui/index.html
   - API Docs: http://localhost:8080/api-docs

## Compatibilidade Java

Este projeto foi configurado para:

- **Compilação:** Java 21 (target bytecode)
- **Execução:** Java 23 (runtime)
- **Spring Boot:** 3.2.1 (requer Java 17+ mínimo)

### Configuração Recomendada

1. **Instalar Java 23:**

   ```bash
   # macOS (usando Homebrew)
   brew install openjdk@23

   # Ou baixar diretamente do Oracle/OpenJDK
   ```

2. **Configurar JAVA_HOME:**

   ```bash
   export JAVA_HOME=/opt/homebrew/opt/openjdk@23
   export PATH=$JAVA_HOME/bin:$PATH
   ```

3. **Verificar versão:**
   ```bash
   java -version  # Deve mostrar Java 23
   ```

## Troubleshooting

### Problemas Comuns

#### 1. Erro: "No plugin found for prefix 'spring-boot'"

**Solução:** Use o JAR compilado diretamente:

```bash
mvn clean install -Dmaven.compiler.release=21
java -jar target/inventory-control-backend-0.0.1-SNAPSHOT.jar
```

#### 2. Erro de conexão com banco de dados

**Solução:** Verifique se:

- PostgreSQL está rodando: `brew services list | grep postgres`
- Banco foi criado: `createdb inventory_control`
- Credenciais estão corretas no `application.properties`

#### 3. Incompatibilidade de Java

**Solução:**

- Compile com Java 21: `-Dmaven.compiler.release=21`
- Execute com Java 23: `java -version` deve mostrar 23.x

#### 4. Porta 8080 já em uso

**Solução:** Altere a porta no `application.properties`:

```properties
server.port=8081
```

## Modelo de Dados

### Entidades

#### Product (products)

- `id` - Identificador único
- `name` - Nome do produto
- `value` - Valor do produto

#### RawMaterial (raw_materials)

- `id` - Identificador único
- `name` - Nome da matéria-prima
- `stock_quantity` - Quantidade em estoque

#### ProductRawMaterial (product_raw_materials)

- `product_id` - ID do produto
- `raw_material_id` - ID da matéria-prima
- `quantity` - Quantidade necessária

## Dados de Exemplo

O sistema inclui dados de exemplo que são carregados automaticamente:

### Matérias-Primas

- Steel (1000 unidades)
- Plastic (500 unidades)
- Rubber (300 unidades)
- Glass (200 unidades)
- Aluminum (150 unidades)
- Cotton (800 unidades)
- Wood (600 unidades)
- Copper (100 unidades)

### Produtos

- Car Wheel ($250.00)
- Smartphone Case ($15.50)
- Office Chair ($180.00)
- Water Bottle ($12.00)
- Laptop Stand ($45.00)

## Algoritmo de Sugestão de Produção

O sistema prioriza produtos por maior valor e calcula:

1. Quantidade máxima que pode ser produzida com estoque atual
2. Valor total da produção sugerida
3. Ordenação decrescente por valor do produto

## Testes

Execute os testes com:

```bash
mvn test
```

## Estrutura do Projeto

```
src/
├── main/
│   ├── java/com/inventory/
│   │   ├── config/         # Configurações (CORS, etc.)
│   │   ├── controller/     # Controllers REST
│   │   ├── dto/           # Data Transfer Objects
│   │   ├── model/         # Entidades JPA (Jakarta)
│   │   ├── repository/    # Repositórios Spring Data
│   │   ├── service/       # Lógica de negócio
│   │   └── InventoryControlApplication.java
│   └── resources/
│       ├── application.properties
│       └── data.sql      # Dados de exemplo
└── test/
    └── java/com/inventory/
        └── InventoryControlApplicationTests.java
```

### Detalhes Técnicos

- **Validações:** Jakarta Bean Validation 3.0
- **Persistência:** JPA 3.1 com Hibernate 6.x
- **Web:** Spring Web MVC 6.x
- **Serialização:** Jackson com suporte Jakarta
- **Documentação:** SpringDoc OpenAPI 3

## Próximos Passos

### ✅ Implementado

- ✅ Migration para Jakarta EE (Spring Boot 3.x)
- ✅ Compatibilidade Java 21/23
- ✅ Configuração PostgreSQL
- ✅ API REST completa
- ✅ Documentação Swagger/OpenAPI
- ✅ Validação de dados
- ✅ CORS configurado

### 🔄 Em Desenvolvimento

1. Testes unitários mais abrangentes
2. Testes de integração
3. Implementar cache com Redis
4. Adicionar logs estruturados
5. Implementar métricas e monitoramento
6. Adicionar autenticação e autorização
7. Docker containerization
8. CI/CD pipeline
