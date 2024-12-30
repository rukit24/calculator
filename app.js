const digitCtn = document.getElementById("digit-button");
const buttonRows = [
  ["AC", "+/-", "%", "÷"],
  ["7", "8", "9", "x"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  [".", "0", "="],
];
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

      // Append the button to the current row
      rowDiv.appendChild(button);
    });
  });
}
setButton();
