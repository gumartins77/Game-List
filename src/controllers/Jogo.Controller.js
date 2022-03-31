const res = require("express/lib/response");
const Jogo = require("../models/Jogo");

const getAll = async (req, res) => {
  try {
    const jogos = await Jogo.findAll();
    res.render("index", { jogos });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const cadastro = (req, res) => {
  try {
    res.render("cadastro");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const create = async (req, res) => {
  try {
    const jogo = req.body;
    if (!jogo) {
      return res.redirect("/cadastro");
    }
    await Jogo.create(jogo);
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  getAll,
  cadastro,
  create,
};
