import React from "react";
import { GEOAPIFY_KEY } from "../utils/chaves.js";

function MapaRadar(props) {
  let latitude = props.latitude;
  let longitude = props.longitude;
  let lugares = props.lugares;

  let marcadores = lugares
    .map(function (lugar, index) {
      let numero = index + 1;
      return `lonlat:${lugar.properties.lon},${lugar.properties.lat};type:circle;color:%231565c0;size:42;contentsize:28;text:${numero}`;
    })
    .join("|");

  let marcadorUsuario = `lonlat:${longitude},${latitude};color:%23d32f2f;size:48`;

  let todosMarcadores;

  if (marcadores.length > 0) {
    todosMarcadores = `${marcadorUsuario}|${marcadores}`;
  } else {
    todosMarcadores = marcadorUsuario;
  }

  let urlMapa = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&marker=${todosMarcadores}&apiKey=${GEOAPIFY_KEY}`;

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={urlMapa}
        alt="Radar com os lugares encontrados"
        style={{ maxWidth: "100%", height: "auto", borderRadius: "8px" }}
      />
    </div>
  );
}

export default MapaRadar;
