// Modul für Klammerprüfung
export function checkBrackets(input) {
    const stack = [];
    const brackets = { '(': ')', '[': ']', '{': '}' };

    for (const char of input) {
        if (brackets[char]) {
            stack.push(char);
        } else if (Object.values(brackets).includes(char)) {
            if (brackets[stack.pop()] !== char) {
                return false;
            }
        }
    }

    return stack.length === 0;
}

// Modul für Topologische Iterierbarkeit
export class Vorrang {
    constructor(relations) {
        this.graph = new Map();
        this.inDegree = new Map();

        relations.forEach(([predecessor, successor]) => {
            if (!this.graph.has(predecessor)) this.graph.set(predecessor, []);
            if (!this.graph.has(successor)) this.graph.set(successor, []);
            this.graph.get(predecessor).push(successor);

            if (!this.inDegree.has(predecessor)) this.inDegree.set(predecessor, 0);
            if (!this.inDegree.has(successor)) this.inDegree.set(successor, 0);
            this.inDegree.set(successor, this.inDegree.get(successor) + 1);
        });
    }

    *[Symbol.iterator]() {
        const queue = [];
        const inDegreeCopy = new Map(this.inDegree);

        for (const [node, degree] of inDegreeCopy.entries()) {
            if (degree === 0) queue.push(node);
        }

        while (queue.length) {
            const node = queue.shift();
            yield node;

            for (const neighbor of this.graph.get(node) || []) {
                inDegreeCopy.set(neighbor, inDegreeCopy.get(neighbor) - 1);
                if (inDegreeCopy.get(neighbor) === 0) queue.push(neighbor);
            }
        }
    }
}

// Modul für Filter/Map/Reduce
export function filterMapReduceExample() {
    const numbers = [1, 2, 3, 4, 5];
    const filtered = numbers.filter(num => num > 2);
    const mapped = filtered.map(num => num * 2);
    const reduced = mapped.reduce((sum, num) => sum + num, 0);

    return { numbers, filtered, mapped, reduced };
}

// Event-Handler für die Showcase
document.getElementById("bracket-input").addEventListener("input", (e) => {
    const input = e.target.value;
    const result = checkBrackets(input);
    const resultElement = document.getElementById("bracket-result");

    if (result) {
        e.target.classList.remove("error");
        resultElement.textContent = "✔ Korrekt geschachtelt!";
    } else {
        e.target.classList.add("error");
        resultElement.textContent = "✘ Fehlerhafte Schachtelung!";
    }
});

window.runToposort = () => {
    const input = document.getElementById("toposort-input").value;
    const relations = input.split("\n").map(line => line.split("->").map(item => item.trim()));

    const vorrang = new Vorrang(relations);
    const result = Array.from(vorrang).join(" -> ");
    document.getElementById("toposort-result").textContent = result || "Keine gültigen Relationen!";
};

window.runFilterMapReduce = () => {
    const { numbers, filtered, mapped, reduced } = filterMapReduceExample();
    document.getElementById("filter-map-reduce-output").textContent =
        `Original: ${numbers}\nFiltered (>2): ${filtered}\nMapped (*2): ${mapped}\nReduced (Sum): ${reduced}`;
};
