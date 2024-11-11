const deepCopy = struct =>
    Array.isArray(struct)
        ? struct.map(deepCopy)
        : (typeof struct === 'object' && struct !== null)
            ? Object.fromEntries(Object.entries(struct).map(([key, value]) => [key, deepCopy(value)]))
            : struct;

// Test mit console.assert

// Beispielobjekt zum Testen
const original = {
    a: 1,
    b: [2, 3, { d: 4 }],
    c: { e: 5, f: [6, 7] }
};

// Tiefenkopie des original-Objekts erstellen
const copy = deepCopy(original);

// Teste, ob die Kopie dem Original entspricht (Wertegleichheit)
console.assert(JSON.stringify(original) === JSON.stringify(copy), "Die Kopie sollte mit dem Original übereinstimmen");

// Teste, ob die Kopie unabhängig ist (Referenzgleichheit vermeiden)
copy.b[2].d = 42;
console.assert(original.b[2].d !== copy.b[2].d, "Die Kopie sollte unabhängig vom Original sein");
