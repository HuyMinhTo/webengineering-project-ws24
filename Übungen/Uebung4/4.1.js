//1.Eine Funktion identity(), die ein Argument als Parameter entgegennimmt und dieses als Ergebnis zurückgibt.
function identity(x) {
    return x;
}

//2.Eine Funktion identity_function(), die ein Argument als Parameter entgegennimmt und eine Funktion zurückgibt,
//  die dieses Argument zurückgibt.
function identity_function(x) {
    return function () {
        return x;
    }
}

//3.Zwei binäre Funktionen add und mul, die Summe und Produkt berechnen.
function add(x, y) {
    return x + y;
}

function mul(x, y) {
    return x * y;
}

//4.Eine Addierer-Funktion addf(), so dass addf(x)(y) genau x + y zurückgibt.
// (Es haben also zwei Funktionsaufrufe zu erfolgen. addf(x) liefert eine Funktion, die auf y angewandt wird.)
function addf(x) {
    return function (y) {
        return x + y;
    }
}

//5.Eine Funktion applyf(), die aus einer binären Funktion wie add(x,y) eine Funktion addf berechnet,
// die mit zwei Aufrufen das gleiche Ergebnis liefert,
// z.B. addf = applyf(add); addf(x)(y) soll add(x,y) liefern.
// Entsprechend applyf(mul)(5)(6) soll 30 liefern, wenn mul die binäre Multiplikation ist.

function applyf(fn) {
    return function (x) {
        return function (y) {
            return fn(x, y);
        }
    }
}

//Output
console.log("4.1-Section");

console.log(identity(10));
let id_func = identity_function(10);
console.log(id_func());

console.log("Summe von 2 und 3 ist " + add(2, 3));
console.log("Produkt von 2 und 3 ist " + mul(2, 3));

let addf_result = addf(3)(4);
console.log("Summe von 3 und 4 ist" + addf_result);

let apply_add_result = applyf(add)(2)(4);
let apply_mul_result = applyf(mul)(2)(4);
console.log("Summe von 2 und 4 ist " + apply_add_result);
console.log("Produkt von 2 und 4 ist " + apply_mul_result);

console.log("4.1-Section");