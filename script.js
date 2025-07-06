const buttonConvert = document.querySelector(".convert-button");
const selectTo = document.querySelector(".currency-select");

async function convertCurrency() {
  const valueInput = Number(document.querySelector(".input-currency").value);
  const convertFrom = document.querySelector(".currency-value-to-convert");
  const convertTo = document.querySelector(".currency-value");

  if (valueInput <= 0 || isNaN(valueInput)) {
    alert("Este número não pode ser convertido!");
    return;
  }

  const currencyApi = selectTo.value;
  const url = `https://economia.awesomeapi.com.br/json/last/${currencyApi}-BRL`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const key = `${currencyApi}BRL`;
    const rate = parseFloat(data[key].bid);

    const convertedValue = valueInput / rate;

    let options = {
      style: "currency",
      currency: currencyApi,
    };

    if (currencyApi === "BTC") {
      options.minimumFractionDigits = 6;
      options.maximumFractionDigits = 8;
    }

    convertTo.innerHTML = new Intl.NumberFormat("en-US", options).format(
      convertedValue
    );

    convertFrom.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valueInput);
  } catch (error) {
    console.error("Erro ao buscar a cotação:", error);
    alert("Não foi possível obter a cotação.");
  }
}

function changeCurrency() {
  const valueInput = document.querySelector(".input-currency").value;
  const imgTo = document.querySelector(".currency-img");
  const nameTo = document.getElementById("currency-name");

  switch (selectTo.value) {
    case "USD":
      nameTo.innerHTML = "Dolar";
      imgTo.src = "./assets/dolar.png";

      break;

    case "GBP":
      nameTo.innerHTML = "Libra";
      imgTo.src = "./assets/libra.png";
      break;
    case "BTC":
      nameTo.innerHTML = "Bitcoin";
      imgTo.src = "./assets/bitcoin.png";
      break;

    default:
      break;
  }

  convertCurrency(valueInput);
}

selectTo.addEventListener("change", changeCurrency);
buttonConvert.addEventListener("click", convertCurrency);
