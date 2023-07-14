import React, { useState, useEffect } from "react";
import "../stylesheets/form.css";

const Form = () => {
  const [currency, setCurrency] = useState("");
  const [crypto, setCrypto] = useState("");
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    consultarCriptomonedas();
  }, []);

  useEffect(() => {
   setResult(null);
 }, [currency, crypto]);

  function submitForm(e) {
    e.preventDefault();
    if (currency === "" || crypto === "") {
      showError("Seleccione ambas monedas...");
      return;
    }
    consultarDatosDeMonedas(currency, crypto);
  }

  function showError(mensaje) {
    setError(mensaje);
    setTimeout(() => setError(""), 3000);
  }

  function consultarCriptomonedas() {
    fetch(
      "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD"
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setCryptos(responseJson.Data);
      })
      .catch((error) => console.log(error));
  }

  function consultarDatosDeMonedas(moneda, criptomoneda) {
    fetch(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    )
      .then((resultado) => resultado.json())
      .then((resultadoJson) => {
        mostrarCotizacion(resultadoJson.DISPLAY[criptomoneda][moneda]);
      })
      .catch((error) => console.log(error));
  }

  function mostrarCotizacion(data) {
    setResult(data);
  }

  return (
    <form onSubmit={submitForm} action="" id="search">
      <select
        id="moneda"
        name="moneda"
        onChange={(e) => setCurrency(e.target.value)}
      >
        <option value="">Elige tu moneda</option>
        <option value="VEF">Bolivar Venezolano</option>
        <option value="USD">Dolar Estadounidense</option>
        <option value="MXN">Peso Mexicano</option>
        <option value="GBP">Libras</option>
        <option value="EUR">Euros</option>
      </select>
      <select
        id="criptomonedas"
        name="criptomoneda"
        onChange={(e) => setCrypto(e.target.value)}
      >
        <option value="">Elige tu criptomoneda</option>
        {cryptos.map((cripto) => (
          <option key={cripto.CoinInfo.Name} value={cripto.CoinInfo.Name}>
            {cripto.CoinInfo.FullName}
          </option>
        ))}
      </select>
      <input className="" type="submit" value="Cotizar" />
      {error && <p className="error">{error}</p>}
      {!currency && !crypto && (
        <div className="container-quotation">
          <h2>Seleccione su Moneda y Criptomoneda</h2>
        </div>
      )}
      {result && (
        <div className="container-quotation">
          <div className="display-info">
            <p className="price">
              Precio: <span>{result.PRICE}</span>
            </p>
            <p>
              Precio más alto del día:: <span>{result.HIGHDAY}</span>
            </p>
            <p>
              Precio más bajo del día: <span>{result.LOWDAY}</span>
            </p>
            <p>
              Variación últimas 24 horas: <span>{result.CHANGEPCT24HOUR}%</span>
            </p>
            <p>
              Última Actualización: <span>{result.LASTUPDATE}</span>
            </p>
          </div>
        </div>
      )}
    </form>
  );
};

export default Form;
