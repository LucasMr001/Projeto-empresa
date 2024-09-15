const Sequelize = require('sequelize');
const sequelize = new Sequelize('Banco_Empresa', 'root', '654123', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}