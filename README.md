# 🚗 Vehicle Management Dashboard

Uma aplicação web moderna de gerenciamento de frotas veiculares desenvolvida com Angular 19, permitindo o monitoramento em tempo real de veículos, visualização de dados técnicos e gestão centralizada de frota.

---

## 📋 Funcionalidades Principais

✨ **Autenticação e Segurança**
- Sistema de login seguro com persistência de sessão
- Suporte a manutenção de sessão (Remember Me)
- Guards de rota para proteção de páginas autenticadas

🚙 **Gerenciamento de Frota**
- Listagem completa de veículos disponíveis
- Busca e filtro dinâmico por modelo de veículo
- Seleção e visualização de detalhes por veículo

📊 **Dashboard de Monitoramento**
- Métricas consolidadas: total de vendas, veículos conectados, atualizações de software
- Pesquisa por código VIN para obtenção de dados em tempo real
- Exibição de odômetro, nível de combustível e status do veículo

📍 **Localização Geográfica**
- Visualização de coordenadas GPS (latitude e longitude)
- Rastreamento de posição em tempo real dos veículos

🎨 **Interface Responsiva**
- Design moderno com Bootstrap 5
- Ícones intuitivos via Bootstrap Icons
- Layout adaptável para diferentes dispositivos

---

## 🛠️ Tecnologias Utilizadas

| Categoria | Tecnologias |
|-----------|-----------|
| **Framework Frontend** | Angular 19.2.0 |
| **Linguagem** | TypeScript 5.7.2 |
| **HTTP Client** | @angular/common/http |
| **Roteamento** | @angular/router |
| **Programação Reativa** | RxJS 7.8.0 |
| **UI Framework** | Bootstrap 5.3.8 |
| **Ícones** | Bootstrap Icons 1.13.1 |
| **Testes** | Jasmine 5.6.0, Karma 6.4.0 |
| **Build & Dev Tools** | Angular CLI 19.2.27, Angular DevKit 19.2.27 |

---

## 📦 Pré-requisitos e Instalação

### Requisitos do Sistema

Antes de iniciar, certifique-se de ter instalado em sua máquina:

- **Node.js** versão 18.x ou superior
- **npm** versão 9.x ou superior
- **Angular CLI** versão 19.x

### Verificar Versões

```bash
# Verificar versão do Node.js
node --version

# Verificar versão do npm
npm --version

# Verificar versão do Angular CLI (se já instalado)
ng --version
```

### Instalação do Projeto

#### 1️⃣ **Clone o repositório**
```bash
git clone https://github.com/joaoribeiroodev/Sprint7_Angular.git
cd Sprint7_Angular
```

#### 2️⃣ **Instale as dependências**
```bash
npm install
```

#### 3️⃣ **Inicie o servidor de desenvolvimento**
```bash
npm start
```

O aplicativo será aberto automaticamente em `http://localhost:4200/` no seu navegador padrão.

### Comandos Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm start
# ou
ng serve

# Compilar para produção
npm run build

# Executar testes unitários
npm test

