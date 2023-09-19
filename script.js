const calculatorButtons = document.querySelector('.calculator-buttons');
const currentOperationDisplay = document.querySelector('#current-operation');
const previousOperationDisplay = document.querySelector('#previous-operation');

let currentOperation = [];
let previousOperation = [];

const operations = {
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

function calculate(values, operator) {
  return values.reduce(operations[operator]);
}

function clearDisplay(inputId) {
  if (inputId == 'C') {
    currentOperation.pop();
  } else {
    currentOperation.length = 0;
    previousOperation.length = 0;
  }
  updateDisplay();
}

function updateDisplay() {
  currentOperationDisplay.textContent = currentOperation.join('');
  previousOperationDisplay.textContent = previousOperation.join(' ');
}

function convertValue() {
  return previousOperation.push(parseFloat(currentOperation.join('')));
}

function insertNumber(number) {
  if (number === '.' && currentOperation.join('').includes('.')) {
    null;
  } else if (number === '.' && currentOperation.length === 0) {
    currentOperation.push(0);
    currentOperation.push(number);
  } else {
    currentOperation.push(number);
  }
  updateDisplay();
}

function removeTrailingZeros(result) {
  const convertedNumber = String(result).replace(/\.0+$/, '');
  return parseFloat(convertedNumber);
}

function handleOperator(operator) {
  if (
    operator === '=' &&
    previousOperation.length === 2 &&
    currentOperation.length >= 1
  ) {
    convertValue();
    currentOperation = [
      calculate(
        [previousOperation[0], previousOperation[2]],
        previousOperation[1]
      ).toFixed(11),
    ];
    currentOperation = [removeTrailingZeros(currentOperation)];
    previousOperation.length = 0;
  } else if (
    operator !== '=' &&
    previousOperation.length === 0 &&
    currentOperation.length >= 1
  ) {
    convertValue();
    previousOperation.push(operator);
    currentOperation.length = 0;
  }
  updateDisplay();
}

calculatorButtons.addEventListener('click', e => {
  const targetId = e.target.id;
  const targetClass = e.target.className;
  if (targetClass == 'num') {
    insertNumber(targetId);
  } else if (targetClass == 'operator') {
    handleOperator(targetId);
  } else {
    clearDisplay(targetId);
  }
});
