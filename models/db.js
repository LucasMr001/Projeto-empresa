const Sequelize = require('sequelize');
const sequelize = new Sequelize('trabalho_git', 'root', '654123', {
    host: 'localhost',
    dialect: 'mysql',
    query:{raw:true}
});

module.exports = {
    sequelize: sequelize,
    Sequelize: Sequelize
}