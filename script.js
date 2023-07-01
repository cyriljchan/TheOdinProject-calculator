const add = function (x, y) {
    return x + y;
}
const subtract = function (x, y) {
    return x - y;
}
const multiply = function (x, y) {
    return x * y;
}
const divide = function (x, y) {
    return x / y;
}
const operate = function (operation, x, y) {
    // since funcs are in a closure, need to jerryrig them into window hahaha
    window.add = add;
    window.subtract = subtract;
    window.multiply = multiply;
    window.divide = divide;
    // DIV BY 0 HANDLING
    if (operation === 'divide' && y === '0') {
        alert('ERR: DIV BY 0');
        return 0;
    };
    // DECIMAL HANDLING
    return (Math.round((window[operation](+x, +y) + Number.EPSILON) * 10000) / 10000);
}

const display = function(text, location) {
    let signObj = {'add':'+', 'subtract':'-', 'multiply':'*', 'divide':'/'};
    let sign = (signObj[operation]) ? signObj[operation] : '';

    // text = (!isNaN(text) && !isNaN(parseFloat(text))) ? parseFloat(text) : text;
    document.querySelector('.display ' + location).textContent = text;
    document.querySelector('.display ' + '.top').textContent = `${firstNum} ${sign} ${secondNum}`;
}

const containsDecimal = function(num) {
    return (num + '').includes('.');
}
const numPress = function(target) {
    if (!target.classList.contains('dot')) {
        if (operation === '') {
            // HANDLING AFTER CLICKING "=" (RESULTS TO typeof number)
            if (typeof firstNum !== 'number') {
                firstNum = firstNum + target.textContent;
            }
            else {firstNum = target.textContent}
            display(firstNum, '.num');
        }
        else {
            secondNum += target.textContent;
            display(secondNum, '.num');
        };
    }
    // DECIMAL HANDLING
    else {
        if (operation === '' && !containsDecimal(firstNum)) {
            firstNum += (firstNum === '') ? '0' + target.textContent : target.textContent;
            display(firstNum, '.num');
        }
        else if (operation !== '' && !containsDecimal(secondNum)) {
            secondNum += (secondNum === '') ? '0' + target.textContent : target.textContent;
            display(secondNum, '.num');
        }
    }
}

const opPress = function(target) {
    if (!target.classList.contains('eval')) {
        // !num1 !num2, num1=0, define op;
        if (!firstNum && !secondNum) {
            firstNum = 0; 
            operation = target.classList[2];
            display(target.textContent, '.op');
        }
        // num1 !num2, define op;
        else if (firstNum && !secondNum){
            operation = target.classList[2];
            display(target.textContent, '.op');
        }
        // operate, clear num2, redefine op;
        else {
            firstNum = operate(operation, firstNum, secondNum);
            secondNum = '';
            operation = target.classList[2];
            display(firstNum, '.num');
            display(target.textContent, '.op');
        }
    }
    // CLICK "=" BUTTON
    // considering only secondNum since secondNum = (firstNum && operation)
    else if (secondNum) {
        firstNum = operate(operation, firstNum, secondNum);
        secondNum = '';
        operation = '';
        display(firstNum, '.num');
        display(operation, '.op');
    }
}

const funcPress = function(target) {
    if (target.classList.contains('clear')) {
        firstNum = '';
        secondNum = '';
        operation = '';
        display(0, '.num');
        display('', '.op');
    }
    else if (target.classList.contains('sign')) {
        if (!secondNum) {
            firstNum = 0 - +firstNum;
            display(firstNum, '.num');
        }
        else {
            secondNum = 0 - +secondNum;
            display(secondNum, '.num');
        }
    }
    else if (target.classList.contains('del')) {
        if (!operation && !secondNum) {
            firstNum = firstNum.toString().slice(0, -1);
            display(firstNum, '.num');
        }
        else if (!secondNum){
            operation = '';
            display(operation, '.op');
        }
        else {
            secondNum = secondNum.toString().slice(0, -1);
            display(secondNum, '.num');
        }

    }
}

const keypress = function (e) {
    const target = e.target;
    if (target.classList.contains('num')) {
        console.log('keypress: num clicked');
        numPress(target);
    }
    else if (target.classList.contains('op')) {
        console.log('keypress: op clicked');
        opPress(target);
    }
    else if (target.classList.contains('func')) {
        console.log('keypress: func clicked');
        funcPress(target);
    }
    console.log('result', typeof firstNum, firstNum, operation, secondNum)
}

let firstNum = '';
let secondNum = '';
let operation = '';

const buttons = document.querySelectorAll('.btn');
buttons.forEach(
    button => button.addEventListener('click', (e) => {keypress(e)})
);