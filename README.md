# 📱 SENAI Suíço-Brasileira - App de Cursos Mobile

## 📋 Sobre o Projeto

Aplicativo mobile desenvolvido em **React Native** com **Expo** para divulgação dos cursos do SENAI Suíço-Brasileira. O app oferece uma experiência interativa onde os usuários podem visualizar todos os cursos disponíveis, ver detalhes completos em modais, realizar matrículas e entrar em contato com a escola.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|------------|--------|-------------|
| **React Native** | 0.74.5 | Framework para desenvolvimento mobile |
| **Expo** | ~51.0.0 | Plataforma para desenvolvimento React Native |
| **React Native Paper** | 5.12.3 | Biblioteca de UI (Material Design) |
| **Expo SQLite** | ~14.0.0 | Banco de dados local |
| **React Navigation** | 6.1.9 | Navegação entre telas |
| **Axios** | 1.7.2 | Requisições HTTP |
| **Expo Vector Icons** | 14.0.0 | Ícones personalizados |

---

## 📁 Estrutura de Pastas

```
senai-cursos-app/
│
├── src/
│   ├── components/                 # Componentes reutilizáveis
│   │   ├── CourseCard.js          # Card de curso (componente separado)
│   │   ├── Header.js              # Cabeçalho personalizado
│   │   └── ContactForm.js         # Formulário de contato
│   │
│   ├── screens/                    # Telas do aplicativo
│   │   ├── HomeScreen.js          # Tela principal (lista de cursos)
│   │   └── AboutScreen.js         # Tela sobre a escola e contato
│   │
│   ├── services/                   # Serviços e lógica de negócio
│   │   ├── database.js            # Configuração e operações SQLite
│   │   └── api.js                 # Configuração do Axios
│   │
│   ├── styles/                     # Estilos globais
│   │   └── globalStyles.js        # Estilos compartilhados
│   │
│   └── utils/                      # Utilitários
│       └── constants.js           # Constantes do aplicativo
│
├── App.js                          # Componente principal
├── app.json                        # Configuração do Expo
├── package.json                    # Dependências do projeto
├── babel.config.js                 # Configuração do Babel
└── README.md                       # Documentação do projeto
```

---

## 🛠️ Instalação e Configuração do Ambiente

### Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** (gerenciador de pacotes)
- **Git** (controle de versão)
- **Expo CLI** globalmente: `npm install -g expo-cli`
- **Editor de código** (VS Code recomendado)

### Ambiente Mobile para Testes (opcional)

- **Android Studio** (para emulador Android) ou
- **Xcode** (para emulador iOS - apenas Mac)
- **Expo Go** app no smartphone (Android/iOS)

---

## 📦 Criação do App e Instalação de Pacotes

### Passo 1: Criar o projeto Expo

```bash
# Criar novo projeto Expo com JavaScript
npx create-expo-app senai-cursos-app

# Acessar a pasta do projeto
cd senai-cursos-app

# Iniciar o projeto para verificar se está funcionando
npx expo start
```

### Passo 2: Instalar dependências principais

```bash
# UI Library (React Native Paper)
npm install react-native-paper

# Ícones
npm install react-native-vector-icons
npx expo install @expo/vector-icons

# Banco de dados SQLite
npx expo install expo-sqlite

# Navegação
npm install @react-navigation/native @react-navigation/bottom-tabs
npx expo install react-native-screens react-native-safe-area-context

# HTTP Client
npm install axios

# Utilitários adicionais
npm install react-native-gesture-handler
```

### Passo 3: Verificar dependências no package.json

Após a instalação, seu `package.json` deve conter:

```json
{
  "name": "senai-cursos-app",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "expo": "~51.0.0",
    "expo-sqlite": "~14.0.0",
    "react": "18.2.0",
    "react-native": "0.74.5",
    "react-native-paper": "^5.12.3",
    "react-native-vector-icons": "^10.0.3",
    "@expo/vector-icons": "^14.0.0",
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/bottom-tabs": "^6.5.11",
    "react-native-screens": "3.31.1",
    "react-native-safe-area-context": "4.10.1",
    "axios": "^1.7.2"
  }
}
```

