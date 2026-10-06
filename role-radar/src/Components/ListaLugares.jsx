import React from "react";
import Lugar from "./Lugar.jsx";

function ListaLugares(props) {
  return (
    <div>
      {props.lugares.map(function (lugar, indice) {
        return (
          <Lugar 
            key={lugar.properties.place_id} 
            lugar={lugar} 
            indice={indice} 
          />
        );
      })}
    </div>
  );
}

export default ListaLugares;