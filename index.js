require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const jogos = [
  {
    id: 1,
    nome: "Shadow of the Colossus",
    genero: "Jogo eletrônico de ação, Jogo eletrônico de ação e aventura, Jogo eletrônico de quebra-cabeça",
    descricao:
      "Shadow of the Colossus, lançado no Japão como Wander and the Colossus, é um jogo eletrônico de ação-aventura desenvolvido pela SCE Japan Studio e publicado pela Sony Computer Entertainment para o PlayStation 2.",
    plataforma: "PlayStation",
    lancamento: "18 de outubro de 2005",
    nota: "91",
    desenvolvedor: "Team Ico, Sony Interactive Entertainment",
    estudio: "Sony Computer Entertainment",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/6/66/ShadowOfTheColossusGH.jpg",
  },

  {
    id: 2,
    nome: "Battlefield 2: Modern Combat",
    genero: "Tiro em primeira pessoa",
    descricao:
      "Traduzido do inglês-Battlefield 2: Modern Combat é um videogame de tiro em primeira pessoa da série Battlefield, desenvolvido pela DICE. Modern Combat é o primeiro jogo Battlefield para consoles de videogame e também foi uma história / expansão independente para Battlefield 2, lançada exclusivamente para Windows no mesmo ano.",
    plataforma: "PlayStation 2, Xbox, Xbox 360",
    lancamento: "24 de outubro de 2005",
    nota: "80",
    desenvolvedor: "DICE",
    estudio: "Electronic Arts",
    imagem: "https://upload.wikimedia.org/wikipedia/en/4/4d/Battlefield_2_-_Modern_Combat_Coverart.jpg",
  },

  {
    id: 3,
    nome: "Grand Theft Auto: San Andreas",
    genero: "Jogo eletrônico para um jogador, Jogo multijogador",
    descricao:
      "Grand Theft Auto: San Andreas é um jogo eletrônico de ação-aventura desenvolvido pela Rockstar North e publicado pela Rockstar Games. É o quinto título principal da série Grand Theft Auto e foi lançado em outubro de 2004 para PlayStation 2 e em junho de 2005 para Xbox e Microsoft Windows.",
    plataforma: "Oculus Quest 2, Android, PlayStation 2, PlayStation 4, MAIS",
    lancamento: "26 de outubro de 2004",
    nota: "95",
    desenvolvedor: "Rockstar North",
    estudio: "Rockstar Games",
    imagem: "https://upload.wikimedia.org/wikipedia/pt/d/d3/Grand_Theft_Auto_San_Andreas_capa.png",
  },
];

let jogo = undefined;


app.get("/", (req, res) => {
  res.render("index", { jogos, jogo });
});

app.get("/cadastro", (req, res) => {
    res.render("cadastro", { jogos, jogo });
  });

  app.get("/detalhes", (req, res) => {
    res.render("detalhes", { jogos, jogo });
  });

app.get("/detalhes/:id", (req, res) => {
    const id = +req.params.id;
    jogo = jogos.find((jogo) => jogo.id === id);
    res.redirect("/detalhes");
});

app.post("/create", (req, res) => {
  const jogo = req.body;
  jogo.id = jogos.length + 1;
  jogos.push(jogo);
  res.redirect("/#cards");
});

app.get("/atualizar/:id", (req, res) => {
  const id = +req.params.id;
  jogo = jogos.find((jogo) => jogo.id === id);
  res.redirect("/atualizar");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const jogoatualizado = req.body;
  jogoatualizado.id = id + 1;
  jogos[id] = jogoatualizado;
  jogo = undefined;
  res.redirect("/#cards");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete jogos[id];
  res.redirect("/#cards");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);