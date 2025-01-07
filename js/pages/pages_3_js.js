// Funktionen Showcase
function identity(x) {
    return x;
}

function runIdentity() {
    const input = document.getElementById('identity-input').value;
    const output = identity(input);
    document.getElementById('identity-output').textContent = output;
}

function add(x, y) {
    return x + y;
}

function runAdd() {
    const input1 = parseFloat(document.getElementById('add-input1').value);
    const input2 = parseFloat(document.getElementById('add-input2').value);
    const output = add(input1, input2);
    document.getElementById('add-output').textContent = output;
}

function mul(x, y) {
    return x * y;
}

function runPower() {
    const base = parseFloat(document.getElementById("power-input1").value);
    const exponent = parseFloat(document.getElementById("power-input2").value);
    const result = Math.pow(base, exponent);
    document.getElementById("power-output").innerText = result || "Ungültige Eingabe";
}


// Personen- und Autos-Daten
let persons = [];
let cars = [];

// Person hinzufügen
function addPerson() {
    const name = document.getElementById("person-name").value.trim();
    if (!name) {
        alert("Bitte einen Namen eingeben!");
        return;
    }
    if (persons.some(person => person.name === name)) {
        alert("Diese Person existiert bereits!");
        return;
    }

    persons.push({ name, cars: [] });
    updatePersonSelection();
    document.getElementById("person-name").value = "";
    updateDisplay();
}

// Auto hinzufügen
function addCar() {
    const model = document.getElementById("car-model").value.trim();
    if (!model) {
        alert("Bitte ein Automodell eingeben!");
        return;
    }
    if (cars.includes(model)) {
        alert("Dieses Auto existiert bereits!");
        return;
    }

    cars.push(model);
    updateCarSelection();
    updateRemoveCarSelection();
    document.getElementById("car-model").value = "";
    updateDisplay();
}

// Auto zu Person zuweisen
function assignCar() {
    const personName = document.getElementById("person-selection").value;
    const carModel = document.getElementById("car-selection").value;

    if (!personName || !carModel) {
        alert("Bitte Person und Auto auswählen!");
        return;
    }

    const person = persons.find(p => p.name === personName);
    if (person.cars.includes(carModel)) {
        alert("Diese Person besitzt das Auto bereits!");
        return;
    }

    person.cars.push(carModel);
    updateDisplay();
}

// Auto entfernen
function removeCar() {
    const carModel = document.getElementById("remove-car-selection").value;

    if (!carModel) {
        alert("Bitte ein Auto auswählen!");
        return;
    }

    // Entfernt das Auto von allen Personen
    persons.forEach(person => {
        person.cars = person.cars.filter(car => car !== carModel);
    });

    // Entferne das Auto aus der globalen Liste
    cars = cars.filter(car => car !== carModel);

    updateCarSelection();
    updateRemoveCarSelection();
    updateDisplay();
}

// Anzeige aktualisieren
function updateDisplay() {
    const output = document.getElementById("cars-output");
    output.innerHTML = persons
        .map(person => {
            const cars = person.cars.length
                ? person.cars.join(", ")
                : "Keine Autos";
            return `<p><strong>${person.name}:</strong> ${cars}</p>`;
        })
        .join("");

    // Konflikte anzeigen
    const conflicts = findConflicts();
    const status = document.getElementById("car-status");
    if (conflicts.length > 0) {
        status.innerHTML = ` Konflikte bei Autos: ${conflicts.join(", ")}`;
    } else {
        status.innerHTML = " Keine Konflikte bei den Autos.";
    }
}

// Dropdown-Menü für Personen aktualisieren
function updatePersonSelection() {
    const personSelection = document.getElementById("person-selection");
    personSelection.innerHTML = `<option value="" disabled selected>Person auswählen</option>`;
    persons.forEach(person => {
        const option = document.createElement("option");
        option.value = person.name;
        option.textContent = person.name;
        personSelection.appendChild(option);
    });
}

// Dropdown-Menü für Autos aktualisieren
function updateCarSelection() {
    const carSelection = document.getElementById("car-selection");
    carSelection.innerHTML = `<option value="" disabled selected>Auto auswählen</option>`;
    cars.forEach(car => {
        const option = document.createElement("option");
        option.value = car;
        option.textContent = car;
        carSelection.appendChild(option);
    });
}

// Dropdown-Menü für Auto-Entfernen aktualisieren
function updateRemoveCarSelection() {
    const removeCarSelection = document.getElementById("remove-car-selection");
    removeCarSelection.innerHTML = `<option value="" disabled selected>Auto entfernen</option>`;
    cars.forEach(car => {
        const option = document.createElement("option");
        option.value = car;
        option.textContent = car;
        removeCarSelection.appendChild(option);
    });
}

// Konflikte finden
function findConflicts() {
    const carOwners = {};
    const conflicts = [];

    persons.forEach(person => {
        person.cars.forEach(car => {
            if (!carOwners[car]) {
                carOwners[car] = [];
            }
            carOwners[car].push(person.name);
        });
    });

    for (const car in carOwners) {
        if (carOwners[car].length > 1) {
            conflicts.push(car);
        }
    }

    return conflicts;
}

