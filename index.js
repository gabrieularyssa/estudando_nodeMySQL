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
        res.redirect('/')
    })
})
//rota get para pegar dados do banco de dados
app.get('/inserido', (req, res)=>{
    const sql2 = "SELECT * FROM new_table"

    conn.query(sql2, function(err, data){
        if(err){
            console.log(err)
        }
        const nomes = data
        res.render('cadastros', { nomes })
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

