# Instruções para Executar o Projeto

Para executar este projeto, é necessário ter o Node.js instalado no seu sistema. Se ainda não o tiver, você pode baixá-lo [aqui](https://nodejs.org/en/download/).

Além disso, você precisa ter o npm (Node Package Manager) ou o Yarn instalados. O npm é incluído automaticamente na instalação do Node.js. Se preferir usar o Yarn, você pode instalá-lo seguindo as instruções [aqui](https://yarnpkg.com/getting-started/install).

## Passos para Executar o Projeto

1. **Clone o Repositório:**
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
   ```

2. **Instale as Dependências do Servidor:**
   ```bash
   cd server
   npm install
   ```

3. **Inicie o Servidor:**
   ```bash
   npm start
   ```

4. **Abra um Novo Terminal e Navegue até o Diretório Web:**
   ```bash
   cd ../web
   ```

5. **Instale as Dependências da Interface Web:**
   ```bash
   npm install
   ```

6. **Inicie a Interface Web:**
   ```bash
   npm start
   ```

7. Se todas as instalações foram bem-sucedidas, ambos os terminais devem indicar que o servidor está rodando.

8. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

Agora você deve ser capaz de acessar e interagir com o projeto localmente. Se houver qualquer problema durante o processo de instalação, verifique as mensagens de erro e certifique-se de seguir cada passo corretamente.