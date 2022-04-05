const fecharAlerta = () => {
  const fechar = document.querySelector("#fechar-alerta");
  const mensagem = document.querySelector(".mensagem");

  fechar.addEventListener("click", () => {
    mensagem.style.display = "none";
  });

  setTimeout(() => {
    mensagem.style.display = "none";
  }, 5000)
};

fecharAlerta();