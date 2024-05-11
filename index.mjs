import express from "express";
import path from "path";

import { weatherApiKey } from "./proxy-server/server.mjs";
import { currencyApiKey } from "./proxy-server/server.mjs";
console.log(weatherApiKey);
const __dirname = path.resolve();
const app = express();

// Define API base URL and port
const API_BASE_URL = "http://localhost:3001"; // Assuming your proxy server is running on port 3001

app.use(
  express.static(path.join(__dirname, "richardleckoresume"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      }
    },
  })
);

// Define HTML pages and directories
const htmlPages = [
  "index.html",
  "Contact-Page/contact.html",
  "Resume-Widgets/widgets.html",
];

const directories = [
  "Contact-Page",
  "Resume-Widgets/Resume-Currency",
  "Resume-Widgets/Resume-Timer",
  "Resume-Widgets/Resume-TotalTime",
  "Resume-Widgets/Resume-Weather",
  "Utility-CSS",
  "",
];

// Serve HTML pages
htmlPages.forEach((page) => {
  const route = page === "index.html" ? "/" : `/${page.replace(".html", "")}`;
  app.get(route, (req, res) => {
    res.sendFile(path.join(__dirname, page));
  });
});

// Serve directories
directories.forEach((directory) => {
  app.use(`/${directory}`, express.static(path.join(__dirname, directory)));
});

// Endpoint to expose weather API key to the client
app.get("/api/weather", (req, res) => {
  res.json({ apiKey: weatherApiKey });
});

// Endpoint to expose currency API key to the client
app.get("/api/currency-key", (req, res) => {
  res.json({ apiKey: currencyApiKey });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
