const calculatorButtons = document.querySelector('.calculator-buttons');
const currentOperationDisplay = document.querySelector('#current-operation');
const previousOperationDisplay = document.querySelector('#previous-operation');

let valuePool = [];
let currentOperation = [[]];
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

function insertNumber(number) {
  if (number == '.' && valuePool.includes('.')) {
    null;
  } else {
    valuePool.push(number);
    updateDisplay(valuePool);
  }
}

function insertOperator(operator) {
  if (operator == '=') {
    currentOperation[0].push(parseFloat(valuePool.join('')));
    valuePool = [[calculate(...currentOperation)]];
    currentOperation = [[]];
    updateDisplay(valuePool);
  } else if (currentOperation.length < 2) {
    currentOperation[0].push(parseFloat(valuePool.join('')));
    currentOperation.push(operator);
    valuePool.length = 0;
    updateDisplay([currentOperation[1]]);
  }
}

function clearDisplay(inputId) {
  if (inputId == 'C') {
    valuePool.pop();
  } else {
    currentOperation = [[]];
    previousOperation.length = 0;
    valuePool.length = 0;
  }
  updateDisplay(valuePool);
}

function updateDisplay(value) {
  currentOperationDisplay.textContent = value.join('');
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
  console.log(currentOperation);
});