# Compilar com observação de alterações
npm run watch
```

---

## 📁 Estrutura de Pastas

```
Sprint7_Angular/
├── src/
│   ├── app/
│   │   ├── dashboard/                 # 📊 Módulo de Dashboard
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   ├── dashboard.component.css
│   │   │   └── dashboard.module.ts
│   │   │
│   │   ├── login/                     # 🔐 Módulo de Autenticação
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.module.ts
│   │   │
│   │   ├── home/                      # 🏠 Módulo Home
│   │   │   ├── home.component.ts
│   │   │   ├── home.component.html
│   │   │   └── home.module.ts
│   │   │
│   │   ├── services/                  # 🔧 Serviços HTTP
│   │   │   ├── auth.service.ts        # Serviço de autenticação
│   │   │   └── vehicle.service.ts     # Serviço de veículos
│   │   │
│   │   ├── models/                    # 📐 Interfaces de Dados
│   │   │   ├── usuario.model.ts       # Modelo de usuário e login
│   │   │   └── veiculo.model.ts       # Modelo de veículos
│   │   │
│   │   ├── guards/                    # 🛡️ Guards de Rota
│   │   │   ├── auth.guard.ts          # Proteção de rotas autenticadas
│   │   │   └── login.guard.ts         # Proteção de página de login
│   │   │
│   │   ├── shared/                    # 🔄 Componentes Compartilhados
│   │   │   ├── components/
│   │   │   │   └── sidebar/           # Barra lateral navegação
│   │   │   ├── directives/            # Diretivas customizadas
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── constants/                 # ⚙️ Constantes da Aplicação
│   │   │   └── api.constants.ts
│   │   │
│   │   ├── app.module.ts              # Módulo raiz da aplicação
│   │   ├── app-routing.module.ts      # Configuração de rotas
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.css
│   │
│   ├── index.html                     # 📄 Página HTML principal
│   ├── main.ts                        # 🚀 Ponto de entrada da aplicação
│   └── styles.css                     # 🎨 Estilos globais
│
├── public/                            # 📦 Arquivos públicos estáticos
├── angular.json                       # ⚙️ Configuração Angular CLI
├── tsconfig.json                      # TypeScript: configuração geral
├── tsconfig.app.json                  # TypeScript: configuração da app
├── tsconfig.spec.json                 # TypeScript: configuração de testes
├── karma.conf.js                      # 🧪 Configuração de testes
├── package.json                       # 📋 Dependências do projeto
└── README.md                          # 📖 Este arquivo
```

---

## 🚀 Como Usar

### 1. Fazer Login
- Acesse a página de login em `http://localhost:4200/`
- Insira suas credenciais de usuário
- Marque "Lembrar de mim" para manter a sessão persistida (opcional)

### 2. Acessar o Dashboard
- Após autenticação bem-sucedida, você será redirecionado para o dashboard
- Visualize a lista de veículos disponíveis em sua frota

### 3. Filtrar Veículos
- Use a barra de busca para filtrar veículos por modelo em tempo real
- O filtro funciona com debounce de 300ms para melhor performance

### 4. Obter Dados do Veículo
- Selecione um veículo da lista
- Digite o código VIN (Vehicle Identification Number) para consultar dados específicos
- Os dados em tempo real serão exibidos (odômetro, combustível, coordenadas GPS, etc.)

### 5. Gerenciar Sessão
- Clique no menu de usuário (canto superior direito)
- Selecione "Sair" para fazer logout

---

## 🔑 Recursos Técnicos Principais

### Reactive Programming com RxJS
- Uso de Subjects para gerenciamento de estado
- Operadores como `debounceTime`, `distinctUntilChanged`, `switchMap`, `catchError`
- Unsubscribe automático com `takeUntil` padrão

### Route Guards
- **AuthGuard**: Protege rotas que requerem autenticação
- **LoginGuard**: Impede acesso à página de login se já autenticado

### Persistência de Dados
- Suporte a SessionStorage (sessão atual)
- Suporte a LocalStorage (sessão persistida)
- Limpeza automática ao fazer logout

### Componentes Modularizados
- Arquitetura baseada em módulos independentes
- Fácil manutenção e escalabilidade
- Compartilhamento de componentes via SharedModule

---

## 📝 Licença

Este projeto é parte do Sprint 7 e está disponível para fins educacionais e de desenvolvimento.

---

## 👤 Autor

**João Ribeiro**
- GitHub: [@joaoribeiroodev](https://github.com/joaoribeiroodev)
- Repositório: [Sprint7_Angular](https://github.com/joaoribeiroodev/Sprint7_Angular)

---

## 💡 Observações Importantes

- Certifique-se de que sua API backend está configurada corretamente em `src/app/constants/api.constants.ts`
- O projeto utiliza Bootstrap 5 como framework CSS principal
- Todos os serviços HTTP utilizam RxJS para operações assíncronas
- A aplicação é totalmente responsiva e funciona em navegadores modernos

---

**Última atualização:** Junho 2026 | **Versão:** 1.0.0
