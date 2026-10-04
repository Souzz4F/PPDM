import Cartao from "./Cartao.jsx";

function formatarDistancia(distancia) {
  if (distancia < 1000) {
    return `${Math.round(distancia)} m`;
  }

  return `${(distancia / 1000).toFixed(1).replace(".", ",")} km`;
}

function Lugar({ numero, nome, endereco, distancia }) {
  const estiloNumero = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    backgroundColor: "#6c63ff",
    color: "white",
    fontWeight: "bold",
  };

  return (
    <Cartao cabecalho={formatarDistancia(distancia)}>
      <div>
        <span style={estiloNumero}>{numero}</span>

        <strong style={{ marginLeft: "10px" }}>
          {nome || "Sem nome"}
        </strong>

        <p>{endereco}</p>
      </div>
    </Cartao>
  );
}

export default Lugar;