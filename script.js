const numbers = document.getElementsByClassName('num');
const operator = document.getElementsByClassName('operator');
const currentOperation = document.getElementById('current-op');
const previousOperation = document.getElementById('previous-op');

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

let calculate = function (firstValue, operator, secondValue) {
  if (operator in operators) {
    return operators[operator](firstValue, secondValue);
  }
};

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
    currentOperation.textContent = currentOperationValue.join('');
  });
}

for (let operation of operator) {
  operation.addEventListener('click', e => {
    if (currentOperationValue.length >= 1) {
      if (e.target.id == '=') {
        insertPreviousOperation(e.target.id);
        updatePreviousOperation();
        result = calculate(...previousOperationValue);
        displayResult(result);
      } else {
        insertPreviousOperation(e.target.id);
        updateCurrentOperation();
      }
    }
  });
}

function displayResult(result) {
  currentOperationValue = [result];
  previousOperationValue.splice(0);
  currentOperation.textContent = currentOperationValue;
}

function insertPreviousOperation(id) {
  previousOperationValue.push(parseFloat(currentOperationValue.join('')));
  previousOperationValue.push(id);
}

function updateCurrentOperation() {
  previousOperation.textContent = previousOperationValue.join(' ');
  currentOperationValue.splice(0);
  currentOperation.textContent = currentOperationValue;
}

function updatePreviousOperation() {
  previousOperation.textContent = previousOperationValue.join(' ');
}

/* for (let button of numbers) {
  button.addEventListener('click', () => {
    if (button.id === '.' && currentOperationValue.includes('.')) {
      return;
    }
    if (button.id === '.' && currentOperationValue.length === 0) {
      currentOperationValue.push('0');
    }
    currentOperationValue.push(button.id);
    currentOperation.textContent = currentOperationValue.join('');
  });
} */
