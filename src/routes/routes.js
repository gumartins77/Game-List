const routes = require("express").Router();
const JogoController = require("../controllers/Jogo.Controller");

routes.get("/", JogoController.getAll);
routes.get("/cadastro", JogoController.cadastro);
routes.post("/create", JogoController.create);

module.exports = routes;
