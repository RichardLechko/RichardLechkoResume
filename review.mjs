import http from "http";
import httpProxy from "http-proxy";
import dotenv from "dotenv";
import express from "express";

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});
dotenv.config();

// Initialize Express app
const app = express();
const weatherApiKey = process.env.WEATHER_API_KEY;
const currencyApiKey = process.env.CURRENCY_API_KEY;

// Endpoint to expose weather API key to the client
app.get("/api/weather", (req, res) => {
  res.json({ weatherApiKey: weatherApiKey });
});

// Endpoint to expose currency API key to the client
app.get("/api/currency-key", (req, res) => {
  res.json({ currencyApiKey: currencyApiKey });
});

// Proxy requests to the target server
const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: "http://localhost:3000" }); // Assuming your main application is running on port 3000
});

// Listen for requests on port 4000
server.listen(4000, () => {
  console.log("Proxy server is listening on port 4000");
});
