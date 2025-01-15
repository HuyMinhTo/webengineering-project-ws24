let activeTimer = null;

// Rednerliste mit Timer
function addRedner() {
    const name = document.getElementById("redner").value.trim();
    if (!name) return;

    const rednerList = document.getElementById("rednerlist");
    const li = document.createElement("li");
    const timer = document.createElement("span");
    const button = document.createElement("button");

    li.textContent = `${name} - `;
    timer.textContent = "00:00:00";
    button.textContent = "Start";

    button.addEventListener("click", () => toggleTimer(li, timer, button));

    li.appendChild(timer);
    li.appendChild(button);
    rednerList.appendChild(li);

    document.getElementById("redner").value = "";
}

function toggleTimer(li, timer, button) {
    if (activeTimer && activeTimer !== li) {
        clearInterval(activeTimer.timer);
        activeTimer.querySelector("button").textContent = "Start";
    }

    if (li.timer) {
        clearInterval(li.timer);
        li.timer = null;
        button.textContent = "Start";
    } else {
        let [h, m, s] = timer.textContent.split(":").map(Number);
        li.timer = setInterval(() => {
            s++;
            if (s === 60) { s = 0; m++; }
            if (m === 60) { m = 0; h++; }
            timer.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }, 1000);
        button.textContent = "Stop";
        activeTimer = li;
    }
}

// Topologische Sortierung
function performTopologicalSort() {
    const inputText = document.getElementById("inputArea").value.trim();
    const lines = inputText.split('\n');
    const graph = {};
    const inDegree = {};

    lines.forEach(line => {
        const [start, end] = line.split('->').map(node => node.trim());
        if (!start || !end) return;

        if (!graph[start]) graph[start] = [];
        graph[start].push(end);

        if (!inDegree[start]) inDegree[start] = 0;
        if (!inDegree[end]) inDegree[end] = 0;
        inDegree[end]++;
    });

    const queue = [];
    const sortedOrder = [];

    for (const node in inDegree) {
        if (inDegree[node] === 0) queue.push(node);
    }

    while (queue.length > 0) {
        const node = queue.shift();
        sortedOrder.push(node);

        if (graph[node]) {
            graph[node].forEach(neighbor => {
                inDegree[neighbor]--;
                if (inDegree[neighbor] === 0) queue.push(neighbor);
            });
        }
    }

    const result = sortedOrder.length === Object.keys(inDegree).length
        ? sortedOrder.join(" -> ")
        : "Ein Zyklus wurde gefunden, keine topologische Sortierung möglich.";

    document.getElementById("result").textContent = result;
}
