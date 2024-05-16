async function fetchWeatherApiKey() {
  try {
    const response = await fetch("/api/weather");
    const data = await response.json();
    return data.apiKey;
  } catch (error) {
    console.error("Error fetching weather API key:", error);
    throw error;
  }
}

async function initializeWeather() {
  try {
    const weatherApiKey = await fetchWeatherApiKey();
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");

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

      let number = (document.querySelector(".latitude").innerHTML =
        data.coord.lat);
      let rounded = number.toFixed(2);

      document.querySelector(".latitude").innerHTML = "Latitude: " + rounded;

      number = data.coord.lon;
      rounded = number.toFixed(2);

      document.querySelector(".longitude").innerHTML = "Longitude: " + rounded;

      document.querySelector(".type-weather").innerHTML = data.weather[0].main;

      const weatherIcon = document.querySelector(".weather-icon");
      setWeatherIcon(data.weather[0].main, weatherIcon);

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    }
  } catch (error) {
    console.error("Error updating weather UI:", error);
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  }
}

function setWeatherIcon(weatherType, weatherIcon) {
  switch (weatherType) {
    case "Clear":
      weatherIcon.src = "images/clear.png";
      break;
    case "Clouds":
      weatherIcon.src = "images/clouds.png";
      break;
    case "Drizzle":
      weatherIcon.src = "images/drizzle.png";
      break;
    case "Humidity":
      weatherIcon.src = "images/humidity.png";
      break;
    case "Mist":
      weatherIcon.src = "images/mist.png";
      break;
    case "Rain":
      weatherIcon.src = "images/rain.png";
      break;
    case "Snow":
      weatherIcon.src = "images/snow.png";
      break;
    default:
      weatherIcon.src = ""; // Default icon
  }
}

export { initializeWeather, checkWeather };
