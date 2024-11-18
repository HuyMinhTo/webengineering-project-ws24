// Schreiben Sie eine Funktion curry (von Currying),
// die eine binäre Funktion und ein Argument nimmt, um daraus eine Funktion zu erzeugen,
// die ein zweites Argument entgegennimmt. Beispiele: add3 = curry(add, 3); add3(4) ergibt 7 und curry(mul, 5)(6) ergibt 30.
function curry(func,x){
   return function curryFunc(y){
        return func(x,y);
    }
}
console.log("---Curry-Function---");
function add(a, b) {
    return a + b;
}
const add3 = curry(add, 3);
console.log(add3(4)); // Sollte 7 ergeben


function mul(a, b) {
    return a * b;
}
console.log(curry(mul, 5)(6)); // Sollte 30 ergeben


// Erzeugen Sie die inc-Funktion mithilfe von addf oder applyf (aus Aufgabe 4.1) und curry,
// ohne die Funktion inc selbst zu implementieren. inc(x) soll immer x + 1 zurückgeben
// und lässt sich natürlich auch direkt implementieren. Das ist aber hier nicht die Aufgabe.
// Vielleicht schaffen Sie es, drei Varianten der inc-Implementierung zu schreiben?
console.log("---Inc-Function---");
import { addf } from '../Uebung4/4.1.js';
import { applyf } from "../Uebung4/4.1.js";
//const inc = curry(add,1);
//const inc = addf(1);
const add1 = applyf(add);
const inc = add1(1);
console.log(inc(2)); //Sollte 3 ergeben



// Schreiben Sie eine Funktion methodize, die eine binäre Funktion in eine unäre Methode umwandelt.
function methodize(func) {
    return function (y) {
        return func(this, y);
    };
}

console.log("---Methodize-Function---");
Number.prototype.add = methodize(add);
console.log((3).add(4)); // Sollte 7 ergeben



// Schreiben Sie eine Funktion demethodize, die eine unäre Methode in eine binäre Funktion umwandelt.
function demethodize(func) {
    return function (x, y) {
        return func.call(x, y);
    };
}

console.log("---Demethodize-Function---");
const binaryAdd = demethodize(Number.prototype.add);
console.log(binaryAdd(5, 6)); // Sollte 11 ergeben



// Schreiben Sie eine Funktion twice, die eine binäre Funktion in eine unäre Funktion umwandelt,
// die den einen Parameter zweimal weiter reicht.
function twice(func) {
    return function (x) {
        return func(x, x);
    };
}

console.log("---Twice-Function---");
const double = twice(add);
console.log(double(11)); // Sollte 22 ergeben

const square = twice(mul);
console.log(square(11)); // Sollte 121 ergeben





// Schreiben Sie eine Funktion composeu, die zwei unäre Funktionen in eine einzige unäre Funktion transformiert.
function composeu(func1, func2) {
    return function (x) {
        return func2(func1(x));
    };
}

console.log("---Composeu-Function---");
console.log(composeu(double, square)(3)); // Sollte 36 ergeben



// Schreiben Sie eine Funktion composeb, die zwei binäre Funktionen in eine einzige Funktion transformiert,
// die beide nacheinander aufruft.
function composeb(func1, func2) {
    return function (x, y, z) {
        return func2(func1(x, y), z);
    };
}

console.log("---Composeb-Function---");
console.log(composeb(add, mul)(2, 3, 5)); // Sollte 25 ergeben



// Schreiben Sie eine Funktion once, die eine andere Funktion nur einmal erlaubt, aufgerufen zu werden.
function once(func) {
    let called = false;
    return function (...args) {
        if (called) throw new Error("Function can only be called once.");
        called = true;
        return func(...args);
    };
}

console.log("---Once-Function---");
const add_once = once(add);
console.log(add_once(3, 4)); // Sollte 7 ergeben
// console.log(add_once(3, 4)); // Sollte einen Fehler auslösen




// Schreiben Sie eine Fabrik-Funktion counterf, die zwei Funktionen inc und dec bereitstellt.
function counterf(initialValue) {
    let value = initialValue;
    return {
        inc: () => ++value,
        dec: () => --value
    };
}

console.log("---Counterf-Function---");
const counter = counterf(10);
console.log(counter.inc()); // Sollte 11 ergeben
console.log(counter.dec()); // Sollte 10 ergeben




// Schreiben Sie eine rücknehmbare Funktion revocable.
function revocable(func) {
    let active = true;
    return {
        invoke: (...args) => {
            if (!active) throw new Error("Function has been revoked.");
            return func(...args);
        },
        revoke: () => {
            active = false;
        }
    };
}

console.log("---Revocable-Function---");
const temp = revocable(console.log);
temp.invoke(7); // Sollte "7" ausgeben
temp.revoke();
// temp.invoke(8); // Sollte einen Fehler auslösen




// Schreiben Sie ein "Array Wrapper"-Objekt mit den Methoden get, store und append.
function vector() {
    const data = [];
    return {
        append: (value) => data.push(value),
        store: (index, value) => {
            if (index < 0 || index >= data.length) throw new Error("Index out of bounds.");
            data[index] = value;
        },
        get: (index) => {
            if (index < 0 || index >= data.length) throw new Error("Index out of bounds.");
            return data[index];
        }
    };
}

console.log("---Vector-Function---");
const my_vector = vector();
my_vector.append(7);
my_vector.store(0, 8);
console.log(my_vector.get(0)); // Sollte 8 ergeben
// console.log(my_vector.get(1)); // Sollte einen Fehler auslösen



