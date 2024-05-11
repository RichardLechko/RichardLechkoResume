function isCurrencyWidgetPage() {
  // Assuming the currency widget HTML page has a unique identifier or class
  // Modify the condition below based on how you identify the currency widget page
  return document.querySelector(".container-currency") !== null;
}
function isWeatherWidgetPage() {
  // Assuming the currency widget HTML page has a unique identifier or class
  // Modify the condition below based on how you identify the currency widget page
  return document.querySelector(".weather") !== null;
}

/******* WEATHER API ******/

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function fetchWeatherApiKey() {
  try {
    const response = await fetch("/api/weather");
    const data = await response.json();

    return data.apiKey; // Access the API key directly from the response
  } catch (error) {
    console.error("Error fetching weather API key:", error);
    throw error;
  }
}

// Usage inside an async function
async function initializeWeather() {
  try {
    if (!isWeatherWidgetPage()) {
      return; // Exit if not the currency widget page
    }
    const weatherApiKey = await fetchWeatherApiKey();

    // Check if search elements exist before using them
    if (searchBox && searchBtn) {
      searchBtn.addEventListener("click", () => {
        checkWeather(searchBox.value, weatherApiKey);
      });

      searchBox.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          checkWeather(searchBox.value, weatherApiKey);
        }
      });
    }
  } catch (error) {
    console.error("Error initializing weather:", error);
  }
}

async function checkWeather(city, weatherApiKey) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${weatherApiKey}`;
    const response = await fetch(apiUrl);

    if (response.status == 404) {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
    } else {
      var data = await response.json();
      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°c";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

      /* OPTIONAL */

      let number = (document.querySelector(".latitude").innerHTML =
        data.coord.lat);
      let rounded = number.toFixed(2);

      document.querySelector(".latitude").innerHTML = "Latitude: " + rounded;

      number = data.coord.lon;
      rounded = number.toFixed(2);

      document.querySelector(".longitude").innerHTML = "Longitude: " + rounded;

      document.querySelector(".type-weather").innerHTML = data.weather[0].main;

      /* OPTIONAL */

      if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Humidity") {
        weatherIcon.src = "images/humidity.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "images/snow.png";
      }
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error updating weather UI:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

/*********** WEATHER API ENDED ******************/

// Function to fetch currency API key from the server
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
    if (!isCurrencyWidgetPage()) {
      return; // Exit if not the currency widget page
    }
    const currencyApiKey = await fetchCurrencyApiKey();
    const apiURL = "https://api.freecurrencyapi.com/v1/latest?";

    // Function to convert currency (copied from index.js)
    async function convertCurr(apiKey) {
      try {
        // Check if API key is available
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

        // Make API request with the fetched API key
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

    // Event listener for currency conversion (copied from index.js)
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

initializeWeather();
initializeCurrency();
