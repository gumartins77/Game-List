const Jogo = require("../models/Jogo");

const getAll = async (req, res) => {
  try {
    const jogos = await Jogo.findAll();
    res.render("index", {jogos});
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

module.exports = {
  getAll,
};
