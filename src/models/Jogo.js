const Sequelize = require("sequelize");
const connection = require("../database/db");

const Jogo = connection.define("jogo", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  genero: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  descricao: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  plataforma: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lancamento: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  estudio: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imagem: {
    type: Sequelize.STRING,
    allowNull: false,
  },
}, 
{
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
}
);

module.exports = Jogo;
