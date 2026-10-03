import React, { Component } from "react";

class Loading extends Component {
  render() {
    return (
      <div>
        <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}></i>
        <p>{this.props.mensagem}</p>
      </div>
    );
  }
}

Loading.defaultProps = {
  mensagem: "Carregando...",
};

export default Loading;