import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { weatherApiKey, currencyApiKey } from "./proxy-server/server.mjs";
import bodyParser from "body-parser";
import nodemailer from "nodemailer"; // Import nodemailer for sending emails
import dotenv from "dotenv";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.resolve();
const app = express();
app.use(bodyParser.json());
dotenv.config();

const allowedOrigins = [
  "https://www.richardlechko.com",
  "https://www.demo1.richardlechko.com",
  "https://demo1.richardlechko.com",
  "https://richardlechko.com",
  "http://localhost:3000",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST"], // Allow only GET and POST requests
    allowedHeaders: ["Content-Type", "Authorization"], // Allow only specified headers
  })
);

app.use((req, res, next) => {
  res.removeHeader("Permissions-Policy");

  // Set Permissions-Policy without unsupported directives
  res.setHeader("Permissions-Policy", "interest-cohort=()");
  res.cookie("yourCookieName", "yourCookieValue", {
    sameSite: "None",
    secure: true,
  });
  next();
});

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, "")));
app.use(express.static(path.join(__dirname, "richardlechkoresume")));
app.use(express.static(path.join(__dirname, "Resume-Widgets")));

app.use(
  "/Resume-Currency",
  express.static(
    path.join(__dirname, "public", "Resume-Widgets", "Resume-Currency")
  )
);
app.use(
  "/Resume-Timer",
  express.static(
    path.join(__dirname, "public", "Resume-Widgets", "Resume-Timer")
  )
);
app.use(
  "/Resume-Weather",
  express.static(
    path.join(__dirname, "public", "Resume-Widgets", "Resume-Weather")
  )
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/home", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "Contact-Page", "contact.html"));
});

app.get("/widgets", (req, res) => {
  res.sendFile(path.join(__dirname, "Resume-Widgets", "widgets.html"));
});
app.get("/widgets/timer", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Resume-Widgets", "Resume-Timer", "index.html")
  );
});
app.get("/widgets/weather", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Resume-Widgets", "Resume-Weather", "index.html")
  );
});
app.get("/widgets/currency", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Resume-Widgets", "Resume-Currency", "index.html")
  );
});

// Endpoint to expose weather API key to the client
app.get("/api/weather", (req, res) => {
  res.json({ apiKey: weatherApiKey });
});

// Endpoint to expose currency API key to the client
app.get("/api/currency-key", (req, res) => {
  res.json({ apiKey: currencyApiKey });
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

    // Define links to include in the response
    const links = [
      { url: "https://www.linkedin.com/in/richard-lechko/", text: "LinkedIn" },
      { url: "https://github.com/RichardLechko", text: "GitHub" },
      {
        url: "https://depaul.joinhandshake.com/stu/users/43620110",
        text: "Handshake",
      },
      {
        url: "https://stackoverflow.com/users/25048938/richard-lechko",
        text: "Stack Overflow",
      },
      {
        url: "https://www.upwork.com/freelancers/~01ec8271eae309bda7",
        text: "Upwork",
      },
      {
        url: "Richard_Lechko_Resume_May_29_2024.docx",
        text: "Download Resume (DocX)",
      },
      {
        url: "Richard_Lechko_Resume_May_29_2024.pdf",
        text: "Download Resume (PDF)",
      },

      // Add more links as needed
    ];

    // Send success response with links
    res.status(200).json({ success: true, links });
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
