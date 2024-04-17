/*!
 * Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
 * Copyright 2013-2023 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
 */
window.addEventListener("DOMContentLoaded", () => {
  function validateForm() {
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const licenseNumber = document.getElementById("licenseNumber").value.trim();
    const age = document.getElementById("age").value.trim();
    const carMake = document.getElementById("carMake").value.trim();
    const carModel = document.getElementById("carModel").value.trim();
    const carYear = document.getElementById("carYear").value.trim();
    const plateNumber = document.getElementById("plateNumber").value.trim();

    // Check if fields are empty
    if (
      !firstName ||
      !lastName ||
      !licenseNumber ||
      !age ||
      !carMake ||
      !carModel ||
      !carYear ||
      !plateNumber
    ) {
      alert("All fields are required.");
      return false;
    }

    // Validate age (must be a positive number)
    if (isNaN(age) || age <= 0) {
      alert("Age must be a positive number.");
      return false;
    }

    // Validate license number format (8 characters alphanumeric)
    const licenseRegex = /^[A-Za-z0-9]{8}$/;
    if (!licenseRegex.test(licenseNumber)) {
      alert("License number must be 8 characters alphanumeric.");
      return false;
    }

    // Validate year (must be a valid year)
    const currentYear = new Date().getFullYear();
    if (isNaN(carYear) || carYear < 1900 || carYear > currentYear) {
      alert("Please enter a valid car year.");
      return false;
    }

    return true;
  }

  let scrollPos = 0;
  const mainNav = document.getElementById("mainNav");
  const headerHeight = mainNav.clientHeight;
  window.addEventListener("scroll", function () {
    const currentTop = document.body.getBoundingClientRect().top * -1;
    if (currentTop < scrollPos) {
      // Scrolling Up
      if (currentTop > 0 && mainNav.classList.contains("is-fixed")) {
        mainNav.classList.add("is-visible");
      } else {
        console.log(123);
        mainNav.classList.remove("is-visible", "is-fixed");
      }
    } else {
      // Scrolling Down
      mainNav.classList.remove(["is-visible"]);
      if (
        currentTop > headerHeight &&
        !mainNav.classList.contains("is-fixed")
      ) {
        mainNav.classList.add("is-fixed");
      }
    }
    scrollPos = currentTop;
  });
});
