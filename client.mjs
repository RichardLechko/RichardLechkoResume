import { contactFormEventListener } from "./Contact-Page/contactForm.mjs";
import { initializeCurrency } from "./Resume-Widgets/Resume-Currency/currency.mjs";
import { initializeWeather } from "./Resume-Widgets/Resume-Weather/weather.mjs";
import { initializeTimer } from "./Resume-Widgets/Resume-Timer/timer.mjs";

document.addEventListener("DOMContentLoaded", function () {
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
