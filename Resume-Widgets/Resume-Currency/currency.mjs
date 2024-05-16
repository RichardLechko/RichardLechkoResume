/*************** CURRENCY API STARTED  **************/

async function fetchCurrencyApiKey() {
  try {
    const response = await fetch("/api/currency-key");
    const data = await response.json();
    return data.apiKey;
  } catch (error) {
    console.error("Error fetching currency API key:", error);
    throw error;
  }
}

async function initializeCurrency() {
  try {
    const currencyApiKey = await fetchCurrencyApiKey();
    const apiURL = "https://api.freecurrencyapi.com/v1/latest?";

    async function convertCurr(apiKey) {
      try {
        if (!apiKey) {
          console.error("API key not available");
          return;
        }

        const firstCurrVal = document.querySelector("#currency-startVal").value;
        const secondCurrVal = document.querySelector("#currency-endVal");
        const firstCurrencySelect =
          document.querySelector("#currency-start").value;
        const secondCurrencySelect =
          document.querySelector("#currency-end").value;

        if (
          !firstCurrVal ||
          !secondCurrVal ||
          !firstCurrencySelect ||
          !secondCurrencySelect
        ) {
          return;
        }

        const response = await fetch(apiURL + "apikey=" + apiKey);
        const data = await response.json();

        if (isNaN(firstCurrVal) || !isFinite(firstCurrVal)) {
          secondCurrVal.value = "";
          return;
        }

        let finalNumber =
          data.data[secondCurrencySelect] / data.data[firstCurrencySelect];
        finalNumber *= parseFloat(firstCurrVal);

        secondCurrVal.value = finalNumber.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    var a = document.querySelector("#currency-startVal");
    /* console.log(`Maybe: ${a}`); */

    if (a === null) {
      return;
    }

    document
      .querySelector("#currency-startVal")
      .addEventListener("input", () => convertCurr(currencyApiKey));
    document
      .querySelector("#currency-endVal")
      .addEventListener("input", () => convertCurr(currencyApiKey));
    document
      .querySelector("#currency-start")
      .addEventListener("change", () => convertCurr(currencyApiKey));
    document
      .querySelector("#currency-end")
      .addEventListener("change", () => convertCurr(currencyApiKey));

    document.querySelector("#flip-icon").addEventListener("click", () => {
      const startCurrency = document.querySelector("#currency-start").value;
      document.querySelector("#currency-start").value =
        document.querySelector("#currency-end").value;
      document.querySelector("#currency-end").value = startCurrency;
      convertCurr(currencyApiKey);
    });
  } catch (error) {
    console.error("Error initializing currency:", error);
  }
}

export { initializeCurrency };

/*************** CURRENCY API ENDED  **************/
