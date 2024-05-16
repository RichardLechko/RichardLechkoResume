// Event listener function for the contact form
const contactFormEventListener = () => {
  const contactForm = document.querySelector("#contactForm form");
  const formFeedback = document.getElementById("formFeedback");
  const linksContainer = document.getElementById("linksContainer");

  if (!contactForm || !formFeedback || !linksContainer) {
    return; // Exit if contact form is not found
  }

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Validate form inputs
    if (!validateForm(contactForm)) {
      return; // Exit if form validation fails
    }

    try {
      const formData = new FormData(contactForm); // Get form data
      const formObject = Object.fromEntries(formData.entries()); // Convert FormData to plain object

      const response = await fetch("https://demo1.richardlechko.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });

      const responseData = await response.json(); // Parse the response JSON

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      if (response.ok) {
        // Reset form and display success message
        contactForm.reset();
        formFeedback.textContent =
          responseData.message || "Message sent successfully!";
        formFeedback.classList.remove("error");
        formFeedback.classList.add("success");

        document.getElementById("linksContainer").style.display = "flex";

        const links = responseData.links; // Assuming your server sends back links in the response
        linksContainer.innerHTML = ""; // Clear previous links
        links.forEach((link) => {
          const linkElement = document.createElement("a");
          linkElement.href = link.url;
          linkElement.textContent = link.text;
          linkElement.target = "_blank"; // Open links in a new tab/window
          linksContainer.appendChild(linkElement);
        });
      } else {
        throw new Error(responseData.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      formFeedback.textContent =
        "Failed to send message. Please try again later.";
      formFeedback.classList.remove("success");
      formFeedback.classList.add("error");
    }
  });
};

// Function to validate the contact form
const validateForm = (form) => {
  const name = form.querySelector("[name='name']").value.trim();
  const email = form.querySelector("[name='email']").value.trim();
  const subject = form.querySelector("[name='subject']").value.trim();
  const message = form.querySelector("[name='message']").value.trim();

  if (!name || !email || !subject || !message) {
    alert("Please fill out all fields.");
    return false; // Form validation failed
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return false; // Form validation failed
  }

  return true; // Form validation passed
};

// Export the event listener function and validateForm function
export { contactFormEventListener, validateForm };
