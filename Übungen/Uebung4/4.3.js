//Schreiben Sie im Browser die Fibonacci-Funktion in JS und geben Sie die ersten 2000 Fibonacci-Zahlen
// 0,1,1,2,3,5,8,13,... auf der Konsole mit console.log() aus.
//
// Achten Sie auf Performanz: Berechnen Sie jeden Fibonacci-Wert nur einmal.
// Speichern Sie zu diesem Zweck jede berechnete Fibonacci-Zahl in einer Tabelle.
//
// Was ist die größte Fibonacci-Zahl, die sich noch als Integer sicher speichern lässt (Number.MAX_SAFE_INTEGER)?
// Die wievielte Zahl in der Fibonacci-Folge ist das?
// Was ist die größte Fibonacci-Zahl, die sich noch als Number speichern lässt (Number.MAX_VALUE)?
// Die wievielte Zahl in der Fibonacci-Folge ist das?
// Wechseln Sie zu BigInt, um alle 2000 Fibonacci-Zahlen korrekt anzuzeigen.
// Optional: Was ist die größte Fibonacci-Zahl, die Sie mit BigInt korrekt berechnet haben?
// An welcher Stelle in der Fibonacci-Folge steht diese?

function fibonacci(iteration, a = 0, b = 1) {
    if (iteration === 0) {
        return a;
    }
    return fibonacci(iteration - 1, b, a + b);
}

let maxsafeInt = 0;
let maxsafeintIndex = 0;

for (let i = 0; i < 1000; i++) {
    let currentFibonacci = fibonacci(i);
    if (currentFibonacci <= Number.MAX_SAFE_INTEGER) {
        maxsafeInt = currentFibonacci;
        maxsafeintIndex = i;
    } else {
        break;
    }
}
console.log("4.3-Section");
console.log("MaxSafeINTEGER: " + maxsafeInt);
console.log("MaxSafeINTEGER_Index: " + maxsafeintIndex);


let maxInt = 0;
let maxintIndex = 0;

for (let i = 0; i < 1000; i++) {
    let currentFibonacci = fibonacci(i);
    if (currentFibonacci <= Number.MAX_VALUE) {
        maxInt = currentFibonacci;
        maxintIndex = i;
    } else {
        break;
    }
}

console.log("MaxINTEGER: " + maxInt);
console.log("MaxINTEGER_Index: " + maxintIndex);


let maxbigInt = 0n;
let maxbigIntindex = 0;

for (let i = 0; i < 2000; i++) {
    const currentFibonacci = fibonacci(i);
    maxbigInt = currentFibonacci;
    maxbigIntindex = i;
}

console.log("MaxBigInt: " + maxbigInt);
console.log("MaxBigInt_Index: " + maxbigIntindex);
console.log("4.3-Section");