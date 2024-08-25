import http from "http";
import httpProxy from "http-proxy";
import dotenv from "dotenv";
import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import path from "path";
import "dotenv/config";

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const proxy = httpProxy.createProxyServer({});
dotenv.config();
const app = express();

const weatherApiKey = process.env.WEATHER_API_KEY;
const currencyApiKey = process.env.CURRENCY_API_KEY;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

export { weatherApiKey };
export { currencyApiKey };

const weatherApiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const currencyApiUrl = "https://api.freecurrencyapi.com/v1/latest?";

const server = http.createServer((req, res) => {
  proxy.web(req, res, { target: "http://localhost:3000" }); // Change this to whatever ur application is running on
});

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

app.post("/submit", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "richardlechko04@gmail.com",
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "richardlechko04@gmail.com",
      to: email,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);

    if (error.code === "EAUTH") {
      res.status(500).json({
        success: false,
        error: "Invalid email credentials. Please check your email settings.",
      });
    } else {
      res.status(500).json({ success: false, error: "Failed to send email" });
    }
  }
});

server.listen(4000, () => {
  console.log("Proxy server is listening on port 4000");
});
