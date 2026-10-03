import React, { Component } from "react";
import { Button } from "primereact/button";
import { GEOAPIFY_KEY } from "../utils/chaves.js";

class MeuPonto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agora: Date.now(),
    };
    this.timer = null;
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ agora: Date.now() });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    console.log("MeuPonto removido");
  }

  render() {
    const { latitude, longitude, horarioLocalizacao, onAtualizar } = this.props;
    const { agora } = this.state;

    const segundos = horarioLocalizacao
      ? Math.floor((agora - horarioLocalizacao) / 1000)
      : 0;

    const hemisferio = latitude < 0 ? "Hemisfério Sul" : "Hemisfério Norte";
    const latFormatada = latitude.toFixed(4);
    const lonFormatada = longitude.toFixed(4);

    const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${longitude},${latitude}&zoom=16&marker=lonlat:${longitude},${latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`;

    return (
      <div>
        <img
          src={mapUrl}
          alt="Mapa da sua localização"
          style={{ width: "100%", height: "auto" }}
        />
        <p>
          Latitude: {latFormatada} | Longitude: {lonFormatada}
        </p>
        <p>{hemisferio}</p>
        <p>Localização obtida há {segundos} s</p>
        <Button
          label="Atualizar localização"
          icon="pi pi-refresh"
          onClick={onAtualizar}
        />
      </div>
    );
  }
}

export default MeuPonto;