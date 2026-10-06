import React from "react";

function Cartao(props) {
  return (
    <div
      className="cartao"
      style={{
        border: "1px solid #ccc",
        marginBottom: "15px",
        borderRadius: "5px",
      }}
    >
      <div
        style={{ backgroundColor: "#eee", padding: "10px", fontWeight: "bold" }}
      >
        {props.cabecalho}
      </div>
      <div className="cartao-children" style={{ padding: "10px" }}>
        {props.children}
      </div>
    </div>
  );
}

export default Cartao;
