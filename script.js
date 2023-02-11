const numbers = document.querySelectorAll('.num');
const operator = document.querySelectorAll('.operator');
const clear = document.querySelectorAll('.clear');
const currentOperationDisplay = document.getElementById('current-operation');
const previousOperationDisplay = document.getElementById('previous-operation');

let currentOperation = [];
let operationQueue = [];
let operatorIncluded = false;

const operatorsList = {
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

function calculation(firstValue, operator, secondValue) {
  if (operator in operatorsList) {
    return operatorsList[operator](firstValue, secondValue);
  }
}

function updateDisplay() {
  previousOperationDisplay.textContent = operationQueue.join(' ');
  currentOperationDisplay.textContent = currentOperation.join('');
}

function convertInputToFloat() {
  operationQueue.push(parseFloat(currentOperation.join('')));
  currentOperation.length = 0;
}

function insertOperator(operator) {
  operationQueue.push(operator);
  operatorIncluded = true;
}

for (let button of clear) {
  button.addEventListener('click', () => {
    if (button.id == 'C') {
      currentOperation.pop();
    } else {
      currentOperation.length = 0;
      operationQueue.length = 0;
    }
    updateDisplay();
  });
}

for (let button of numbers) {
  button.addEventListener('click', () => {
    if (operationQueue.length != 1) {
      if (button.id === '.') {
        if (currentOperation.includes('.')) {
          return;
        } else if (currentOperation.length === 0) {
          currentOperation.push('0');
        }
        if (currentOperation.join('').includes('.')) {
          return;
        }
      }
      currentOperation.push(button.id);
      updateDisplay();
    }
  });
}

for (let button of operator) {
  button.addEventListener('click', () => {
    if (currentOperation.length >= 1 && operationQueue.length != 2) {
      convertInputToFloat();
      insertOperator(button.id);
    } else if (operatorIncluded && currentOperation.length >= 1) {
      if (button.id === '=') {
        convertInputToFloat();
        operationQueue = [calculation(...operationQueue)];
        operatorIncluded = false;
      } else if (button.id !== '=') {
        convertInputToFloat();
        operationQueue = [calculation(...operationQueue)];
        insertOperator(button.id);
      }
    } else if (button.id !== '=' && operationQueue.length == 1) {
      insertOperator(button.id);
    }
    updateDisplay();
  });
}
