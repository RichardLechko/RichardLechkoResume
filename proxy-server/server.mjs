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

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});
dotenv.config();

// Initialize Express app
const app = express();

const weatherApiKey = process.env.WEATHER_API_KEY; // Define weatherApiKey here
const currencyApiKey = process.env.CURRENCY_API_KEY; // Define currencyApiKey here

app.use(express.static(path.join(__dirname, "freedombutchers-main")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "freedombutchers-main")));

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

// Handle contact form submissions
app.post("/submit", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "richardlechko04@gmail.com", // Update with your email
        pass: process.env.GMAIL_PASS, // Update with your email password or use environment variables
      },
    });

    const mailOptions = {
      from: "richardlechko04@gmail.com", // Update with your email address
      to: email, // Use the email provided by the user
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);

    // Check for specific errors
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

// Listen for requests on port 4000
server.listen(4000, () => {
  console.log("Proxy server is listening on port 4000");
});
