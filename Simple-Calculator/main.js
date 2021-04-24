const calculator = document.querySelector('.calculator');
const display = calculator.querySelector('.calculator_display');
const keys = calculator.querySelector('.calculator_keys');

keys.addEventListener('click', (e) => {
  if (!e.target.closest('button')) return;

  const key = e.target;
  const keyValue = e.target.textContent;
  const displayValue = display.textContent;
  const { type } = key.dataset;
  const { previousKeyType } = calculator.dataset;

  if (type === 'number') {
    if (displayValue === '0') {
      display.textContent = keyValue;
    } else if (previousKeyType === 'operator') {
      display.textContent = keyValue;
    } else {
      display.textContent += keyValue;
    }
  }

  if (type === 'operator') {
    calculator.dataset.firstNumber = displayValue;
    calculator.dataset.operator = key.dataset.key;
  }

  if (type === 'equal') {
    // perform a calculation
    const firstNumber = calculator.dataset.firstNumber;
    const operator = calculator.dataset.operator;
    const secondNumber = displayValue;
    display.textContent = calculate(firstNumber, operator, secondNumber);
  }

  calculator.dataset.previousKeyType = type;
});

function calculate(firstNumber, operator, secondNumber) {
  firstNumber = parseInt(firstNumber);
  secondNumber = parseInt(secondNumber);

  if (operator === 'plus') return firstNumber + secondNumber;
  if (operator === 'minus') return firstNumber - secondNumber;
  if (operator === 'times') return firstNumber * secondNumber;
  if (operator === 'divide') return firstNumber / secondNumber;
}

console.log('this is to test if it is working');
