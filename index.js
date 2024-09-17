const express = require('express');
const handlebars = require('express-handlebars');
const Usuario = require('./models/Usuario');
const api = require('./api/photosAPI.json');
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
                    photo: rndPhoto()
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

app.get('/add/:id', function(req, res) {
    const userId = req.params.id;
    const newRequest = user_logado;

    Usuario.findOne({ where: { id: userId } })
        .then(function(user){
            // verifica se solic é um array
            let solicitudes = Array.isArray(user.solic) ? user.solic : [];

            // verifica se a solicitação já está no json para não repetir
            if (!solicitudes.includes(newRequest)) {
                solicitudes.push(newRequest);

            return Usuario.update({ solic: solicitudes },{ where: { id: userId } }
            )}
        }).then(() => {
            console.log(`Usuário atualizado com sucesso`);
            res.redirect('/empresa');
        }).catch(erro => {
            console.log(`Ocorreu o erro ${erro}`);
            res.status(500).send(`Erro ao atualizar usuário: ${erro}`);
        });
});






app.listen('8922', function(){
    console.log("Server_ON")
})


function rndPhoto(){
    let rdn = RandomNumber(0, api.photos.length)
    return api.photos[rdn];
}

function RandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
