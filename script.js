console.log("Calculator Loaded!");

const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let shouldResetDisplay = false;

function isOperator(value) {
    return ["+", "-", "*", "/"].includes(value);
}

function isInvalidStartingOperator(value) {
    return display.value === "" && (value === "*" || value === "/");
}

function clearDisplay() {
    display.value = "";
    shouldResetDisplay = false;
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

function appendToDisplay(value) {
    if (shouldResetDisplay && !isOperator(value)) {
        clearDisplay();
    }

    display.value += value;
}

function calculateResult() {
    try {
        display.value = eval(display.value);
        shouldResetDisplay = true;
    } catch (error) {
        display.value = "Error";
    }
}

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const value = button.textContent;
        const lastCharacter = display.value.slice(-1);

        if (isInvalidStartingOperator(value)) {
            return;
        }

        if (isOperator(value) && isOperator(lastCharacter)) {
            return;
        }

        switch (value) {

            case "C":
                clearDisplay();
                break;

            case "⌫":
                backspace();
                break;

            case "=":
                calculateResult();
                break;

            default:
                appendToDisplay(value);
        }

    });

});



