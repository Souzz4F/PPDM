import React, { Component } from "react";
import Creditos from "./Creditos.jsx";
import Cartao from "./Cartao.jsx";
import Loading from "./Loading.jsx";
import MeuPonto from "./MeuPonto.jsx";
import geoapifyClient from "../utils/geoapifyClient.js";

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null,
  };

  componentDidMount() {
    this.obterLocalizacao();
  }

  obterLocalizacao = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (posicao) => {
          this.setState({
            latitude: posicao.coords.latitude,
            longitude: posicao.coords.longitude,
            horarioLocalizacao: Date.now(),
            mensagemDeErro: null,
          });
        },
        (erro) => {
          console.log(erro);

          this.setState({
            mensagemDeErro:
              "Não foi possível obter sua localização. Libere o acesso no navegador e atualize a página.",
          });
        },
      );
    }
  };

  async onBuscaRealizada(categoria, raio) {
    const { latitude, longitude } = this.state;

    try {
      const resposta = await geoapifyClient.get("places", {
        params: {
          categories: categoria,
          filter: `circle:${longitude},${latitude},${raio}`,
          bias: `proximity:${longitude},${latitude}`,
          limit: 20,
        },
      });

      console.log(resposta.data.features);
    } catch (erro) {
      console.error(erro);
    }
  }

  render() {
    const estiloSubtitulo = {
      color: "#8b003a",
      fontFamily: "Monocraft, sans-serif",
      fontSize: "1.25rem",
      marginTop: "0px",
    };

    function obterAno() {
      return new Date().getFullYear();
    }

    const {
      latitude,
      longitude,
      mensagemDeErro,
      horarioLocalizacao,
    } = this.state;

    return (
      <div>
        <h1 className="titulo">
          <i
            className="pi pi-map-marker"
            style={{ marginRight: "8px" }}
          ></i>
          RolêRadar
        </h1>

        <p style={estiloSubtitulo}>
          Descubra o que existe perto de você
        </p>

        <Creditos />

        {mensagemDeErro ? (
          <p>{mensagemDeErro}</p>
        ) : !latitude ? (
          <Loading mensagem="Aguardando permissão de localização..." />
        ) : (
          <Cartao cabecalho="Você está aqui">
            <MeuPonto
              latitude={latitude}
              longitude={longitude}
              horarioLocalizacao={horarioLocalizacao}
              onAtualizar={this.obterLocalizacao}
            />
          </Cartao>
        )}

        <footer>
          <p>RolêRadar {obterAno()}</p>
        </footer>
      </div>
    );
  }
}

export default App;