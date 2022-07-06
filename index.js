const express = require ('express');
const {engine} = require('express-handlebars');
const mysql = require('mysql');

const app = express()

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())
//console.log(exphbs.ExpressHandlebars())

app.engine('handlebars', engine());

app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('home')
})

app.post('/books/insertbook', (req, res) => {
    const title = req.body.title
    const idade = req.body.idade

    const sql = `INSERT INTO new_table (nome, idade) VALUES ('${title}','${idade}')`

    conn.query(sql, function(err){
        if(err){
            console.log(err)
        }

        res.redirect('/')
    })
})

//conexao mysql

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

    app.listen(3000)
})

