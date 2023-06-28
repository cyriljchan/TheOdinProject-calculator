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
    // since funcs are in a closure, need to jerryrig them hahaha
    window.add = add;
    window.subtract = subtract;
    window.multiply = multiply;
    window.divide = divide;
    return window[operation](+x, +y);
}

const display = function(text, location) {
    // text = (!isNaN(text) && !isNaN(parseFloat(text))) ? parseFloat(text) : text;
    document.querySelector('.display ' + location).textContent = text;
    document.querySelector('.display ' + '.top').textContent = `${firstNum} ${operation} ${secondNum}`;
}

const numPress = function(target) {
    if (operation === '') {
        firstNum = (parseFloat(firstNum)) ? firstNum + target.textContent : target.textContent;
        display(firstNum, '.num');
    }
    else {
        secondNum += target.textContent;
        display(secondNum, '.num');
    };
}

const opPress = function(target) {
    if (!target.classList.contains('eval')) {
        // !num1 !num2, num1=0, define op;
        if (!firstNum && !secondNum) {
            // assign string 0 as to not eval falsy 0
            firstNum = '0'; 
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
        }
    }
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
        if (!secondNum) {
            firstNum = Math.floor(firstNum / 1e1);
            display(firstNum, '.num');
        }
        else {
            secondNum = Math.floor(secondNum / 1e1);
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
let opSign = '';

const buttons = document.querySelectorAll('.btn');
buttons.forEach(
    button => button.addEventListener('click', (e) => {keypress(e)})
);