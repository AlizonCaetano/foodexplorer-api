## 💻 Sobre o projeto
FoodExplorer é um projeto que simula um cardápio virtual para um restaurante fictício.
Será possivel criar uma conta e acessar a plataforma, também será possivel visualizar e pesquisar os pratos como usuário comum. 
O acesso de administrador permite que seja visualizado, pesquisado, criado, editado e excluir qualquer prato do restaurante.

## 🛠 Tecnologias
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node.js](https://nodejs.org/en/)
- [Nodemon](https://nodemon.io/)
- [Express](https://expressjs.com)
- [SQLite](https://www.sqlite.org/index.html)
- [Knex](https://knexjs.org/)
- [BCryptjs](https://www.npmjs.com/package/bcryptjs)
- [JSON Web Token](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [Axios](https://www.npmjs.com/package/axios)
  
______
### Clone o projeto para usar localmente em sua máquina
```bash
git clone https://github.com/AlizonCaetano/foodexplorer-api.git
```

### Executando o projeto
```bash
# Preencha a variavel ambiente de exemplo do arquivo .env vazio
  AUTH_SECRET=

# Instale as dependências necessárias
$ npm install

# Agora inicie o servidor do BackEnd
$ npm run dev
```
#### Abra seu navegador e acesse o localhost na porta 3232
[http://localhost:3232](http://localhost:3232)

###  Entendendo as rotas

```bash
/dishes #get -> lista todos os pratos
/dishes #post -> cria o prato
/dishes/:id #put -> atualiza os dados do prato
/dishes/:id #get -> busca os dados do prato
/dishes/:id #delete -> exclui os dados do prato

/sessions #post -> cria uma sessão de usuário
/users  #post -> cria um usuário
```

