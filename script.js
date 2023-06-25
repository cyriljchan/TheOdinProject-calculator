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

const operate = function (func, x, y) {
    return func(x, y);
}

const buttons = document.querySelectorAll('.button');
buttons.forEach(
    button => button.addEventListener('click', (e) => {
        const display = document.querySelector('.display');
        display.textContent += e.target.textContent;
    })
)