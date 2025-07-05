const buttonConvert = document.querySelector(".convert-button");
const selectTo = document.querySelector(".currency-select");

function convertCurrency(v) {
  const valueInput = document.querySelector(".input-currency").value;
  const convertFrom = document.querySelector(".currency-value-to-convert");
  const convertTo = document.querySelector(".currency-value");

  const dolarToday = 5.4;
  const libraToday = 7.4;

  if (valueInput <= 0 || isNaN(valueInput)) {
    alert("Este número não pode ser convertido!");
    return;
  }

  convertTo.innerHTML = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(valueInput / dolarToday);
  convertFrom.innerHTML = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valueInput);

  switch (selectTo.value) {
    case "dolar":
      convertTo.innerHTML = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(valueInput / dolarToday);

      break;
    case "libra":
      convertTo.innerHTML = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "GBP",
      }).format(valueInput / libraToday);
      break;

    default:
      break;
  }
}

function changeCurrency() {
  const valueInput = document.querySelector(".input-currency").value;
  const imgTo = document.querySelector(".currency-img");
  const nameTo = document.getElementById("currency-name");

  switch (selectTo.value) {
    case "dolar":
      nameTo.innerHTML = "Dolar";
      imgTo.src = "./assets/dolar.png";

      break;

    case "libra":
      nameTo.innerHTML = "Libra";
      imgTo.src = "./assets/libra.png";
      break;

    default:
      break;
  }

  convertCurrency(valueInput);
}

selectTo.addEventListener("change", changeCurrency);
buttonConvert.addEventListener("click", convertCurrency);
