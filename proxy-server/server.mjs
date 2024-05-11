import http from "http";
import httpProxy from "http-proxy";
import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});
dotenv.config();

// Initialize Express app
const app = express();

const weatherApiKey = process.env.WEATHER_API_KEY; // Define weatherApiKey here
const currencyApiKey = process.env.CURRENCY_API_KEY; // Define currencyApiKey here

// Export weatherApiKey
export { weatherApiKey };

// Export currencyApiKey
export { currencyApiKey };

const weatherApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const currencyApiUrl = "https://api.freecurrencyapi.com/v1/latest?";

// Proxy requests to the target server
const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: "http://localhost:3000" }); // Assuming your main application is running on port 3000
});

// Route handler for fetching weather data
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  try {
    const response = await fetch(
      `${weatherApiUrl}${city}&appid=${weatherApiKey}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

// Route handler for fetching currency data
app.get("/api/currency-key", async (req, res) => {
  try {
    const apiKey = process.env.CURRENCY_API_KEY;
    const response = await fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching currency data:", error);
    res.status(500).json({ error: "Failed to fetch currency data" });
  }
});

// Listen for requests on port 4000
server.listen(4000, () => {
  console.log("Proxy server is listening on port 4000");
});
