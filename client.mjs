import { contactFormEventListener } from "./Contact-Page/contactForm.mjs";
import { initializeCurrency } from "./Resume-Widgets/Resume-Currency/currency.mjs";
import { initializeWeather } from "./Resume-Widgets/Resume-Weather/weather.mjs";
import { initializeTimer } from "./Resume-Widgets/Resume-Timer/timer.mjs";

document.addEventListener("DOMContentLoaded", function () {
  /* TYPING ANIMATION START */

  const page = document.body.getAttribute("data-page");
  let text = "";

  switch (page) {
    case "home":
      text = "About Me ~ Richard Lechko.";
      break;
    case "contact":
      text = "Contact ~ Richard Lechko.";
      break;
    case "widgets":
      text = "Widgets ~ Richard Lechko.";
      break;
    case "widgets-timer":
      text = "Timer ~ Richard Lechko.";
      break;
    case "widgets-currency":
      text = "Currency ~ Richard Lechko.";
      break;
    case "widgets-weather":
      text = "Weather ~ Richard Lechko.";
      break;
    default:
      text = "About Me ~ Richard Lechko.";
  }

  const speed = 100; // Speed of typing in milliseconds
  let index = 0;

  function typeWriter() {
    if (index < text.length) {
      document.getElementById("header").innerHTML += text.charAt(index);
      index++;
      setTimeout(typeWriter, speed);
    } else {
      // Add the 'finished' class once typing is done to start the cursor blinking
      document.getElementById("header").classList.add("finished");
    }
  }

  // Clear the header content initially
  document.getElementById("header").innerHTML = "";
  typeWriter();

  /* TYPING ANIMATION END */

  let a = document.getElementById("cookieConsent");

  if (a) {
    if (!localStorage.getItem("cookieConsent")) {
      document.getElementById("cookieConsent").style.display = "block";
    }
  }

  a = document.getElementById("acceptCookies");

  if (a) {
    document
      .getElementById("acceptCookies")
      .addEventListener("click", function () {
        localStorage.setItem("cookieConsent", "true");
        document.getElementById("cookieConsent").style.display = "none";
      });
  }

  contactFormEventListener();
  initializeCurrency();
  initializeWeather();
  initializeTimer();
});
