import { contactFormEventListener } from "./Contact-Page/contactForm.mjs";
import { initializeCurrency } from "./Resume-Widgets/Resume-Currency/currency.mjs";
import { initializeWeather } from "./Resume-Widgets/Resume-Weather/weather.mjs";
import { initializeTimer } from "./Resume-Widgets/Resume-Timer/timer.mjs";

document.addEventListener("DOMContentLoaded", function () {
  contactFormEventListener();
  initializeCurrency();
  initializeWeather();
  initializeTimer();
});
