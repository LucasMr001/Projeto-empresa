const express = require('express');
const handlebars = require('express-handlebars');
const Usuario = require('./models/Usuario')

const app = express();
//configs:
app.engine('handlebars', handlebars({defaultLayout: 'principal'}))
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rotas:
// Tela principal
app.get('/', function(req, res){
    res.send(`Aqui será a página inicial de bem vindo do meu site<br><a href='localhost:8922/login'>Clique aqui para logar</a>`);
})
// Tela para logar
app.get('/login', function(req,res){
    res.render('login');
})
//Tela depois que o usuário põe o login e senha
app.get('/userlog', function(req, res){
    res.send(`Olá, ${req.body.username}, seja bem vindo!`)
})
app.listen('8922', function(){
    console.log("Server_ON")
})
