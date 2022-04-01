const res = require("express/lib/response");
const Jogo = require("../models/Jogo");

const getAll = async (req, res) => {
  try {
    const jogos = await Jogo.findAll();
    res.render("index", { jogos, jogoPut: null, jogoDel: null });
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

const getById = async (req, res) => {
  try {
    const method = req.params.method;
    const jogos = await Jogo.findAll();
    const jogo = await Jogo.findByPk(req.params.id);

    if (method == "put") {
      res.render("index", { jogos, jogoPut: jogo, jogoDel: null });
    } else {
      res.render("index", { jogos, jogoPut: null, jogoDel: jogo });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const update = async (req, res) => {
  try {
    const jogo = req.body;
    await Jogo.update(jogo, { where: { id: req.params.id } });
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Jogo.destroy({ where: { id: req.params.id } });
    res.redirect("/");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  getAll,
  cadastro,
  create,
  getById,
  update,
  remove,
};
