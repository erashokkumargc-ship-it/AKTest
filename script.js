const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let expression = '';

function updateDisplay() {
  display.value = expression || '0';
}

function isOperator(value) {
  return ['+', '-', '*', '/', '%'].includes(value);
}

function sanitizeExpression(input) {
  return input.replace(/[^0-9+\-*/%.() ]/g, '');
}

function calculate() {
  const sanitized = sanitizeExpression(expression);

  if (!sanitized) {
    return;
  }

  try {
    const result = Function(`"use strict"; return (${sanitized})`)();
    if (Number.isFinite(result)) {
      expression = String(result);
    } else {
      expression = '';
    }
  } catch (error) {
    expression = '';
  }

  updateDisplay();
}

function appendValue(value) {
  const lastChar = expression.slice(-1);

  if (value === '.' && expression.includes('.')) {
    return;
  }

  if (value === '.' && expression === '') {
    expression = '0.';
    updateDisplay();
    return;
  }

  if (isOperator(value)) {
    if (expression === '' && value !== '-') {
      return;
    }

    if (expression === '' && value === '-') {
      expression = '-';
      updateDisplay();
      return;
    }

    if (isOperator(lastChar)) {
      if (value === '-' && lastChar !== '-') {
        expression += value;
      } else {
        expression = expression.slice(0, -1) + value;
      }
    } else {
      expression += value;
    }

    updateDisplay();
    return;
  }

  if (expression === '0' && value !== '.') {
    expression = value;
  } else {
    expression += value;
  }

  updateDisplay();
}

function backspace() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function clear() {
  expression = '';
  updateDisplay();
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === 'clear') {
      clear();
      return;
    }

    if (action === 'backspace') {
      backspace();
      return;
    }

    if (action === 'calculate') {
      calculate();
      return;
    }

    if (value !== undefined) {
      appendValue(value);
    }
  });
});

document.addEventListener('keydown', (event) => {
  const key = event.key;

  if (/^[0-9.]$/.test(key)) {
    appendValue(key);
    return;
  }

  if (['+', '-', '*', '/', '%'].includes(key)) {
    appendValue(key);
    return;
  }

  if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calculate();
    return;
  }

  if (key === 'Escape') {
    clear();
    return;
  }

  if (key === 'Backspace') {
    backspace();
  }
});

updateDisplay();
