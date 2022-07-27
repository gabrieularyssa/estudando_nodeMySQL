const express = require ('express');
//pegando apenas a função engine do 'express-handlebars'
const {engine} = require('express-handlebars');
const mysql = require('mysql');
const port = 3000
const app = express()
//configurando o express para resgatar dados do body
app.use(
    express.urlencoded({ 
        extended: true
    })
)
//para pegar dados do body em formato json
app.use(express.json())
//configurando o handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars')
//preparando para receber arquivos estaticos, um exemplo é o css
app.use(express.static('public'))
//preparando a renderização da rota
app.get('/', (req, res)=>{
    res.render('home')
})
//rota para inserir dados dentro do banco de dados
app.post('/books/insertbook', (req, res) => {
    //a requisição é feita pelo name do form
    const title = req.body.title
    const idade = req.body.idade
    const sql = `INSERT INTO new_table (nome, idade) VALUES ('${title}','${idade}')`
//executando a query sql
    conn.query(sql, function(err){
        if(err){
            console.log(err)
        }
        //apos a realização da query a pagina é direcionada para a home
        res.redirect('/cadastro')
    })
})
//rota get para exibir dados do banco
app.get('/cadastro', (req, res)=>{
    const sql2 = "SELECT * FROM new_table"

    conn.query(sql2, function(err, data){
        if(err){
            console.log(err)
        }
        const nomes = data
        res.render('cadastros', { nomes })
    })
})
//rota get para um id especifico
app.get('/cadastro/:id', function (req, res) {
    const id = req.params.id
    const query = `SELECT * FROM new_table WHERE id = ${id}`
    conn.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
      const user = data[0]
      console.log(data[0])
      res.render('user', { user })
    })
  })

//editando um dado
app.get('/cadastro/edit/:id', function (req, res) {
    const id = req.params.id
    const query = `SELECT * FROM new_table WHERE id = ${id}`
    conn.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
      const user = data[0]
      console.log(data[0])
      res.render('editUser', { user })
    })
  })
//finalizando edição 
app.post('/cadastro/atualizarcadastro', (req, res)=> {
    const id = req.body.id
    const nome = req.body.nome
    const idade = req.body.idade

    const sql4 = `UPDATE new_table SET nome = '${nome}', idade = '${idade}' WHERE id = '${id}'`

    conn.query(sql4, function(err){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/cadastro')
    })
})
//removendo item do banco
app.post('/cadastro/remover/:id', (req, res)=>{
    const id = req.params.id
    const sql5 = `DELETE FROM new_table WHERE id = ${id}`

    conn.query(sql5, function(err){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/cadastro')
    })
})
//limpando todo o banco de dados
app.post('/cadastro/removertudo', (req, res)=>{
    const id = req.params.id
    const sql5 = `DELETE FROM new_table`
    conn.query(sql5, function(err){
        if(err){
            console.log(err)
            return
        }
        res.redirect('/cadastro')
    })
})

//conectando ao mysql
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'gabrieularyssa',
    password: 'gabri2022*',
    database: 'nodeestudo'
})

conn.connect(function(err){
    if(err){
        console.log(err)
    }
    console.log('Conectou ao mysql!!')
    app.listen(port)
})

