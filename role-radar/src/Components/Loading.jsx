import React, { Component } from 'react';

class Loading extends Component {
  render() {
    const estiloTexto = {
      color: '#0603ca',
      fontFamily: 'Monocraft, sans-serif',
      fontSize: '1.1rem',
      marginTop: '8px'
    };

    return (
      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        <i className="pi pi-spin pi-spinner" style={{ fontSize: '2rem', color: '#8b003a' }}></i>
        <p style={estiloTexto}>Obtendo sua localização...</p>
      </div>
    );
  }
}

export default Loading;