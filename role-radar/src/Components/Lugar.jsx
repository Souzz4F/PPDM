import React from "react";

function formatarDistancia(metros) {
  if (metros < 1000) {
    return metros + " m";
  }

  let quilometros = metros / 1000;
  return quilometros.toFixed(1).replace(".", ",") + " km";
}

function Lugar(props) {
  let lugar = props.lugar;
  let indice = props.indice;

  let nome = lugar.properties.name;
  if (!nome) {
    nome = "Sem nome";
  }

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <div>a {formatarDistancia(lugar.properties.distance)}</div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: "30px",
            height: "30px",
            backgroundColor: "blue",
            color: "white",
            borderRadius: "15px",
            textAlign: "center",
            marginRight: "10px",
          }}
        >
          {indice + 1}
        </div>

        <div>
          <div style={{ fontWeight: "bold" }}>{nome}</div>
          <div>{lugar.properties.address_line2}</div>
        </div>
      </div>
    </div>
  );
}

export default Lugar;
