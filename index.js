const express = require('express');
const handlebars = require('express-handlebars');
const Usuario = require('./models/Usuario');

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
                where: {
                   user: username,
                   senha: senha
                },
             });
             if(user_exist){
                res.redirect('/empresa')
             } else{
                console.log('Nome de usuário ou senha incorretos');
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
                senha: senha
            }).then(function(){
                res.redirect("/empresa")
            }).catch(function(erro){
                res.send(`Ocorreu o erro: ${erro}`)
            })
        } else{
            res.send('As senhas devem ser iguais')
        }
    } else{
        res.redirect('/register')
    }
})
app.get('/empresa', function(req,res){
    Usuario.findAll({order: [['id', 'DESC']]}).then(function(listaUsuarios){
        res.render('home', {listaUsuarios: listaUsuarios})
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
