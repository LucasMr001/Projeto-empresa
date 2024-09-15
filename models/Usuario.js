const db = require('./db')

const Usuario = db.sequelize.define('empresa_git', {
    nome: {
        type: db.Sequelize.STRING
    },
    idade: {
        type: db.Sequelize.INTEGER
    },
    email: {
        type: db.Sequelize.STRING
    },
    sexo: {
        type: db.Sequelize.STRING
    }
})

Usuario.sync({force:true})

module.exports = Usuario