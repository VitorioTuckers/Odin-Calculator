const calculatorButtons = document.querySelector('.calculator-buttons');
const currentOperationDisplay = document.querySelector('#current-operation');
const previousOperationDisplay = document.querySelector('#previous-operation');

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

console.log(calculate([10, 10], '+'));

let currentOperation = [];
let previousOperation = [];

function insertNumber(number) {
  currentOperation.push(number);
}

function insertOperator(operator) {
  currentOperation.push(operator);
}

function clearDisplay(inputId) {
  if (inputId == 'C') {
    currentOperation.pop();
  } else {
    currentOperation.length = 0;
    previousOperation.length = 0;
  }
}

calculatorButtons.addEventListener('click', e => {
  let targetId = e.target.id;
  let targetClass = e.target.className;
  if (targetClass == 'num') {
    insertNumber(targetId);
  } else if (targetClass == 'operator') {
    insertOperator(targetId);
  } else {
    clearDisplay(targetId);
  }
  currentOperationDisplay.textContent = currentOperation;
  previousOperationDisplay.textContent = previousOperation;
});
