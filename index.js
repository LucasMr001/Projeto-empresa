const express = require('express');
const handlebars = require('express-handlebars');
const Usuario = require('./models/Usuario');
let user_logado = null;

const app = express();
app.engine('handlebars', handlebars.engine({
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
app.get('/register', function(req,res){
    res.render('registra');
})

app.post('/confirmlogin', async (req, res) => {
        const { username, senha } = req.body;
        if(username && senha){
            const user_exist = any = await Usuario.findOne({
                where: {user: username, senha: senha},
             });

             if(user_exist){
                user_logado = username;
                res.redirect('/empresa')
             } else{
                setTimeout(()=>{
                    res.redirect('/login')
                }, 100);
             }
        }else{
            setTimeout(()=>{
                res.redirect('/login')
            }, 100);
        }

});

app.post('/confirmregister', function(req, res){
    const { username, senha, senhaconfirm } = req.body;
    if(username && senha && senhaconfirm){
        if(senha==senhaconfirm){
            Usuario.create({
                user: username,
                senha: senha,
                photo: 'https://i.pinimg.com/564x/1a/12/32/1a123232bfeaaec0a23eb0f83158e76a.jpg'
            }).then(function(){
                user_logado = username;
                res.redirect("/empresa")
            }).catch(function(erro){
                res.send(`Ocorreu o erro: ${erro}`)
            })
        } else{
            setTimeout(()=>{
                res.redirect('/register')
            }, 100);
        }
    } else{
        setTimeout(()=>{
            res.redirect('/register')
        }, 100);
    }
})
app.get('/empresa', function(req,res){
    Usuario.findAll({order: [['id', 'DESC']]}).then(function(listaUsuarios){
        res.render('home', {listaUsuarios: listaUsuarios, user_logado})
    })
})

app.get('/deletar/:id', function(req, res){
    Usuario.destroy({where: {id: req.params.id}}).then(function(){
        res.redirect('/empresa');
        console.log(`Usuario deletado`)
    }).catch(function(erro){
        console.log(`Ocorreu o erro ${erro}`)
    })
})







app.listen('8922', function(){
    console.log("Server_ON")
})
