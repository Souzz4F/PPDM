import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

function Busca({ onBuscaRealizada }) {
  const [categoria, setCategoria] = useState(null);
  const [raio, setRaio] = useState(1000);
  const [erro, setErro] = useState(null);

  const categorias = [
    { rotulo: "Cafés", chave: "catering.cafe" },
    { rotulo: "Restaurantes", chave: "catering.restaurant" },
    { rotulo: "Parques", chave: "leisure.park" },
    { rotulo: "Farmácias", chave: "healthcare.pharmacy" },
    { rotulo: "Supermercados", chave: "commercial.supermarket" },
    { rotulo: "Museus", chave: "entertainment.museum" },
  ];

  function aoEnviar(evento) {
    evento.preventDefault();

    if (!categoria) {
      setErro("Escolha uma categoria.");
      return;
    }

    const raioNumero = Number(raio);

    if (
      !Number.isInteger(raioNumero) ||
      raioNumero < 100 ||
      raioNumero > 5000
    ) {
      setErro("Informe um raio inteiro entre 100 e 5000 metros.");
      return;
    }

    setErro(null);
    onBuscaRealizada(categoria, raioNumero);
  }

  return (
    <form onSubmit={aoEnviar}>
      {erro && <p style={{ color: "red" }}>{erro}</p>}

      <div>
        {categorias.map((item) => (
          <Button
            key={item.chave}
            type="button"
            label={item.rotulo}
            outlined={categoria !== item.chave}
            onClick={() => setCategoria(item.chave)}
          />
        ))}
      </div>

      <div>
        <InputText
          value={raio}
          onChange={(evento) => setRaio(evento.target.value)}
        />
        <span> m</span>
      </div>

      <Button
        type="submit"
        label="Buscar"
        icon="pi pi-search"
      />
    </form>
  );
}

export default Busca;