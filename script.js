const numbers = document.querySelectorAll('.num');
const operator = document.querySelectorAll('.operator');
const clear = document.querySelectorAll('.clear');
const currentOperationDisplay = document.getElementById('current-operation');
const previousOperationDisplay = document.getElementById('previous-operation');

let currentOperationValue = [];
let previousOperationValue = [];
let result = null;

const operators = {
  '+': (firstValue, secondValue) => {
    return firstValue + secondValue;
  },
  '-': (firstValue, secondValue) => {
    return firstValue - secondValue;
  },
  '*': (firstValue, secondValue) => {
    return firstValue * secondValue;
  },
  '/': (firstValue, secondValue) => {
    return firstValue / secondValue;
  },
  '%': (firstValue, secondValue) => {
    return firstValue % secondValue;
  },
};

function calculatation(firstValue, operator, secondValue) {
  if (operator in operators) {
    return operators[operator](firstValue, secondValue);
  }
}

function updateDisplay() {
  previousOperationDisplay.textContent = previousOperationValue.join(' ');
  currentOperationDisplay.textContent = currentOperationValue.join('');
}

function convertInputToFloat() {
  previousOperationValue.push(parseFloat(currentOperationValue.join('')));
  currentOperationValue.length = 0;
}

function insertOperator(operator) {
  previousOperationValue.push(operator);
}

for (let clr of clear) {
  clr.addEventListener('click', e => {
    if (clr.id == 'C') {
      currentOperationValue.pop();
    } else if (clr.id == 'AC') {
      currentOperationValue.length = 0;
      previousOperationValue.length = 0;
    }
    updateDisplay();
  });
}

for (let button of numbers) {
  button.addEventListener('click', () => {
    if (button.id === '.') {
      if (currentOperationValue.includes('.')) {
        return;
      } else if (currentOperationValue.length === 0) {
        currentOperationValue.push('0');
      }
      if (currentOperationValue.join('').includes('.')) {
        return;
      }
    }
    currentOperationValue.push(button.id);
    updateDisplay();
  });
}

for (let button of operator) {
  button.addEventListener('click', () => {
    if (button.id == '=') {
      convertInputToFloat();
      currentOperationValue = [calculatation(...previousOperationValue)];
      previousOperationValue.length = 0;
    } else if (currentOperationValue.length >= 1) {
      if (previousOperationValue.length >= 2 && button.id != '=') {
        convertInputToFloat();
        previousOperationValue = [calculatation(...previousOperationValue)];
        insertOperator(button.id);
      } else {
        convertInputToFloat();
        insertOperator(button.id);
      }
    }
    updateDisplay();
  });
}
