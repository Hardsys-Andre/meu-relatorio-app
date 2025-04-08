🚀 FlexiReport

FlexiReport é uma aplicação web para a geração dinâmica de relatórios personalizados, oferecendo uma interface intuitiva e funcionalidades avançadas para manipulação de dados.

🛠️ Tecnologias Utilizadas

⚛️ React: Framework JavaScript para a construção da interface do usuário.

🎨 Tailwind CSS: Estilização eficiente e responsiva.

🟨 JavaScript: Linguagem principal do desenvolvimento frontend.

☁️ MongoDB Atlas: Banco de dados utilizado na aplicação.

🌐 Servidor em Node.js: Comunicação com o backend via API.

🔐 Autenticação Segura: Implementada no backend utilizando email e senha consultados diretamente no banco de dados.

## 📂 Estrutura do Projeto

```
FlexiReport/
│-- backend/        # Servidor em Node.js
│-- frontend/       # Aplicação React.js
│-- public/         # Arquivos estáticos
│-- src/
│   │-- components/ # Componentes reutilizáveis
│   │-- pages/      # Páginas principais
│   │-- utils/      # Funções auxiliares
│-- package.json    # Dependências do projeto
│-- README.md       # Documentação do projeto
```

## 🛠 Funcionalidades Principais

- **Editor de Texto Avançado:** Uso do TinyMCE para formatação rica
- **Inserção de Imagens:** Suporte a imagens locais e remotas
- **Geração de Relatórios:** Exportação de documentos em diferentes formatos (PDF, DOCX, CSV)
- **Autenticação Segura:** Login com email e senha, validado no backend
- **Banco de Dados:** Armazenamento de relatórios no MongoDB Atlas

## 📸 Capturas de Tela

*(Inclua aqui imagens do sistema funcionando, se desejar)*

📥 Instalação e Execução

1️⃣ Clonar o Repositório

git clone https://github.com/seu-usuario/flexireport-frontend.git

2️⃣ Instalar Dependências

cd flexireport-frontend
npm install

3️⃣ Configurar Variáveis de Ambiente

Crie um arquivo .env.local na raiz do projeto e adicione as configurações necessárias, como a URL da API backend.

4️⃣ Iniciar o Projeto

npm run dev

⚠️ Observação Importante

O backend do FlexiReport é um projeto separado e precisa ser baixado e executado separadamente. Certifique-se de configurar e rodar o backend antes de utilizar o frontend.

🔗 Repositório do Backend: Acesse aqui

🤝 Contribuição

Sinta-se à vontade para contribuir com o projeto! Para isso, siga as etapas:

🍴 Faça um fork do repositório.

🌿 Crie uma nova branch para suas alterações.

📩 Envie um pull request para análise.

📜 Licença

Este projeto está sob a licença MIT.
