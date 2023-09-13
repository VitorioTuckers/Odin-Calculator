const calculatorButtons = document.querySelector('.calculator-buttons');
const currentOperationDisplay = document.querySelector('#current-operation');
const previousOperationDisplay = document.querySelector('#previous-operation');

let currentOperation = [];
let previousOperation = [];

function insertNumber(number) {
  currentOperation.push(number);
}

function insertOperator(operator) {
  currentOperation.push(operator);
}

function clear(input) {
  if (input == 'C') {
    currentOperation.pop();
  } else {
    currentOperation.length = 0;
    previousOperation.length = 0;
  }
}

calculatorButtons.addEventListener('click', e => {
  console.log(e.target.className);
  if (e.target.className == 'num') {
    insertNumber(e.target.id);
  } else if (e.target.className == 'operator') {
    insertOperator(e.target.id);
  } else {
    clear(e.target.id);
  }
  currentOperationDisplay.textContent = currentOperation;
  previousOperationDisplay.textContent = previousOperation;
});
