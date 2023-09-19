const calculatorButtons = document.querySelector('.calculator-buttons');
const currentOperationDisplay = document.querySelector('#current-operation');
const previousOperationDisplay = document.querySelector('#previous-operation');

let curOprtn = [];
let prevOprtn = [];

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

function operate(values, operator) {
  return values.reduce(operations[operator]);
}

function clearDisplay(inputId) {
  if (inputId == 'C') {
    curOprtn.pop();
  } else {
    curOprtn.length = 0;
    prevOprtn.length = 0;
  }
}

function updateDisplay() {
  currentOperationDisplay.textContent = curOprtn.join('');
  previousOperationDisplay.textContent = prevOprtn.join(' ');
}

function insertNumber(number) {
  if (number === '.' && curOprtn.join('').includes('.')) {
    null;
  } else if (number === '.' && curOprtn.length === 0) {
    curOprtn.push(0);
    curOprtn.push(number);
  } else {
    curOprtn.push(number);
  }
}

function convertValue() {
  return prevOprtn.push(parseFloat(curOprtn.join('')));
}

function insertOperator(operator) {
  prevOprtn.push(operator);
  curOprtn.length = 0;
}

function removeTrailingZeros(result) {
  const convertedNumber = String(result).replace(/\.0+$/, '');
  return parseFloat(convertedNumber);
}

function calculatePrev() {
  convertValue();
  prevOprtn = [operate([prevOprtn[0], prevOprtn[2]], prevOprtn[1]).toFixed(11)];
  prevOprtn = [removeTrailingZeros(prevOprtn)];
  return prevOprtn;
}

function calculateCur() {
  convertValue();
  curOprtn = [operate([prevOprtn[0], prevOprtn[2]], prevOprtn[1]).toFixed(11)];
  curOprtn = [removeTrailingZeros(curOprtn)];
  prevOprtn.length = 0;
  return curOprtn;
}

function handleOperator(operator) {
  if (operator === '=' && prevOprtn.length === 2 && curOprtn.length >= 1) {
    calculateCur();
  } else if (operator !== '=') {
    if (prevOprtn.length === 2 && curOprtn.length >= 1) {
      calculatePrev();
      insertOperator(operator);
    } else if (prevOprtn.length === 0 && curOprtn.length >= 1) {
      convertValue();
      insertOperator(operator);
    }
  }
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
  updateDisplay();
});
