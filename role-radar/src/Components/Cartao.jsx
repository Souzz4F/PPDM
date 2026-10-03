import react from "react";

function Cartao({ cabecalho, children }) {
  return (
    <div className="cartao">
      {cabecalho && <div className="cartao-cabecalho">{cabecalho}</div>}

      <hr className="cartao-linha" />

      <div className="cartao-children">{children}</div>
    </div>
  );
}

export default Cartao;
