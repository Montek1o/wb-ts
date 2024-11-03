type NumberSystem = 'decimal' | 'binary' | 'hexadecimal';

function add(a: string, b: string, numberSystem: NumberSystem): string {
    const num1 = parseInt(a, numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
    const num2 = parseInt(b, numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
    return (num1 + num2).toString(numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
}

function subtract(a: string, b: string, numberSystem: NumberSystem): string {
    const num1 = parseInt(a, numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
    const num2 = parseInt(b, numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
    return (num1 - num2).toString(numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
}

function multiply(a: string, b: string, numberSystem: NumberSystem): string {
    const num1 = parseInt(a, numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
    const num2 = parseInt(b, numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
    return (num1 * num2).toString(numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
}

function divide(a: string, b: string, numberSystem: NumberSystem): string {
    const num1 = parseInt(a, numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
    const num2 = parseInt(b, numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
    return (num1 / num2).toString(numberSystem === 'binary' ? 2 : numberSystem === 'hexadecimal' ? 16 : 10);
}

// Пример использования
const dec1 = '4'; // десятичное представление числа
const dec2 = '8'; // десятичное представление числа

const bin1 = '1000'; // бинарное представление числа 8
const bin2 = '101'; // бинарное представление числа 5

const hex1 = 'A'; // шестнадцатеричное представление числа 10
const hex2 = '6'; // шестнадцатеричное представление числа 6

console.log('Результат сложения:', add(dec1, dec2, 'decimal')); // Ожидаемый результат: 12
console.log('Результат вычитания:', subtract(bin1, bin2, 'binary')); // Ожидаемый результат: 11
console.log('Результат умножения:', multiply(hex1, hex2, 'hexadecimal')); // Ожидаемый результат: 3С
console.log('Результат деления:', divide(dec2, dec1, 'decimal')); // Ожидаемый результат: 2
