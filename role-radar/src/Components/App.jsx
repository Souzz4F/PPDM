import React from "react";
import Creditos from "./Creditos.jsx";
import Cartao from "./Cartao.jsx";

function App() {
  const estiloSubtitulo = {
    color: "#8b003a",
    fontFamily: "Monocraft, sans-serif",
    fontSize: "1.25rem",
    marginTop: "0px",
  };

  function obterAno() {
    return new Date().getFullYear();
  }

  return (
    <div>
      <h1 className="titulo">
        <i className="pi pi-map-marker" style={{ marginRight: "8px" }}></i>
        RolêRadar
      </h1>
      <p style={estiloSubtitulo}>Descubra o que existe perto de você!</p>
      <Creditos />
      <Cartao cabecalho="Teste">
        <p className="cartao-texto">Conteúdo do cartão</p>
      </Cartao>
      <footer>
        <p>RolêRadar. &copy; {obterAno()}</p>
      </footer>
    </div>
  );
}

export default App;
