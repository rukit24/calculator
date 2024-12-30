const displayResult = document.getElementById("result");
const digitCtn = document.getElementById("digit-button");
const displayFormula = document.getElementById("formula");
let currentInput = ""; // Current input number
let previousInput = ""; // Previous input number
let operator = ""; // Current operator
let formula = ""; // Formula to display
let resultDisplayed = false;
const buttonRows = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  [".", "0", "="],
];

//Operation
const add = (a, b) => a + b;

const subtract = (a, b) => a - b;

const multiply = (a, b) => a * b;

const divide = (a, b) => a / b;

const modulo = (a, b) => a % b;

const operate = (operator, a, b) => {
  a = parseFloat(a);
  b = parseFloat(b);
  let result;
  switch (operator) {
    case "+":
      result = add(a, b);
      break;
    case "-":
      result = subtract(a, b);
      break;
    case "÷":
      result = divide(a, b);
      break;
    case "x":
      result = multiply(a, b);
      break;
    case "%":
      result = modulo(a, b);
      break;
  }
  return Number.isInteger(result) ? result : Math.round(result * 100) / 100;
};

function setButton() {
  buttonRows.forEach((rowButtons, rowIndex) => {
    // Find the corresponding row by its class name
    const rowDiv = document.querySelector(`.row-${rowIndex + 1}`);

    // Loop through each button in the current row
    rowButtons.forEach((buttonText) => {
      const button = document.createElement("button");
      button.id = `button-${buttonText}`;
      button.textContent = buttonText;
      if (!isNaN(buttonText)) {
        button.classList.add("button-digit"); // Add digit class
      } else {
        button.classList.add("button-operator"); // Add operator class
      }
      // button.classList.add("button");
      button.addEventListener("click", () => {
        handleButtonClick(buttonText);
      });
      // Append the button to the current row
      rowDiv.appendChild(button);
    });
  });
}

function handleButtonClick(buttonText) {
  if (!isNaN(buttonText) || buttonText === ".") {
    // Handle digits and decimal point
    if (resultDisplayed) {
      currentInput = buttonText === "." ? "0." : buttonText;
      resultDisplayed = false;
    } else {
      currentInput += buttonText;
    }
    displayResult.textContent = currentInput;
  } else if (["+", "-", "x", "÷", "%"].includes(buttonText)) {
    // Handle operators
    if (currentInput === "" && previousInput !== "") {
      operator = buttonText; // Change the operator if needed
    } else if (currentInput !== "") {
      if (operator && previousInput !== "") {
        previousInput = operate(
          operator,
          previousInput,
          currentInput
        ).toString();
        displayFormula.textContent = `${previousInput} ${buttonText}`;
      } else {
        previousInput = currentInput;
        displayFormula.textContent = `${previousInput} ${buttonText}`;
      }
      currentInput = "";
      operator = buttonText;
    }
  } else if (buttonText === "=") {
    // Handle equals
    if (currentInput !== "" && previousInput !== "" && operator) {
      const result = operate(operator, previousInput, currentInput);
      displayFormula.textContent = `${previousInput} ${operator} ${currentInput} =`;
      displayResult.textContent = result;
      currentInput = result.toString();
      previousInput = "";
      operator = "";
      resultDisplayed = true;
    }
  } else if (buttonText === "AC") {
    // Handle clear
    currentInput = "";
    previousInput = "";
    operator = "";
    formula = "";
    displayResult.textContent = "0";
    displayFormula.textContent = "";
  } else if (buttonText === "+/-") {
    // Handle positive/negative toggle
    currentInput = currentInput ? (-parseFloat(currentInput)).toString() : "";
    displayResult.textContent = currentInput;
  }
}

setButton();
