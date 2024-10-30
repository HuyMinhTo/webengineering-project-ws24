function topsort(dependencies) {
    const graph = new Map();
    const visited = new Map();
    const result = [];

    // Graph erstellen und sicherstellen, dass alle Knoten (Eltern und Kinder) vorhanden sind
    for (const [parent, child] of dependencies) {
        if (!graph.has(parent)) {
            graph.set(parent, []);
        }
        if (!graph.has(child)) {
            graph.set(child, []);
        }
        graph.get(parent).push(child);
    }

    function dfs(node) {
        visited.set(node, "in-progress");

        const dependencies = graph.get(node) || [];
        for (const dependency of dependencies) {
            if (!visited.has(dependency)) {
                dfs(dependency);
            } else if (visited.get(dependency) === "in-progress") {
                throw new Error("Circular dependency detected!");
            }
        }

        visited.set(node, "done");
        result.unshift(node);
    }

    // Über alle Knoten im Graphen iterieren
    for (const node of graph.keys()) {
        if (!visited.has(node)) {
            dfs(node);
        }
    }

    return result;
}

let arr_unsort = [
    ["schlafen", "studieren"],
    ["essen", "studieren"],
    ["studieren", "prüfen"],
]
console.log("4.4-Section");

console.log("Unsorted Array: " + arr_unsort.toString());
let arr_sort = topsort(arr_unsort);
console.log("Sorted Array: " + arr_sort.toString());

console.log("4.4-Section");
