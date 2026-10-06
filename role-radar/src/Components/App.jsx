import React, { Component } from "react";
import Creditos from "./Creditos.jsx";
import Cartao from "./Cartao.jsx";
import Loading from "./Loading.jsx";
import MeuPonto from "./MeuPonto.jsx";
import geoapifyClient from "../utils/geoapifyClient.js";
import Busca from "./Busca.jsx";
import ListaLugares from "./ListaLugares.jsx";
import MapaRadar from "./MapaRadar.jsx";

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    horarioLocalizacao: null,
    mensagemDeErro: null,
    lugares: null,
    buscando: false,
    erroBusca: null,
    raioBuscado: null,
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

  onBuscaRealizada = async (categoria, raio) => {
    this.setState({
      buscando: true,
      erroBusca: null,
      raioBuscado: raio,
      lugares: null,
    });

    try {
      const resposta = await geoapifyClient.get("places", {
        params: {
          categories: categoria,
          filter: `circle:${this.state.longitude},${this.state.latitude},${raio}`,
          bias: `proximity:${this.state.longitude},${this.state.latitude}`,
          limit: 20,
        },
      });

      this.setState({
        lugares: resposta.data.features,
        buscando: false,
      });
    } catch (erro) {
      console.error(erro);
      this.setState({
        erroBusca: "Não foi possível consultar os lugares. Tente novamente.",
        buscando: false,
      });
    }
  };

  render() {
    const estiloSubtitulo = {
      color: "#6b7280",
      fontSize: "1.1rem",
      marginTop: "0px",
    };

    function obterAno() {
      return new Date().getFullYear();
    }

    let colunaEsquerda;
    if (this.state.mensagemDeErro) {
      colunaEsquerda = <div>{this.state.mensagemDeErro}</div>;
    } else if (this.state.latitude == null) {
      colunaEsquerda = (
        <Loading mensagem="Aguardando permissão de localização..." />
      );
    } else {
      colunaEsquerda = (
        <div>
          <Cartao cabecalho="Você está aqui">
            <MeuPonto
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              horarioLocalizacao={this.state.horarioLocalizacao}
              onAtualizar={this.obterLocalizacao}
            />
          </Cartao>

          <Cartao cabecalho="O que você procura?">
            <Busca onBuscaRealizada={this.onBuscaRealizada} />
          </Cartao>
        </div>
      );
    }
  
    let colunaDireita;
    if (this.state.buscando == true) {
      colunaDireita = <Loading mensagem="Procurando lugares..." />;
    } else if (this.state.erroBusca) {
      colunaDireita = <div>{this.state.erroBusca}</div>;
    } else if (this.state.lugares && this.state.lugares.length > 0) {

      let tituloResultados = "";
      if (this.state.lugares.length === 1) {
        tituloResultados = `1 lugar encontrado em até ${this.state.raioBuscado} m`;
      } else {
        tituloResultados = `${this.state.lugares.length} lugares encontrados em até ${this.state.raioBuscado} m`;
      }

      colunaDireita = (
        <div>
          <h3>{tituloResultados}</h3>
          <Cartao cabecalho="Radar">
            <MapaRadar
              latitude={this.state.latitude}
              longitude={this.state.longitude}
              lugares={this.state.lugares}
            />
          </Cartao>
          <ListaLugares lugares={this.state.lugares} />
        </div>
      );
    } else if (this.state.lugares !== null && this.state.lugares.length === 0) {
      colunaDireita = <p>Nenhum lugar encontrado. Tente aumentar o raio.</p>;
    } else {
      colunaDireita = <div>Nenhum lugar encontrado ou busca não iniciada.</div>;
    }

    return (
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h1 className="titulo">RolêRadar</h1>
          <p style={estiloSubtitulo}>Descubra o que existe perto de você</p>
          <Creditos />
        </div>

        <div style={{ display: "flex", gap: "20px" }}>
          <div style={{ flex: 1 }}>{colunaEsquerda}</div>

          <div style={{ flex: 1 }}>{colunaDireita}</div>
        </div>

        <footer style={{ textAlign: "center", marginTop: "40px" }}>
          <p>RolêRadar © {obterAno()}</p>
        </footer>
      </div>
    );
  }
}

export default App;
