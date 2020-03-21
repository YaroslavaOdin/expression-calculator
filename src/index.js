function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    let arr = expr.match(/[-+*/()]|\d+/g);
    let numbers = [];
    let operators = [];
    let result = 0;

    const priorityMathOperations = {
        '(': 0,
        ')': 0,
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2,
    };

    function SampleCalc(operand_1, operand_2, operator) {
        if (operator === '+') return operand_1 + operand_2;
        if (operator === '-') return operand_1 - operand_2;
        if (operator === '*') return operand_1 * operand_2;
        if (operator === '/') {
          if (operand_2 === 0) {
            throw new Error("TypeError: Division by zero.");
          } else return operand_1 / operand_2;
        }
    }

    let brackets = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '(') {
            brackets++;
        }
        if (arr[i] == ')') {
            brackets--;
        }
    }
    if (brackets != 0) {
        throw "ExpressionError: Brackets must be paired";
    }

    const valueСalculation = function() {
        result = SampleCalc(numbers[numbers.length-2], numbers[numbers.length-1], operators[operators.length-1]);
        numbers.pop();
        numbers.pop();
        operators.pop();
        numbers.push(result);
    }

    for (let i = 0; i < arr.length; i++){
        if(!isNaN(arr[i])) {
            numbers.push(+arr[i]);
        } 
        else if (operators.length === 0 || arr[i] === '(' || priorityMathOperations[arr[i]] > priorityMathOperations[operators[operators.length-1]]) {
            operators.push(arr[i]);
        } 
        else {
            if (arr[i] === ')') {
                if (operators[operators.length-1] === '(') {
                operators.pop();
                } 
                else {
                    valueСalculation();
                i--;
                }
            } 
            else {
                valueСalculation();
            i--;
            }
        }
    }

    if (numbers.length > 1) {
        for (let i = 0; i < numbers.length; i++){
            valueСalculation();
        }
    }

    return result;
}

module.exports = {
    expressionCalculator
}