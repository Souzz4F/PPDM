import React, { Component } from 'react';
import Loading from './Loading.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      mensagemDeErro: null
    };

    this.obterLocalizacao = this.obterLocalizacao.bind(this);
  }

  componentDidMount() {
    this.obterLocalizacao();
  }

  obterLocalizacao() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (posicao) => {
          this.setState({
            latitude: posicao.coords.latitude,
            longitude: posicao.coords.longitude,
            mensagemDeErro: null
          });
        },
        (erro) => {
          this.setState({
            mensagemDeErro: 'Permissão negada ou erro ao obter localização.'
          });
        }
      );
    } else {
      this.setState({
        mensagemDeErro: 'Geolocalização não é suportada neste navegador.'
      });
    }
  }

  render() {
    const estiloSubtitulo = {
      color: '#8b003a',
      fontFamily: 'Monocraft, sans-serif',
      fontSize: '1.25rem',
      marginTop: '0px'
    };

    function obterAno() {
      return new Date().getFullYear();
    }

    const { latitude, longitude, mensagemDeErro } = this.state;

    return (
      <div>
        <h1 className="titulo">
          <i className="pi pi-map-marker" style={{ marginRight: '8px' }}></i>
          RolêRadar
        </h1>
        <p style={estiloSubtitulo}>Descubra o que existe perto de você!</p>

        {mensagemDeErro ? (
          <p style={{ color: 'red', fontFamily: 'Monocraft, sans-serif' }}>{mensagemDeErro}</p>
        ) : latitude && longitude ? (
          <div style={{ fontFamily: 'Monocraft, sans-serif', margin: '15px 0' }}>
            <p><strong>Latitude:</strong> {latitude}</p>
            <p><strong>Longitude:</strong> {longitude}</p>
          </div>
        ) : (
          <Loading />
        )}

        <footer>
          <p>RolêRadar. &copy; {obterAno()}</p>
        </footer>
      </div>
    );
  }
}

export default App;