---

## 🏗️ Organização do Projeto (Arquitetura)

O projeto segue uma **arquitetura baseada em componentes** com separação clara de responsabilidades:

### 1. **Camada de Apresentação (screens/components)**
- **Screens**: Componentes de tela completos (HomeScreen, AboutScreen)
- **Components**: Componentes reutilizáveis (CourseCard, Header, ContactForm)

### 2. **Camada de Serviços (services)**
- **database.js**: Gerencia conexão e operações com SQLite
- **api.js**: Configura chamadas HTTP com Axios

### 3. **Camada de Estilos (styles)**
- **globalStyles.js**: Estilos centralizados para consistência visual

### 4. **Camada de Utilitários (utils)**
- **constants.js**: Constantes como cores, textos, configurações

### Fluxo da Arquitetura:

```
Usuário → Tela (HomeScreen) → Serviço (database.js) → SQLite
                ↓
           Componente (CourseCard)
                ↓
            Modal com Detalhes
```

---

## 🔧 Criação de Todos os Componentes

### 1. **Serviço de Banco de Dados** (`src/services/database.js`)

```javascript
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('senai_cursos.db');

// Inicializa tabela e popula dados
export const initDatabase = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      level TEXT NOT NULL,
      duration TEXT NOT NULL,
      area TEXT NOT NULL,
      professor TEXT NOT NULL,
      rating REAL NOT NULL
    );
  `);
  
  // Popula com 18 cursos (3 por área)
  await populateCourses();
};

// Busca todos os cursos
export const getCourses = async () => {
  return await db.getAllAsync('SELECT * FROM courses ORDER BY title ASC;');
};
```

### 2. **Tela Principal** (`src/screens/HomeScreen.js`)

- Lista todos os cursos usando FlatList
- Cada curso é um Card clicável
- Ao clicar, abre Modal com detalhes completos
- Botões de matrícula e contato funcionais
- Pull-to-refresh para recarregar

### 3. **Tela Sobre** (`src/screens/AboutScreen.js`)

- Informações institucionais da escola
- Endereço e contatos
- Formulário de contato integrado com e-mail
- Redes sociais

### 4. **Estilos Globais** (`src/styles/globalStyles.js`)

- Centraliza cores (primária: #FF6B00)
- Padroniza cards, modais, botões
- Responsivo para diferentes tamanhos de tela

### 5. **Componente Principal** (`App.js`)

- Configura navegação por abas (Bottom Tabs)
- Aplica tema personalizado
- Gerencia inicialização do banco de dados
- Tela de loading durante setup

---

## ⚙️ Configurações do App

### 1. **Configuração do Tema (App.js)**

```javascript
import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B00',    // Laranja SENAI
    accent: '#003366',     // Azul institucional
    background: '#f5f5f5',
  },
};
```

### 2. **Configuração da Navegação (App.js)**

```javascript
<Tab.Navigator
  screenOptions={{
    tabBarActiveTintColor: '#FF6B00',
    tabBarInactiveTintColor: 'gray',
    headerStyle: { backgroundColor: '#FF6B00' },
    headerTintColor: '#fff',
  }}
>
  <Tab.Screen name="Cursos" component={HomeScreen} />
  <Tab.Screen name="Sobre" component={AboutScreen} />
