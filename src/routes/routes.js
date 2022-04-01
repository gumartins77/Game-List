const routes = require("express").Router();
const JogoController = require("../controllers/Jogo.Controller");

routes.get("/", JogoController.getAll);
routes.get("/detalhes/:id", JogoController.detalhes);
routes.get("/cadastro", JogoController.cadastro);
routes.post("/create", JogoController.create);
routes.get("/getById/:id/:method", JogoController.getById);
routes.post("/update/:id", JogoController.update);
routes.get("/remove/:id", JogoController.remove);

module.exports = routes;
