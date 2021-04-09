
function display(num) {
    document.querySelector('.calculator_display').innerHTML += num;
}

function clean() {
    // note to self: you can not use clear() it is a built-in js function. Keep // in mind!
    document.querySelector(".calculator_display").innerHTML = '';
}

function equal() {
    let expr = document.querySelector(".calculator_display").innerHTML;
    document.querySelector(".calculator_display").innerHTML = eval(expr)
}

function del() {
    let expr = document.querySelector(".calculator_display").innerHTML;
    document.querySelector(".calculator_display").innerHTML = expr.substring(0, expr.length-1);
}