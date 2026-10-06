import React, { Component } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

class Busca extends Component {
  state = {
    categoria: "catering.cafe",
    raio: "1000",
    erro: null,
  };

  categorias = [
    { id: "catering.cafe", label: "Cafés" },
    { id: "catering.restaurant", label: "Restaurantes" },
    { id: "leisure.park", label: "Parques" },
    { id: "commercial.health_and_beauty.pharmacy", label: "Farmácias" },
    { id: "commercial.supermarket", label: "Supermercados" },
    { id: "entertainment.museum", label: "Museus" },
  ];

  buscar = (evento) => {
    evento.preventDefault();

    if (this.state.categoria == "") {
      this.setState({ erro: "Escolha uma categoria." });
      return;
    }

    if (this.state.raio < 100 || this.state.raio > 5000) {
      this.setState({ erro: "Informe um raio inteiro entre 100 e 5000 metros." });
      return;
    }

    this.setState({ erro: null });
    this.props.onBuscaRealizada(this.state.categoria, this.state.raio);
  };

  render() {
    return (
      <form onSubmit={this.buscar}>
        {this.state.erro && (
          <div style={{ color: "red" }}>{this.state.erro}</div>
        )}

        <div style={{ marginBottom: "10px" }}>
          {this.categorias.map((cat) => {
            let contornoBotao = true;
            if (this.state.categoria === cat.id) {
              contornoBotao = false;
            }

            return (
              <Button
                key={cat.id}
                type="button"
                label={cat.label}
                onClick={() => this.setState({ categoria: cat.id })}
                outlined={contornoBotao}
                style={{ marginRight: "5px", marginBottom: "5px" }}
              />
            );
          })}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <InputText
            value={this.state.raio}
            onChange={(evento) => this.setState({ raio: evento.target.value })}
            type="number"
            style={{ width: "100%" }}
          />
        </div>

        <Button label="Buscar" type="submit" style={{ width: "100%" }} />
      </form>
    );
  }
}

export default Busca;
