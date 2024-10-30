//Schreiben Sie die Prototypen Person und Auto in JavaScript,
//sodass jede Person weiß, welche Autos sie besitzt. Schreiben Sie eine Funktion conflict(),
//die feststellt, ob ein Auto von mehr als einer Person besessen wird.

// Konstruktor-Prototyp für Person
function Person(firstname, age) {
    this.firstname = firstname;
    this.age = age;
    this.cars = []; // Array, um die Autos der Person zu speichern
}

// Methode, um ein Auto zur Besitzliste der Person hinzuzufügen
Person.prototype.addCar = function (car) {
    this.cars.push(car);
};

// Konstruktor-Prototyp für Auto
function Auto(modell, price) {
    this.modell = modell;
    this.price = price;
}

// Funktion conflict, die prüft, ob ein Auto mehreren Personen gehört
function conflict(persons) {
    const carOwners = new Map();

    // Für jede Person überprüfen, welche Autos sie besitzt
    for (let person of persons) {
        for (let car of person.cars) {
            // Wenn das Auto bereits im Map ist, wurde es von einer anderen Person besessen
            if (carOwners.has(car)) {
                return true; // Konflikt gefunden
            } else {
                carOwners.set(car, person);
            }
        }
    }
    return false; // Kein Konflikt
}

// Beispielobjekte erstellen
const ben = new Person("Ben", 22);
const fabian = new Person("Fabian", 23);
const audi1 = new Auto("R8", 166000);

// Autos zu den Besitzlisten der Personen hinzufügen
ben.addCar(audi1);
fabian.addCar(audi1);

// Konfliktprüfung
console.log("4.2-Section");
console.log("Bens Autos:");
ben.cars.forEach(car => {
    console.log("Modell: " + car.modell + ", Preis: " + car.price);
});
console.log("Fabians Autos:");
fabian.cars.forEach(car => {
    console.log("Modell: " + car.modell + ", Preis: " + car.price);
});

console.log("Haben Ben und Fabian das selbe Auto gemietet? =>" + conflict([ben, fabian]));
// Ausgabe: true, da beide das gleiche Auto besitzen
console.log("4.2-Section");