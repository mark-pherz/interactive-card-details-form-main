document.addEventListener("DOMContentLoaded", () => {
  const nameField = document.getElementById("cardholder-name");
  const cardNumberField = document.getElementById("card-number");
  const expMonthField = document.getElementById("exp-month");
  const expYearField = document.getElementById("exp-year");
  const cvcCode = document.getElementById("cvc");
  const submit = document.getElementById("submit");
  const continue_ = document.getElementById("continue");

  nameField.addEventListener("focus", function () {
    document.getElementById("cardholder-error").innerText = "";
    document.getElementById("cardholder-name").classList.remove("error-border");
  });

  nameField.addEventListener("input", () => {
    nameField.value = nameField.value.replace(/[^a-zA-Z\s]/g, "");
    if (nameField.value.length > 28) {
      nameField.value = nameField.value.slice(0, 28);
    }
    let name = nameField.value;
    const cardName = document.getElementById("cardholder-name-card");
    cardName.innerText = `${name}`;
  });

  cardNumberField.addEventListener("focus", () => {
    document.getElementById("card-number-error").innerText = ``;
    document.getElementById("card-number").classList.remove("error-border");
  });

  cardNumberField.addEventListener("input", () => {
    const cardNumber = document.getElementById("card-number-card");
    cardNumberField.value = cardNumberField.value.replace(/\D/g, "");
    if (cardNumberField.value.length > 16) {
      cardNumberField.value = cardNumberField.value.slice(0, 16);
    }
    let fullDisplay = "0000 0000 0000 0000";
    if (cardNumberField.value) {
      let userInput = cardNumberField.value.replace(/(.{4})/g, "$1 ").trim();
      let padLength = 19 - userInput.length;
      fullDisplay = (userInput + fullDisplay.slice(userInput.length)).slice(
        0,
        19
      );
      if (fullDisplay.length > 19) {
        fullDisplay = fullDisplay.slice(0, 19);
      }
    }
    cardNumber.innerText = fullDisplay;
  });

  nameField.addEventListener("blur", function () {
    if (nameField.value.trim() === "") {
      const names = ["Albert", "Marie", "Isaac", "Ada", "Nikola"];
      const surnames = ["Einstein", "Curie", "Newton", "Lovelace", "Tesla"];
      const nameIndex = Math.floor(Math.random() * names.length);
      const surnameIndex = Math.floor(Math.random() * surnames.length);
      const name = names[nameIndex] + " " + surnames[surnameIndex];
      nameField.value = name;
      const cardName = document.getElementById("cardholder-name-card");
      cardName.innerText = `${name}`;
    }
  });

  cardNumberField.addEventListener("blur", function () {
    let value = cardNumberField.value.replace(/\D/g, "");
    if (value === "") {
      value = Array.from({ length: 16 }, () =>
        Math.floor(Math.random() * 10)
      ).join("");
    } else if (value.length < 16) {
      value = value.padEnd(16, "0");
    }
    cardNumberField.value = value.replace(/(.{4})/g, "$1 ").trim();
    const cardNumber = document.getElementById("card-number-card");
    cardNumber.innerText = cardNumberField.value;
  });

  expMonthField.addEventListener("focus", () => {
    document.getElementById("exp-month").classList.remove("error-border");
    if (expYearField.value) {
      document.getElementById("exp-error").innerText = ``;
    }
  });

  expMonthField.addEventListener("input", () => {
    const monthExpCard = document.getElementById("exp-month-card");
    expMonthField.value = expMonthField.value.replace(/\D/g, "");
    if (expMonthField.value.length >= 1) {
      let firstDigit = expMonthField.value.charAt(0);
      if (["2", "3", "4", "5", "6", "7", "8", "9"].includes(firstDigit)) {
        expMonthField.value = firstDigit;
      } else if (expMonthField.value.length > 2) {
        expMonthField.value = expMonthField.value.slice(0, 2);
      } else if (firstDigit === "1") {
        let secondDigit = expMonthField.value.charAt(1);
        if (
          expMonthField.value.length === 2 &&
          !["0", "1", "2"].includes(secondDigit)
        ) {
          expMonthField.value = expMonthField.value.slice(0, 1);
        }
      } else if (firstDigit === "0") {
        let secondDigit = expMonthField.value.charAt(1);

        if (expMonthField.value.length === 2 && secondDigit === "0") {
          expMonthField.value = expMonthField.value.slice(0, 1);
        }
      }
    }
    monthExpCard.innerText = expMonthField.value.padStart(2, "0");
  });

  expMonthField.addEventListener("blur", function () {
    if (expMonthField.value.trim() === "") {
      const currentMonth = new Date().getMonth() + 1;

      const formattedMonth = currentMonth.toString().padStart(2, "0");
      expMonthField.value = formattedMonth;

      const monthExpCard = document.getElementById("exp-month-card");
      monthExpCard.innerText = formattedMonth;
    }
  });

  expYearField.addEventListener("input", function () {
    const cardYearField = document.getElementById("exp-year-card");
    const currentYearLastTwo = new Date().getFullYear().toString().slice(-2);
    let value = expYearField.value.replace(/\D/g, "");
    if (value.length > 2) {
      value = value.slice(0, 2);
    }
    if (value.length === 1) {
      if (value[0] < currentYearLastTwo[0]) {
        value = "";
      }
    } else if (value.length === 2) {
      if (
        value[0] === currentYearLastTwo[0] &&
        value[1] < currentYearLastTwo[1]
      ) {
        value = value[0];
      }
    }
    expYearField.value = value;
    cardYearField.innerText = value.padStart(2, "0");
  });

  expYearField.addEventListener("focus", () => {
    document.getElementById("exp-year").classList.remove("error-border");
    if (expMonthField.value) {
      document.getElementById("exp-error").innerText = ``;
    }
  });

  expYearField.addEventListener("blur", function () {
    const currentYearLastTwo = new Date().getFullYear().toString().slice(-2);

    if (expYearField.value.length === 1) {
      expYearField.value = currentYearLastTwo;
      document.getElementById("exp-year-card").innerText = currentYearLastTwo;
    } else if (expYearField.value.length === 0) {
      expYearField.value = currentYearLastTwo;
      document.getElementById("exp-year-card").innerText = currentYearLastTwo;
    }
  });

  cvcCode.addEventListener("focus", () => {
    document.getElementById("cvc-error").innerText = ``;
    document.getElementById("cvc").classList.remove("error-border");
  });

  cvcCode.addEventListener("input", function () {
    const cardCvc = document.getElementById("cvc-card");
    cvcCode.value = cvcCode.value.replace(/\D/g, "").slice(0, 3);
    cardCvc.innerText = cvcCode.value;
  });
  cvcCode.addEventListener("blur", function () {
    const cardCvc = document.getElementById("cvc-card");
    let value = cvcCode.value;
    if (!value) {
      value = "001";
    }
    if (value.length < 3) {
      // If the user enters "00", append "1" to make it valid
      if (value === "00") {
        value += "1";
      } else {
        // Otherwise, pad the value with zeros to ensure it's 3 digits
        value = value.padEnd(3, "0");
      }
    }
    cvcCode.value = value;
    cardCvc.innerText = value;
  });

  submit.addEventListener("click", (e) => {
    e.preventDefault();

    if (!nameField.value) {
      document.getElementById("cardholder-error").innerText = `Can't be empty`;
      document.getElementById("cardholder-name").classList.add("error-border");
    }
    if (!cardNumberField.value) {
      document.getElementById("card-number-error").innerText = `Can't be empty`;
      document.getElementById("card-number").classList.add("error-border");
    }
    if (!expMonthField.value || !expYearField.value) {
      document.getElementById("exp-error").innerText = `Can't be empty`;
      if (!expMonthField.value) {
        document.getElementById("exp-month").classList.add("error-border");
      }
      if (!expYearField.value) {
        document.getElementById("exp-year").classList.add("error-border");
      }
    }
    if (!cvcCode.value) {
      document.getElementById("cvc-error").innerText = `Can't be empty`;
      document.getElementById("cvc").classList.add("error-border");
    }

    if (
      nameField.value &&
      cardNumberField.value &&
      expMonthField.value &&
      expYearField.value &&
      cvcCode.value
    ) {
      document.getElementById("thank-you").classList.remove("hide");
      document.getElementById("input-section").classList.add("hide");
    }
  });
  continue_.addEventListener("click", () => {
    document.getElementById("thank-you").classList.add("hide");
    document.getElementById("input-section").classList.remove("hide");
  });
});
