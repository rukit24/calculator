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

const updateDisplay = (result, formula = "") => {
  displayResult.textContent = result;
  displayFormula.textContent = formula;
};

const clearAll = () => {
  currentInput = "";
  previousInput = "";
  operator = "";
  resultDisplayed = false;
  updateDisplay("0", "");
};

const handleDigit = (buttonText) => {
  if (resultDisplayed) {
    currentInput = buttonText === "." ? "0." : buttonText; //case when input the "." and digit
    // previousInput = "";
    resultDisplayed = false;
  } else {
    currentInput += buttonText;
  }
  const formula =
    operator && previousInput
      ? `${previousInput} ${operator} ${currentInput} =`
      : "";
  updateDisplay(currentInput, formula);
};

const handleOperator = (buttonText) => {
  if (!currentInput && previousInput) {
    operator = buttonText;
  } else if (currentInput) {
    if (operator && previousInput) {
      previousInput = operate(operator, previousInput, currentInput).toString();
    } else {
      previousInput = currentInput;
    }
    operator = buttonText;
    currentInput = "";
    updateDisplay(
      previousInput,
      `${previousInput} ${operator} ${currentInput}`
    );
  }
};

const handleEqual = (buttonText) => {
  if (previousInput && currentInput && operator) {
    result = operate(operator, previousInput, currentInput).toString();
    resultDisplayed = true;
    updateDisplay(result, `${previousInput} ${operator} ${currentInput} =`);
    currentInput = result;
    operator = "";
    previousInput = "";
  }
};

const handleSpecial = (buttonText) => {
  switch (buttonText) {
    case "AC":
      clearAll();
      break;
    case "+/-":
      currentInput = currentInput
        ? (-parseFloat(currentInput)).toString()
        : "0";
      const formula =
        previousInput && operator
          ? `${previousInput} ${operator} ${currentInput}`
          : "";
      updateDisplay(currentInput, formula);
      break;
    default:
      break;
  }
};

function handleButtonClick(buttonText) {
  if (!isNaN(buttonText) || buttonText === ".") {
    // Handle digits and decimal point
    handleDigit(buttonText);
  } else if (["+", "-", "x", "÷", "%"].includes(buttonText)) {
    // Handle operators
    handleOperator(buttonText);
  } else if (buttonText === "=") {
    // Handle equals
    handleEqual(buttonText);
  } else {
    handleSpecial(buttonText);
  }
}

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

setButton();
