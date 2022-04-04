const { send } = require("express/lib/response");
const res = require("express/lib/response");
const Jogo = require("../models/Jogo");
const order = { order: [["nome", "ASC"]] };
const Op = require("sequelize").Op;
let mensagem = "";
let tipo = "";

const getAll = async (req, res) => {
  try {
    setTimeout(() => {
      mensagem = "";
      tipo = "";
    }, 1000);
    const jogos = await Jogo.findAll(order);
    res.render("index", {
      jogos,
      jogoPut: null,
      jogoDel: null,
      mensagem,
      tipo,
      jogoProcurar: [],
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const detalhes = async (req, res) => {
  try {
    const jogo = await Jogo.findByPk(req.params.id);
    res.render("detalhes", { jogo });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const cadastro = (req, res) => {
  try {
    res.render("cadastro", { mensagem, tipo });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const create = async (req, res) => {
  try {
    const jogo = req.body;
    if (
      !jogo.nome ||
      !jogo.genero ||
      !jogo.descricao ||
      !jogo.plataforma ||
      !jogo.lancamento ||
      !jogo.estudio ||
      !jogo.imagem
    ) {
      mensagem =
        "Você precisa preencher todos os campos para concluir o cadastro!";
      tipo = "erro";
      return res.redirect("/cadastro#cadastro");
    }
    await Jogo.create(jogo);
    mensagem = "Jogo cadastrado com sucesso!";
    tipo = "sucesso";
    res.redirect("/#cards");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const method = req.params.method;
    const jogos = await Jogo.findAll(order);
    const jogo = await Jogo.findByPk(req.params.id);

    if (method == "put") {
      res.render("index", {
        jogos,
        jogoPut: jogo,
        jogoDel: null,
        mensagem,
        tipo,
        jogoProcurar: [],
      });
    } else {
      res.render("index", {
        jogos,
        jogoPut: null,
        jogoDel: jogo,
        mensagem,
        tipo,
        jogoProcurar: [],
      });
    }
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const update = async (req, res) => {
  try {
    const jogo = req.body;
    await Jogo.update(jogo, { where: { id: req.params.id } });
    mensagem = "Jogo atualizado com sucesso!";
    tipo = "sucesso";
    res.redirect("/#cards");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const remove = async (req, res) => {
  try {
    await Jogo.destroy({ where: { id: req.params.id } });
    mensagem = "Jogo removido com sucesso!";
    tipo = "sucesso";
    res.redirect("/#cards");
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const pesquisa = async (req, res) => {
  try {
    const jogo = await Jogo.findAll({
      where: {
        nome: {
          [Op.like]: `%${req.body.jogo}%`,
        },
      },
      order: [["nome", "ASC"]],
    });

    if (jogo.length == 0) {
      mensagem = "Jogo não encontrado!";
      tipo = "erro";
      return res.redirect("/#cards");
    }
    res.render("index", {
      jogos: [],
      jogoPut: null,
      jogoDel: null,
      mensagem,
      tipo,
      jogoProcurar: jogo
    });
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
  detalhes,
  pesquisa,
};
