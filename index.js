const express = require('express');
const handlebars = require('express-handlebars');
const Usuario = require('./models/Usuario');

const app = express();
//configs:
app.engine('handlebars', handlebars.engine({
    // configs do handlebars mais atualizadas
    defaultLayout: 'principal',
    runtimeOptions:{
        allowProtoMethodsByDefault: true,
        allowedProtoMethodsByDefault: true,
    }}))
app.set('view engine', 'handlebars');
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Rotas:
app.get('/', function(req,res){
    res.render('inicial');
})
app.get('/login', function(req,res){
    res.render('login');
})
app.get('/registro', function(req,res){
    res.render('registra');
})
app.post('/userlog', function(req, res){
    Usuario.create({
        user: req.body.username,
        senha: req.body.senha
    }).then(function(){
        res.redirect("/empresa")
    }).catch(function(erro){
        res.send(`Ocorreu o erro: ${erro}`)
    })
})
app.get('/empresa', function(req,res){
    Usuario.findAll({order: [['id', 'DESC']]}).then(function(listaUsuarios){
        console.log(listaUsuarios)
        res.render('home', {listaUsuarios: listaUsuarios})
    })
})

app.listen('8922', function(){
    console.log("Server_ON")
})
