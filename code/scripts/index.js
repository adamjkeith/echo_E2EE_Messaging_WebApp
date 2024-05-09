document.addEventListener("DOMContentLoaded", function() {
  function showAlert() {
    alert("Currently only UK numbers can be used");
  }
  function validatePhoneNumber() {
    var phoneNumberInput = document.getElementById("phone");
    var phoneNumber = phoneNumberInput.value.trim();
    var phoneRegex = /^(?:(?:\+?44)?(?:0|\(0\))?|\(0\))?\d{10}$/;
    var numericRegex = /^\d+$/;
    if (phoneNumber.startsWith("0")) {
      phoneNumber = phoneNumber.substring(1);
    }
    if (!numericRegex.test(phoneNumber)) {
      document.getElementById("validationMessage").textContent = "Phone number must contain only digits.";
      phoneNumberInput.classList.add("shake");
      setTimeout(function() {
        phoneNumberInput.classList.remove("shake");
      }, 400);
      return false;
    } else if (!phoneRegex.test(phoneNumber)) {
      document.getElementById("validationMessage").textContent = "Invalid phone number. Please enter a valid UK phone number.";
      phoneNumberInput.classList.add("shake");
      setTimeout(function() {
        phoneNumberInput.classList.remove("shake");
      }, 400);
      return false;
    } else {
      document.getElementById("validationMessage").textContent = "";
      localStorage.setItem("phoneNumber", phoneNumber);
      return true;
    }
  }
  document.getElementById("phoneForm").addEventListener("submit", function(event) {
    if (!validatePhoneNumber()) {
      event.preventDefault();
    }
  });
});