</Tab.Navigator>
```

### 3. **Dados do Banco (SQLite)**

O banco é populado automaticamente na primeira execução com **18 cursos** distribuídos em 6 áreas:

| Área | Cursos | Carga Horária |
|------|--------|---------------|
| Front-end | React, UI/UX, Vue.js | 30-40h |
| Back-end | Node.js, Python, PHP | 25-50h |
| Banco de Dados | SQL, Modelagem, NoSQL | 20-35h |
| UI/UX | Design Thinking, Prototipação | 25-35h |
| Projetos Scrum | Scrum Master, PO | 20-40h |
| DevOps Cloud | Docker, CI/CD, AWS | 30-45h |

---

## 🧪 Como Testar o Aplicativo

### Método 1: Teste com Expo Go (Recomendado)

1. **Inicie o servidor Expo:**
   ```bash
   npx expo start
   ```

2. **Escaneie o QR Code:**
   - **Android**: Baixe o app "Expo Go" na Play Store
   - **iOS**: Baixe o app "Expo Go" na App Store
   - Abra o app e escaneie o QR Code do terminal

3. **O app abrirá automaticamente** no seu dispositivo

### Método 2: Teste com Emulador

**Android (Android Studio):**
```bash
# Certifique-se que o emulador está rodando
npx expo start --android
```

**iOS (Apenas Mac):**
```bash
npx expo start --ios
```

### Método 3: Teste Web (Desenvolvimento)
```bash
npx expo start --web
```

---

## ✅ Plano de Testes

### Teste 1: Carregamento Inicial
- [ ] App abre sem erros
- [ ] Tela de loading aparece
- [ ] Cursos são carregados do SQLite
- [ ] Lista exibe todos os 18 cursos

### Teste 2: Funcionalidades dos Cards
- [ ] Ao clicar em um card, modal abre
- [ ] Modal exibe: título, subtítulo, nível, duração, professor, área, classificação
- [ ] Botão "Realizar Matrícula" exibe alerta
- [ ] Botão "Contato" abre app de e-mail
- [ ] Botão "Fechar" fecha o modal

### Teste 3: Navegação
- [ ] Aba "Cursos" mostra a lista
- [ ] Aba "Sobre" mostra informações da escola
- [ ] Transição entre abas é suave

### Teste 4: Formulário de Contato
- [ ] Todos os campos são obrigatórios
- [ ] Ao enviar, abre cliente de e-mail
- [ ] E-mail é preenchido automaticamente

### Teste 5: Banco de Dados
- [ ] Dados persistem após fechar o app
- [ ] Pull-to-refresh recarrega corretamente
- [ ] Não duplica cursos ao reiniciar

---

## 📱 Funcionalidades Implementadas

✅ **Tela principal** com todos os cursos  
✅ **Modal** com detalhes completos do curso  
✅ **Título, subtítulo, nível, duração** de cada curso  
✅ **Áreas:** front-end, back-end, banco de dados, UI/UX, projetos com scrum, devops com nuvem  
✅ **Professor e classificação** de cada curso  
✅ **Botão de matrícula** (simulado com alerta)  
✅ **Botão de contato** (integração com e-mail)  
✅ **SQLite** para armazenamento local  
✅ **React Native Paper** (UI Library justificada)  
✅ **Informações da escola** (endereço, contato, redes sociais)  
✅ **Formulário de contato** integrado  
✅ **Mínimo de 3 cursos por área** (total 18 cursos)  

---

## 🎯 Resultado Esperado

Ao final do desenvolvimento, você terá:

1. **Aplicativo funcional** rodando em dispositivos Android/iOS
2. **Banco de dados local** com 18 cursos pré-carregados
3. **Interface moderna** seguindo Material Design
4. **Navegação intuitiva** entre telas
5. **Persistência de dados** com SQLite
6. **Código organizado** seguindo arquitetura de componentes
7. **Documentação completa** para manutenção

---

## 📞 Suporte e Contato

**Desenvolvido para:** SENAI Suíço-Brasileira  
**Tecnologias:** React Native, Expo, SQLite, React Native Paper  
**Documentação:** Atualizada em Maio/2026

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais informações.

---

## 🔗 Links Úteis

- [Documentação React Native](https://reactnative.dev/)
- [Documentação Expo](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Expo SQLite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
- [React Navigation](https://reactnavigation.org/)

---

**Desenvolvido com 💚 para o SENAI Suíço-Brasileira**
