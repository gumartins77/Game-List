const routes = require("express").Router();
const JogoController = require("../controllers/Jogo.Controller");

routes.get("/", JogoController.getAll);

module.exports = routes;
