//1.Eine Funktion identity(), die ein Argument als Parameter entgegennimmt und dieses als Ergebnis zurückgibt.
function identity(x) {
    return x;
}

//2.Eine Funktion identity_function(), die ein Argument als Parameter entgegennimmt und eine Funktion zurückgibt,
//  die dieses Argument zurückgibt.
function identity_function(x){
    return function (){
        return x;
    }
}

//3.Zwei binäre Funktionen add und mul, die Summe und Produkt berechnen.
function add(x,y){
    return x+y;
}

function mul(x,y){
    return x*y;
}

//4.Eine Addierer-Funktion addf(), so dass addf(x)(y) genau x + y zurückgibt.
// (Es haben also zwei Funktionsaufrufe zu erfolgen. addf(x) liefert eine Funktion, die auf y angewandt wird.)
function addf(x){
    return function (y){
        return x+y;
    }
}

//5.Eine Funktion applyf(), die aus einer binären Funktion wie add(x,y) eine Funktion addf berechnet,
// die mit zwei Aufrufen das gleiche Ergebnis liefert,
// z.B. addf = applyf(add); addf(x)(y) soll add(x,y) liefern.
// Entsprechend applyf(mul)(5)(6) soll 30 liefern, wenn mul die binäre Multiplikation ist.

function applyf(fn){
    return function (x){
        return function (y) {
            return fn(x, y);
        }
    }
}