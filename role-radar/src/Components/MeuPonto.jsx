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
    let latitude = this.props.latitude;
    let longitude = this.props.longitude;
    let horarioLocalizacao = this.props.horarioLocalizacao;
    let onAtualizar = this.props.onAtualizar;
    
    let agora = this.state.agora;

    let segundos = 0;
    if (horarioLocalizacao) {
      segundos = Math.floor((agora - horarioLocalizacao) / 1000);
    }

    let hemisferio = "Hemisfério Norte";
    if (latitude < 0) {
      hemisferio = "Hemisfério Sul";
    }

    let latFormatada = latitude.toFixed(4);
    let lonFormatada = longitude.toFixed(4);

    let mapUrl = `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=300&center=lonlat:${longitude},${latitude}&zoom=16&marker=lonlat:${longitude},${latitude};color:%23d32f2f;size:48&apiKey=${GEOAPIFY_KEY}`;

    return (
      <div>
        <img
          src={mapUrl}
          alt="Mapa da sua localização"
          style={{ width: "100%", height: "auto", marginBottom: "15px", borderRadius: "8px" }}
        />
        
        <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
          Latitude: {latFormatada} | Longitude: {lonFormatada}
        </div>
        
        <div style={{ marginBottom: "5px" }}>
          {hemisferio}
        </div>
        
        <div style={{ marginBottom: "15px" }}>
          Localização obtida há {segundos} s
        </div>
        
        <Button
          label="Atualizar localização"
          icon="pi pi-refresh"
          onClick={onAtualizar}
          outlined={true}
        />
      </div>
    );
  }
}

export default MeuPonto;