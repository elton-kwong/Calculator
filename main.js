let firstOperand = "";
let secondOperand = "";
let currentOperator = null;

const numberButton = document.querySelectorAll(".number");
const operatorButton = document.querySelectorAll(".operator");
const equalsButton = document.querySelectorAll(".equals");
const deleteButton = document.querySelectorAll(".delete");
const clearButton = document.querySelectorAll(".clear");
const accumulatorTextElement = document.querySelector(".accumulator");
const currentValueTextElement = document.querySelector(".currentValue");

document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9 || e.key === ".") appendNumber(e.key);
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") operation(e.key);
    if (e.key === "=" || e.key === "Enter") enter();
    if (e.key === "Backspace") backspace();
    if (e.key === "Escape") clear();
    updateDisplay();
});

//FUNCTIONS
function clear() {
    prevDisplay = "";
    accumulatorTextElement.textContent = prevDisplay;
    currentDisplay = "0";
    currentValueTextElement.textContent = currentDisplay;
    firstOperand = "";
    secondOperand = "";
    currentOperator = null;
}

function backspace() {
    if (prevDisplay.includes("=")) return;
    currentDisplay = currentDisplay.toString().slice(0, -1);
}

function appendNumber(number) {
    if (currentDisplay.length > 15 || prevDisplay.includes("=")) return; 
    if (currentDisplay === "0") {
        if (number === "0") {
            return;
        } else if (number === ".") {
            currentDisplay = currentDisplay.toString() + number.toString();
            return;
        } else {
            backspace();
        }
    }
    if (number === "." && currentDisplay.includes(".")) return;
    currentDisplay = currentDisplay.toString() + number.toString();   
}

function operation (operator) {
    if (prevDisplay !== "") enter();
    firstOperand = currentDisplay;
    currentOperator = operator;
    prevDisplay = currentDisplay + operator;
    currentDisplay = "0";
}

function enter() {
    if (prevDisplay === "" || prevDisplay.includes("=")) return;
    if (currentOperator === "/" && currentDisplay === "0") {
        alert("Y O U  A R E  A N  I D I O T  S A N D W I C H");
        // if (window.confirm('If you think you can divide by zero, click "OK"')) {
            // window.location.href='https://www.youtube.com/shorts/BzVXbeASRiQ';
        // };
        return;
    };
    secondOperand = currentDisplay;
    currentDisplay = rounding(operate(currentOperator, Number(firstOperand), Number(secondOperand)));
    prevDisplay = firstOperand + currentOperator + secondOperand + "=";
    currentOperator = null;
    if (currentDisplay.length > 15) return;
}

function rounding(number) {
    return Math.round(number * 100000) / 100000;
}

function updateDisplay() {
    currentValueTextElement.textContent = currentDisplay;
    accumulatorTextElement.textContent = prevDisplay;
}

function operate(operator, a, b) {
    if (operator === "+") {
        return a + b;
    } else if (operator === "-") {
        return a - b;
    } else if (operator === "*") {
        return a * b;
    } else if (operator === "/") {
        if (b === 0) {
            return null;
        } else {
            return a / b;
        }
    } 
}

clear();

//BUTTONS
numberButton.forEach(button => {
    button.addEventListener("click", () => {
        appendNumber(button.textContent);
        updateDisplay();
    })
})

operatorButton.forEach(button => {
    button.addEventListener("click", () => {
        if (prevDisplay === "") {
            operation(button.textContent);
        } else {
            operation(button.textContent)
        }
        updateDisplay();
    })
})

equalsButton.forEach(button => {
    button.addEventListener("click", () => {
        if (currentDisplay === "") return;
        if (prevDisplay === "") {
            return;
        } else {
            enter();
        }
        updateDisplay();
    })
})

deleteButton.forEach(button => {
    button.addEventListener("click", () => {
        backspace();
        if (currentDisplay.length < 1) {
            currentDisplay = "0";
        }
        updateDisplay();
    })
})

clearButton.forEach(button => {
    button.addEventListener("click", () => {
        clear();
    })
})