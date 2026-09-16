# Renkontech Site

Projeto frontend desenvolvido com **React**, **Vite** e **Firebase**.

---

## 🛠️ Tecnologias Utilizadas

* **React**
* **Vite**
* **Firebase**
* **React Router**

---

## 📋 Pré-requisitos

Certifique-se de ter o **Node.js** (com **npm**) e o **Git** instalados na sua máquina.

Para verificar se estão instalados, execute no terminal ou PowerShell:

```bash
node -v
npm -v
git --version

```

---

## 🚀 Como Executar o Projeto

### 1. Clonar o Repositório

```bash
git clone https://github.com/ks-12345/RenkonTech.git
cd renkontech-site

```

### 2. Instalar as Dependências

```bash
npm install

```

Este comando instalará todas as dependências declaradas no `package.json`.

### 3. Configurar as Variáveis de Ambiente

Crie um arquivo chamado `.env` na raiz do projeto:

```text
renkontech-site
├── src/
├── .env          <-- Criar este arquivo
├── .gitignore
├── package.json
└── README.md

```

Adicione as configurações do seu projeto Firebase dentro do `.env`:

```env
VITE_FIREBASE_API_KEY=sua_chave
VITE_FIREBASE_AUTH_DOMAIN=renkon-tech.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=renkon-tech
VITE_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
VITE_FIREBASE_MEASUREMENT_ID=seu_measurement_id

```

> ⚠️ **Atenção:** O arquivo `.env` contém credenciais e não deve ser commitado no GitHub. Certifique-se de que ele esteja incluído no arquivo `.gitignore`.

### 4. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev

```

O Vite indicará o endereço local no terminal (normalmente `http://localhost:5173/`). Abra a URL no seu navegador para visualizar a aplicação.
