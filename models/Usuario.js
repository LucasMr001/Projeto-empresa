const db = require('./db')

const Usuario = db.sequelize.define('usuarios', {
    user: {
        type: db.Sequelize.STRING
    },
    senha: {
        type: db.Sequelize.STRING
    },
    photo: {
        type: db.Sequelize.TEXT
    }
})

// Cria tabela sempre que executa:
//Usuario.sync({force:true})

module.exports = Usuario